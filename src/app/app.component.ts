import { Component, OnInit } from '@angular/core';
import { Router ,NavigationEnd} from "@angular/router";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Store } from '@ngrx/store'
import * as fromRoot from './app-reducer'
import * as Auth from './store/auth/auth.actions';
//vibrant import 
// declare var Vibrant: any;
// import '../assets/js/vibrant.js';
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
  vibrantcolor:any
  mutedcolor:any
  constructor(private http:HttpClient,private router: Router,private socialLoginService: AuthService,private store: Store<fromRoot.State>){

  }

  ngOnInit(){
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });

    this.users$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
    this.socialLoginService.authState.subscribe((user) => {
     // console.log('user',user);
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
   // console.log('in');
    
    this.socialLoginService.signOut().then((res)=>{
      if(res == undefined){
      this.store.dispatch(new Auth.SetUnauthenticated());
      }
      
    })
  }

  // myfn(){
  //   const ele:HTMLImageElement = <HTMLImageElement>document.getElementById('img');
  
  //   var vibrant = new Vibrant(ele);
  //   var swatches = vibrant.swatches()
    
    
  //   for (var swatch in swatches){
  //       if (swatches.hasOwnProperty(swatch) && swatches[swatch] && swatch == "Vibrant"){
  //           console.log(swatch, swatches[swatch].getHex())

  //           this.vibrantcolor = swatches[swatch].getHex();
  //           console.log('vibrant',this.vibrantcolor);
            

  //       }
  //       if (swatches.hasOwnProperty(swatch) && swatches[swatch] && swatch == "DarkMuted"){
  //         console.log(swatch, swatches[swatch].getHex())

  //         this.mutedcolor = swatches[swatch].getHex();
  //         console.log('muted',this.mutedcolor);
          

  //     }
  //          // console.log('111',swatches[swatch].getHex()[0]);
  //   }    
  // }


}
