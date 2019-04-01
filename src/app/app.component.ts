import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { Store } from '@ngrx/store'
import * as fromRoot from './app-reducer'
import * as Auth from './store/auth/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app'
  users$:Observable<any>
  socialUser:any
  socialUser2:any;
  constructor(private http:HttpClient,private socialLoginService: AuthService,private store: Store<fromRoot.State>){

  }

  ngOnInit(){
    this.users$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
    this.socialLoginService.authState.subscribe((user) => {
      console.log('user',user);
      this.socialUser = user
    });

  }

  signInWithFB(): void {
    this.socialLoginService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res)=>{
      if(res){
      this.socialUser = res
      this.store.dispatch(new Auth.SetAuthenticated());
      }
    });
  }

  signInWithGoogle(): void {
    console.log('sigin google');
    
    this.socialLoginService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res)=>{
      if(res){
      this.store.dispatch(new Auth.SetAuthenticated());

      this.socialUser2 = res
      }
      
    }).catch(error=>{
      console.log(error);
      
    });
  }

  logout(){
    console.log('in');
    
    this.socialLoginService.signOut().then((res)=>{
      if(res == undefined){
      this.store.dispatch(new Auth.SetUnauthenticated());
      }
      
    })
  }



}
