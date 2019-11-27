import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, Input, ViewChild, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';

import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import * as fromRoot from '../../../app-reducer';
import * as Auth from '../../../store/auth/auth.actions';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';



@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginModalComponent implements OnInit {
  socialUser: any;
  isuserblock: boolean;
  user: SocialUser;
  constructor(
    private sportsService: SportsService,
    private authService: AuthService,
    private socialLoginService: AuthService,
    private store: Store<fromRoot.State>,
    private modalService: NgbModal,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });

  }

  signInWithFB(): void {
    this.socialLoginService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(res => {
        if (res) {
          this.socialUser = res;
          this.validateSocialLogin('fb', res.authToken);
          this.modalService.dismissAll();
        }
      });
  }

  signInWithGoogle(): void {
    this.socialLoginService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialLoginService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        if (res) {
          this.socialUser = res;
          this.validateSocialLogin('google', res.idToken);
          this.modalService.dismissAll();
        }
      })
      .catch(error => { });
  }

  validateSocialLogin(type, token) {
    if (type == 'fb') {
      let data = {
        sFbToken: token
      };
      this.sportsService.sociallogin(type, data).subscribe((res: any) => {
        this.commonService.setInStorage('userT', res.Authorization);
        this.commonService.setInStorage('userId', res.data._id);
        this.store.dispatch(new Auth.SetAuthenticated());
      }, (error) => {
        if (error.status == 401) {
          this.isuserblock = true;
          setTimeout(() => {
            this.isuserblock = false;
          }, 4000);
          this.authService.signOut();
        }
      });
    } else if (type == 'google') {
      let data = {
        sGoogleToken: token
      };
      this.sportsService.sociallogin(type, data).subscribe((res: any) => {
        this.commonService.setInStorage('userT', res.Authorization);
        this.commonService.setInStorage('userId', res.data._id);
        this.store.dispatch(new Auth.SetAuthenticated());
      }, (error) => {
        if (error.status == 401) {
          this.isuserblock = true;
          setTimeout(() => {
            this.isuserblock = false;
          }, 4000);
          this.authService.signOut();
        }
      });
    }
  }

  closemodal() {
    this.modalService.dismissAll();
  }

}
