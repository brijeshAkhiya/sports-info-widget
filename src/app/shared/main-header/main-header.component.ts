import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxTinySliderSettingsInterface } from 'ngx-tiny-slider';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app-reducer'
import * as Auth from '../../store/auth/auth.actions';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SportsService } from '../../providers/sports-service';
import { Observable ,interval} from 'rxjs';

import * as Ads from '../../store/ads-management/ads.actions';


@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  @ViewChild('navpointer') navpointer: ElementRef
  @ViewChild('navbarnav') navbarnav: ElementRef
  tinySliderConfig: NgxTinySliderSettingsInterface;

 
  sliderdata: any;
  sliderresults = [];
  isapply: boolean = false;
  socialUser: any;


  constructor(private renderer2: Renderer2, private el: ElementRef, private router: Router, private sportsService: SportsService, 
    private modalService: NgbModal,private socialLoginService: AuthService,private store: Store<fromRoot.State>) {
      //get custom ads data Funtion call --->
      this.getCustomAds();

  }


  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    lazyLoad: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      540: {
        items: 2,
      },
      783: {
        items: 3,
      },
      1150: {
        items: 4,
      }
    },
    nav: true
  }


  ngOnInit() {
    this.getHeaderSliderData();
    
  }

  //get custom ads api call -Ngrx Store 
  getCustomAds(){
    this.sportsService.getcustomadsbanner().subscribe((res)=>{
        if(res['data']){
          this.store.dispatch(new Ads.SaveAds(res['data']));
        }
    },
    (error)=>{
      this.getCustomAds();
    })
  }

  //nav bar click event 
  linkactive(linkid) {
    var navel = this.navbarnav.nativeElement
    var navrect = navel.getBoundingClientRect();
    var el = document.getElementById(`nav-link${linkid}`); //get particular id nav-element
    var rect = el.getBoundingClientRect();
    var curPoint = rect['x'] - navrect['x'];
    this.renderer2.setStyle(this.navpointer.nativeElement, 'width', rect.width + "px"); //set
    this.renderer2.setStyle(this.navpointer.nativeElement, 'left', curPoint + "px");
  }

  //dynamic routing
  routing(routerlink) {
    if (routerlink) {
      this.router.navigate([`${routerlink}`]);
    }
    else {
      this.router.navigate(['/'])
    }
  }

  //get header slider data

  getHeaderSliderData() {
    this.sportsService.getheaderslider().subscribe((res) => {
      if (res['data']) {
        this.sliderdata = res['data'];
        
        this.sliderdata.map((data) => {
          if (data.slider_status == 'results') {
            this.sliderresults.push(data);
          }
          if(data.slider_status == 'live' || data.slider_status == 'upcoming' ){
            // interval(5000).subscribe((x)=>{
            //   this.getHeaderSliderData();
            // })
          }
        })
        this.sliderresults = this.sliderresults.map(data => {
          let obj = {};
          let team_arr = data["competitors"]
          team_arr.map(single => {
            obj[single.qualifier] = single
          })

          let period_score_new = data["period_scores"]
          if (period_score_new) {
            period_score_new = period_score_new.map(singleb => {
              if (singleb.away_score !== undefined) {
                return { ...singleb, team: obj["away"], teamFlag: true }
              } else {
                return { ...singleb, team: obj["home"], teamFlag: false }
              }
            })
            return { ...data, period_score_new }
          }
          else {
            return data;
          }
        })
      }

    })
  }


  //get match detail
  getmatchdetail(id,team1,team2){
    let teams =  team1.concat('-',team2)
    this.router.navigate(['/cricket/match',btoa(id),teams])
  }


  signInWithFB(): void {
    this.socialLoginService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res)=>{
      if(res){
        console.log(res);
        
      this.socialUser = res
      this.store.dispatch(new Auth.SetAuthenticated());
      }
    });
  }

  signInWithGoogle(): void {
    this.socialLoginService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialLoginService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res)=>{
      if(res){
      this.store.dispatch(new Auth.SetAuthenticated());

      this.socialUser = res
      }
      
    }).catch(error=>{
      console.log(error);
      
    });
  }


  //Social login modal
  closeResult: string;
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' , windowClass : "signin-modal"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
