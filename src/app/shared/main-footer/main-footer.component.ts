import { Component, OnInit, HostListener } from "@angular/core";
import { SportsService } from "@providers/sports-service";
import { SocketService } from '@providers/socket.service';
import { Socket } from "ngx-socket-io";
import { Router } from '@angular/router';
import { SlugifyPipe } from '@pipes/slugpipe';
import { StringsplitID } from '@pipes/stringsplitID.pipe';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../app-reducer'
import * as favourites from '../../store/favourites-management/favourites.actions'
import { Observable } from 'rxjs';


@Component({
  selector: "app-main-footer",
  templateUrl: "./main-footer.component.html",
  styleUrls: ["./main-footer.component.css"]
})
export class MainFooterComponent implements OnInit {
  isapply: boolean = false;
  contactObj: {};
  userfavourites: any;
  isedit: boolean = false;
  isShow: boolean;
  topPosToStartShowing = 100;
  searchText;
  isAuth$: any;
  constructor(private sportsService: SportsService,private router: Router, private socketservice: SocketService,
    private socket: Socket,
    private slugifyPipe: SlugifyPipe,
    private splitIDPipe: StringsplitID,
    private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.getContactDetails();
    this.store.select('auth').subscribe((data: any) => {
      this.isAuth$ = data.isAuthenticated
      if (this.isAuth$ == true) {
        console.log('true');
        this.getUserfavourites(); 
      }
      else {
        this.userfavourites = JSON.parse(localStorage.getItem('favourites'));
        console.log('fav1:', JSON.parse(localStorage.getItem('favourites')));
        this.userfavourites = this.userfavourites.map((singleitem) => {
          return {
            ...singleitem,
            isSelect: false
          }
        });
        console.log('fav:::', this.userfavourites);
        this.store.dispatch(new favourites.SaveFavourites(this.userfavourites));
      }
    })
   
    this.store.select('Favourites').subscribe((data: any) => {
      this.userfavourites = data.Favourites
    })
  }

  //get user favourites
  getUserfavourites() {
    this.sportsService.getuserfavourite().subscribe((res: any) => {
      this.userfavourites = JSON.parse(localStorage.getItem('favourites'));
      this.userfavourites = this.userfavourites.map((singleitem) => {
        return {
          ...singleitem,
          isSelect: false
        }
      });
      console.log('fav:::', this.userfavourites);
    })
  }

  //favourites tags routing 
  routingfromfav(type, id, name) {
    if (this.isedit) {
      this.userfavourites = this.userfavourites.map((singleitem) => {
        if (singleitem.id == id && singleitem.isSelect == false) {
          return {
            ...singleitem,
            isSelect: true
          }
        }
        else if (singleitem.id == id && singleitem.isSelect == true) {
          return {
            ...singleitem,
            isSelect: false
          }
        } else {
          return singleitem
        }
      })
    }
    else {
      if (type == 'sport') {
        this.router.navigate([id]);
      }
      else if (type == 'tournament') {
        let slugname = this.slugifyPipe.transform(name);
        this.router.navigate(['cricket/tournament', this.splitIDPipe.transform(id), slugname])
      }
      else if (type == 'team') {
        let slugname = this.slugifyPipe.transform(name);
        this.router.navigate(['cricket/team', this.splitIDPipe.transform(id), slugname])
      }
      else if (type == 'player') {
        let slugname = this.slugifyPipe.transform(name);
        this.router.navigate(['cricket/player', this.splitIDPipe.transform(id), slugname])
      }
    }
  }
  //remove favourites function
  removefavourite() {
    if (this.isedit) {
      let isselectedtags = this.userfavourites.some((data) => data.isSelect == true);
      if (isselectedtags) {
        this.userfavourites.map((data) => {
          if (data.isSelect == true) {
            this.userfavourites.splice(this.userfavourites.findIndex(v => v.isSelect == true), 1);
            localStorage.setItem('favourites', JSON.stringify(this.userfavourites))
          }
        })
        if (localStorage.getItem('userT')) {
          this.sportsService.updatefavourites({ data: this.userfavourites }).subscribe((res: any) => {
            if (res) {
              console.log(res);
            }
          })
        }
      }
      else {
        this.isedit = false
      }
    }
    else {
      this.isedit = true
    }
  }

  getContactDetails() {
    this.sportsService.getcontactdetails().subscribe(res => {
      if (res["data"]) {
        this.contactObj = {};
        res["data"].map(s => {
          this.contactObj[s.sKey] = s.sValue;
        });
      }
    });
  }

  @HostListener("window:scroll")
  checkScroll() {
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
}
