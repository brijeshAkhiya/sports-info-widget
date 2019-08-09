import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  HostListener
} from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "angularx-social-login";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from 'rxjs';

import { LoginModalComponent } from '../widget/login-modal/login-modal.component';

import * as fromRoot from "../../app-reducer";
import * as Auth from "../../store/auth/auth.actions";
import * as Ads from "../../store/ads-management/ads.actions";

import { SportsService } from "@providers/sports-service";
import { CommonService } from "@providers/common-service";
import { CricketService } from "@providers/cricket-service";

@Component({
  selector: "app-main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.css"]
})
export class MainHeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('navbarcontainer') navbarcontainer;
  @ViewChild('navbarButton') navbarButton;
  @ViewChild("navpointer") navpointer: ElementRef;
  @ViewChild("navbarnav") navbarnav: ElementRef;
  @ViewChild("navbarmenu") navbarmenu: ElementRef;
  @ViewChild('searchOpen') searchOpen;
  isapply: boolean = false;
  socialUser: any;
  issearch: boolean;
  // searchdata: any;
  noresults: boolean;
  isLogin: boolean;
  public windowinnerWidth: any;
  isopen: boolean = false;


  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.navbarcontainer.nativeElement.contains(targetElement);
    const navbarButtonInside = this.navbarButton.nativeElement.contains(targetElement);
    if (!clickedInside && !navbarButtonInside) {
      this.isapply = false;
    }
  }

  constructor(
    private renderer2: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private sportsService: SportsService,
    private modalService: NgbModal,
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private cricketService: CricketService,
    private commonService: CommonService,
  ) {
    //get custom ads data Funtion call --->
    this.getCustomAds();
  }


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log('checksocial', user);
      if (user == null) {
        this.isLogin = false
        this.store.dispatch(new Auth.SetUnauthenticated);
      }
      else {
        this.socialUser = user;
        this.isLogin = true
        this.store.dispatch(new Auth.SetAuthenticated);
      }
    });

    // this.innerWidth = window.innerWidth;
  }

  responsiveSticky(value) {
    if (window.pageYOffset > value) {
      let element = document.getElementById('navbar');
      element.classList.add('sticky');
      let bodyelement = document.getElementById('main-body');
      bodyelement.classList.add('sticky-mainmenu');
    } else {
      let element = document.getElementById('navbar');
      element.classList.remove('sticky');
      let bodyelement = document.getElementById('main-body');
      bodyelement.classList.remove('sticky-mainmenu');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.windowinnerWidth = window.innerWidth;
    if (this.windowinnerWidth < 576) {
      this.responsiveSticky(176);
      console.log("width change" + innerWidth);
    }
    else {
      this.responsiveSticky(129);
    }
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  //get custom ads api call -Ngrx Store
  getCustomAds() {
    this.sportsService.getcustomadsbanner().subscribe(
      res => {
        if (res["data"]) {
          this.store.dispatch(new Ads.SaveAds(res["data"]));
        }
      },
      error => {
        this.getCustomAds();
      }
    );
  }

  //nav bar click event
  linkactive(linkid) {
    var navel = this.navbarnav.nativeElement;
    var navrect = navel.getBoundingClientRect();
    var el = document.getElementById(`nav-link${linkid}`); //get particular id nav-element
    var rect = el.getBoundingClientRect();
    var curPoint = rect["x"] - navrect["x"];
    this.renderer2.setStyle(
      this.navpointer.nativeElement,
      "width",
      rect.width + "px"
    ); //set
    this.renderer2.setStyle(
      this.navpointer.nativeElement,
      "left",
      curPoint + "px"
    );
  }

  //dynamic routing
  routing(routerlink) {
    if (routerlink) {
      this.router.navigate([`${routerlink}`]);
    } else {
      this.router.navigate(["/"]);
    }
  }

  close($event) {
    if (!$event) {
      this.issearch = false;
      this.renderer2.removeClass(document.body, "search-box-open");
    }

  }
  //search bar open
  searchopen() {
    this.isapply = false;
    if (!this.issearch) {
      this.issearch = true;
      this.renderer2.addClass(document.body, "search-box-open");
    } else {
      this.issearch = false;
      this.renderer2.removeClass(document.body, "search-box-open");
    }
  }
  openmodal() {
    this.modalService.open(LoginModalComponent);
  }
  //search close
  closesearch() {
    this.issearch = false;
    // this.searchkey = "";
    this.renderer2.removeClass(document.body, "search-box-open");
  }

  getuserLogout(token) {
    this.sportsService.userlogout(token).subscribe((res) => {
      console.log(res);
      this.store.dispatch(new Auth.SetUnauthenticated());
    })
  }

  logout() {
    this.authService.signOut().then(res => {
      if (localStorage.getItem('userT')) {
        this.getuserLogout(localStorage.getItem('userT'));
        localStorage.removeItem('userT')
        localStorage.removeItem('userId')
      }
    });
  }
}

