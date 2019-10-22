import { Component, OnInit, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { SocketService } from '@providers/socket.service';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { SlugifyPipe } from '@pipes/slugpipe';
import { StringsplitID } from '@pipes/stringsplitID.pipe';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app-reducer';
import * as favourites from '../../store/favourites-management/favourites.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainFooterComponent implements OnInit {
  isapply = false;
  contactObj: {};
  userfavourites: any;
  isedit = false;
  isShow: boolean;
  topPosToStartShowing = 100;
  searchText;
  isAuth$: any;

  @ViewChild('favContainer') favContainer;

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.favContainer.nativeElement.contains(targetElement);
    if (!clickedInside && !this.isedit) {
      this.isapply = false;
    }
  }

  constructor(private sportsService: SportsService,
    private router: Router,
    private socketservice: SocketService,
    private socket: Socket,
    private slugifyPipe: SlugifyPipe,
    private splitIDPipe: StringsplitID,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.getContactDetails();
    this.store.select('auth').subscribe((data: any) => {
      this.isAuth$ = data.isAuthenticated;
      if (this.isAuth$ == true) {
        this.getUserfavourites();
      } else {
        this.userfavourites = JSON.parse(localStorage.getItem('favourites'));
        if (this.userfavourites && this.userfavourites.length > 0) {
          this.userfavourites = this.userfavourites.map((singleitem) => {
            return {
              ...singleitem,
              isSelect: false
            };
          });
        }
        this.store.dispatch(new favourites.SaveFavourites(this.userfavourites));
      }
    });
    this.store.select('Favourites').subscribe((data: any) => {
      this.userfavourites = data.Favourites ? data.Favourites : [];
    });
  }

  /* //get user favourites */
  getUserfavourites() {
    this.sportsService.getuserfavourite().subscribe((res: any) => {
      this.userfavourites = JSON.parse(localStorage.getItem('favourites'));
      this.userfavourites = this.userfavourites.map((singleitem) => {
        return {
          ...singleitem,
          isSelect: false
        };
      });
      this.store.dispatch(new favourites.SaveFavourites(this.userfavourites));
    });
  }

  /* //favourites tags routing */
  routing(url) {
    if (this.isedit) {
      this.userfavourites = this.userfavourites.map((singleitem) => {
        if (singleitem.url == url && singleitem.isSelect == false) {
          return {
            ...singleitem,
            isSelect: true
          };
        } else if (singleitem.url == url && singleitem.isSelect == true) {
          return {
            ...singleitem,
            isSelect: false
          };
        } else {
          return singleitem;
        }
      });
    } else {
      this.isapply = false;
      this.router.navigate([url]);
    }
  }

  /* //remove favourites function */
  removefavourite() {
    if (this.isedit) {
      let isselectedtags = this.userfavourites.some((data) => data.isSelect == true);
      if (isselectedtags) {
        this.userfavourites = this.userfavourites.filter(data => data.isSelect == false);
        localStorage.setItem('favourites', JSON.stringify(this.userfavourites));
        this.store.dispatch(new favourites.SaveFavourites(this.userfavourites));

        if (localStorage.getItem('userT')) {
          this.sportsService.updatefavourites({ data: this.userfavourites }).subscribe((res: any) => {
            if (res) {
            }
          });
        }
      } else {
        this.isedit = false;
      }
    } else {
      this.isedit = true;
    }
  }

  getContactDetails() {
    this.sportsService.getcontactdetails().subscribe(res => {
      if (res['data']) {
        this.contactObj = {};
        res['data'].map(s => {
          this.contactObj[s.sKey] = s.sValue;
        });
      }
    });
  }

  @HostListener('window:scroll')
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
      behavior: 'smooth'
    });
  }
}
