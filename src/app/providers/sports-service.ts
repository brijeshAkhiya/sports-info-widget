import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

export interface Config {
   componentType: string,
   show: Boolean
}


@Injectable()
export class SportsService {
   configs: Observable<any>;
   constructor(public http: HttpClient) { }


   //<----home page services starts -------->

   //get popular posts - HOME

   getpopularpost(data) {
      return this.http.post(environment.apiUrl + environment.version + '/posts/popular', data);
   }

   //get recent posts - HOME

   getrecentpost(data) {
      return this.http.post(environment.apiUrl + environment.version + '/posts/recent', data);
   }

   //get banner posts - HOME 

   getbannerpost() {
      return this.http.get(environment.apiUrl + environment.version + '/posts/banner');

   }

   //get popular tags - HOME 

   getpopulartags(data) {
      return this.http.post(environment.apiUrl + environment.version + '/populartags', data);
   }

   //get header slider 
   getheaderslider(){
      return this.http.get(environment.apiUrl + environment.version + '/upperslider');
      
   }

   //get 3 days match results - HOME

   // getmatchresults():Observable<Config[]> {
   //    this.configs = this.http.get(environment.apiUrl + environment.version + '/cricket/results').pipe(map(data=>data),publishReplay(1), // this tells Rx to cache the latest emitted
   //    refCount());
   // }

   getmatchresults(): Observable<Config[]> {

      // Cache it once if configs value is false
      if (!this.configs) {
         this.configs = this.http.get(environment.apiUrl + environment.version + '/cricket/results').pipe(
            map(data => data),
            publishReplay(1), // this tells Rx to cache the latest emitted
            refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
         );
      }
      return this.configs;
   }

   getmatchfixtures() {
      return this.http.get(environment.apiUrl + environment.version + '/cricket/fixtures');
   }

   //get current cricket tournaments - CRICKET Page API --------------->

   getcurrentseries() {
      return this.http.get(environment.apiUrl + environment.version + '/cricket/tournaments/current');
   }

   //get all fixtures - CRICKET

   getcricketfixtures(){
      return this.http.get(environment.apiUrl + environment.version + '/cricket/fixtures/all');

   }

   
}