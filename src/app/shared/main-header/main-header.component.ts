import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  HostListener,
  ViewEncapsulation,
  OnDestroy,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'angularx-social-login';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { LoginModalComponent } from '../widget/login-modal/login-modal.component';

import * as fromRoot from '../../app-reducer';
import * as Auth from '../../store/auth/auth.actions';
import * as Ads from '../../store/ads-management/ads.actions';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navbarcontainer') navbarcontainer;
  @ViewChild('navbarButton') navbarButton;
  @ViewChild('langmenuContainer') langmenuContainer;
  @ViewChild('sidemenucontainer') sidemenucontainer;
  @ViewChild('sidemenuLangcontainer') sidemenuLangcontainer;
  @ViewChild('navpointer') navpointer: ElementRef;
  @ViewChild('navbarnav') navbarnav: ElementRef;
  @ViewChild('navbarmenu') navbarmenu: ElementRef;
  @ViewChild('searchOpen') searchOpen;
  isapply: boolean = false;
  socialUser: any;
  issearch: boolean;
  // searchdata: any;
  noresults: boolean;
  isLogin: boolean;
  public windowinnerWidth: any;
  isopen: boolean = false;
  currentSite;
  keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
  langMenu: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentLang;

  sportsMenu = [
    { title: 'Cricket', link: '/cricket' },
    { title: 'Kabaddi', link: '/kabaddi' },
    { title: 'Soccer', link: '/soccer' },
    { title: 'Basketball', link: '/basketball' },
    { title: 'Field Hockey', link: '/hockey' },
    { title: 'Badminton', link: '/badminton' },
    { title: 'Racing', link: '/racing' },
    { title: 'Tennis sports', link: '/tennis' },
    { title: 'ESports', link: '/esports' },
    { title: 'WWE', link: '/wwe' },
  ];

  langauges = [
    { title: 'English', link: 'https://www.sports.info' },
    { title: 'Bengali', link: 'https://bengali.sports.info' },
    { title: 'Hindi', link: 'https://hindi.sports.info' },
    // { title: 'Gujarati', link: 'https://gujarati.sports.info' },
    // { title: 'Marathi', link: 'https://marathi.sports.info' },
    // { title: 'Telugu', link: 'https://telugu.sports.info' },
    // { title: 'Italian', link: 'https://italian.sports.info' },
    // { title: 'Spain', link: 'https://spain.sports.info' },
    // { title: 'Mexican', link: 'https://mexican.sports.info' },
  ];


  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const navbarButtonInside = this.navbarButton.nativeElement.contains(targetElement);
    if (
      !navbarButtonInside &&
      !this.langmenuContainer.nativeElement.contains(targetElement) &&
      !this.sidemenucontainer.nativeElement.contains(targetElement) &&
      !this.sidemenuLangcontainer.nativeElement.contains(targetElement)
    ) {
      this.isapply = false;
      this.enableScroll();
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
    private commonService: CommonService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {
    /* //get custom ads data Funtion call ---> */
    this.getCustomAds();
  }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = this.commonService.getFromStorage('userLng');
      this.currentSite = window.location.origin;
      this.authService.authState.pipe(takeUntil(this.destroy$)).subscribe((user) => {
        if (user == null) {
          this.isLogin = false;
          this.store.dispatch(new Auth.SetUnauthenticated);
        } else {
          this.socialUser = user;
          this.isLogin = true;
          this.store.dispatch(new Auth.SetAuthenticated);
        }
      });
    }
    // this.innerWidth = window.innerWidth;
  }

  responsiveSticky(value) {
    let element = document.getElementById('navbar');
    let bodyelement = document.getElementById('main-body');
    if (window.pageYOffset > value) {
      element.classList.add('sticky');
      bodyelement.classList.add('sticky-mainmenu');
    } else {
      element.classList.remove('sticky');
      bodyelement.classList.remove('sticky-mainmenu');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.windowinnerWidth = window.innerWidth;
    if (this.windowinnerWidth < 576) {
      this.responsiveSticky(163);
    } else {
      this.responsiveSticky(129);
    }
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  /* //get custom ads api call -Ngrx Store */
  getCustomAds() {
    this.sportsService.getcustomadsbanner().pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        if (res['data']) {
          this.store.dispatch(new Ads.SaveAds(res['data']));
        }
      });
  }

  /* //nav bar click event */
  linkactive(linkid) {
    let navel = this.navbarnav.nativeElement;
    let navrect = navel.getBoundingClientRect();
    let el = document.getElementById(`nav-link${linkid}`); /* //get particular id nav-element */
    let rect = el.getBoundingClientRect();
    let curPoint = rect['x'] - navrect['x'];
    this.renderer2.setStyle(
      this.navpointer.nativeElement,
      'width',
      rect.width + 'px'
    ); /* //set */
    this.renderer2.setStyle(
      this.navpointer.nativeElement,
      'left',
      curPoint + 'px'
    );
  }

  /* //dynamic routing */
  routing(routerlink) {
    if (routerlink) {
      this.router.navigate([`${routerlink}`]);
    } else {
      this.router.navigate(['/']);
    }
  }

  close($event) {
    if (!$event) {
      this.issearch = false;
      this.renderer2.removeClass(document.body, 'search-box-open');
    }

  }
  /* //search bar open */
  searchopen() {
    this.isapply = false;
    if (!this.issearch) {
      this.issearch = true;
      this.renderer2.addClass(document.body, 'search-box-open');
    } else {
      this.issearch = false;
      this.renderer2.removeClass(document.body, 'search-box-open');
    }


  }
  openmodal() {
    this.modalService.open(LoginModalComponent);
  }
  /*  //search close */
  closesearch() {
    this.issearch = false;
    // this.searchkey = "";
    this.renderer2.removeClass(document.body, 'search-box-open');
  }

  getuserLogout(token) {
    this.sportsService.userlogout(token).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.store.dispatch(new Auth.SetUnauthenticated());
    });
  }

  logout() {
    this.authService.signOut().then(res => {
      if (this.commonService.getFromStorage('userT')) {
        this.getuserLogout(this.commonService.getFromStorage('userT'));
        localStorage.removeItem('userT');
        localStorage.removeItem('userId');
      }
    });
  }


  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  preventDefaultForScrollKeys(e) {
    if (this.keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  }

  disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, { passive: false });
    document.addEventListener('wheel', this.preventDefault, { passive: false }); // Disable scrolling in Chrome
    document.addEventListener('touchmove', this.preventDefault, { passive: false });
  }

  enableScroll() {
    if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    document.removeEventListener('wheel', this.preventDefault); // Enable scrolling in Chrome
    document.removeEventListener('touchmove', this.preventDefault, false);
  }
  openLangMenu(val) {
    this.langMenu = val;
  }

  openMenu() {
    this.isapply = !this.isapply;
    if (this.isapply)
      this.disableScroll();
    else
      this.enableScroll();
  }
  onRedirect() {
    this.isapply = false;
    this.enableScroll();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.enableScroll();
  }
}

