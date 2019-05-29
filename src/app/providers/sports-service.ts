import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { map, publishReplay, refCount } from "rxjs/operators";
import * as io from 'socket.io-client';

export interface Config {
  componentType: string;
  show: Boolean;
}

@Injectable()
export class SportsService {
  configs: Observable<any>;
  currentseries: Observable<any>;
  constructor(public http: HttpClient) {}

  //<----home page services starts -------->

  //get popular posts - HOME
  getpopularpost(data) {
    return this.http.post(
      environment.apiUrl + environment.version + "/posts/popular",
      data
    );
  }

  //get recent posts - HOME
  getrecentpost(data) {
    return this.http.post(
      environment.apiUrl + environment.version + "/posts/recent",
      data
    );
  }

  //get related posts / specific id wise -common

  getrelatedpost(data) {
    return this.http.post(
      environment.apiUrl + environment.version + "/posts/related",
      data
    );
  }

  //get banner posts - HOME

  getbannerpost() {
    return this.http.get(
      environment.apiUrl + environment.version + "/posts/banner"
    );
  }

  //get popular tags - HOME

  getpopulartags(data) {
    return this.http.post(
      environment.apiUrl + environment.version + "/populartags",
      data
    );
  }

  //get header slider
  getheaderslider() {
    return this.http.get(
      environment.apiUrl + environment.version + "/upperslider"
    );
  }

  //get 3 days match results - HOME

  // getmatchresults():Observable<Config[]> {
  //    this.configs = this.http.get(environment.apiUrl + environment.version + '/cricket/results').pipe(map(data=>data),publishReplay(1), // this tells Rx to cache the latest emitted
  //    refCount());
  // }

  getmatchresults(): Observable<Config[]> {
    // Cache it once if configs value is false
    if (!this.configs) {
      this.configs = this.http
        .get(environment.apiUrl + environment.version + "/cricket/results")
        .pipe(
          map(data => data),
          publishReplay(1), // this tells Rx to cache the latest emitted
          refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
        );
    }
    return this.configs;
  }

  getmatchfixtures() {
    return this.http.get(
      environment.apiUrl + environment.version + "/cricket/fixtures"
    );
  }

  //get current cricket tournaments - CRICKET Page API --------------->

  getcurrentseries(): Observable<any> {
    return this.http.get(
      environment.apiUrl + environment.version + "/cricket/tournaments/current"
    );
    //    if (!this.currentseries) {
    //       this.configs = this.http.get(environment.apiUrl + environment.version + '/cricket/tournaments/current').pipe(
    //          map(data => data),
    //          publishReplay(1), // this tells Rx to cache the latest emitted
    //          refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
    //       );
    // }
    // return this.currentseries;
  }
  //get all fixtures - CRICKET

  getcricketfixtures(): Observable<Config[]> {
    // return this.http.get(environment.apiUrl + environment.version + '/cricket/fixtures/all');

    if (!this.configs) {
      this.configs = this.http
        .get(environment.apiUrl + environment.version + "/cricket/fixtures/all")
        .pipe(
          map(data => data),
          publishReplay(1), // this tells Rx to cache the latest emitted
          refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
        );
    }
    return this.configs;
  }

  //get cricket tournament leaders

  gettournamentleaders(id) {
    return this.http.get(
      environment.apiUrl +
        environment.version +
        `/cricket/tournament/${id}/leaders`
    );
  }

  //get cricket tournament points table

  gettournamentpointstable(id) {
    return this.http.get(
      environment.apiUrl +
        environment.version +
        `/cricket/tournament/${id}/point-table`
    );
  }

  //get tournament teams

  gettournamentteams(id) {
    return this.http.get(
      environment.apiUrl +
        environment.version +
        `/cricket/tournament/${id}/teams`
    );
  }

  //get tournament fixtures

  gettournamentfixtures(id) {
    return this.http.get(
      environment.apiUrl +
        environment.version +
        `/cricket/tournament/${id}/fixtures`
    );
  }

  //get tournament results
  gettournamentresults(id) {
    return this.http.get(
      environment.apiUrl +
        environment.version +
        `/cricket/tournament/${id}/results`
    );
  }

  //get team fixtures

  getteamfixtures(id) {
    return this.http.get(
      environment.apiUrl + environment.version + `/cricket/team/${id}/fixtures`
    );
  }

  //get player profile

  getplayerprofile(id) {
    return this.http.get(
      environment.apiUrl + environment.version + `/cricket/player/${id}`
    );
  }

  //get match probability
  getmatchprobability(id) {
    return this.http.get(
      environment.apiUrl +
        environment.version +
        `/cricket/match/${id}/probablities`
    );
  }

  //get match timeline
  getmatchtimeline(id) {
    return this.http.get(
      environment.apiUrl + environment.version + `/cricket/match/${id}/timeline`
    );
  }

  //get match timeline Delta - live
  getmatchtimelineDetla(id) {
    return this.http.get(
      environment.apiUrl +
        environment.version +
        `/cricket/match/${id}/timelinedelta`
    );
  }

  //get match timeline Delta - live
  getmatchtimelineDetlaDirect(id) {
    return this.http.get(
      `http://api.sportradar.us/cricket-t2/en/matches/${id}/timeline/delta.json?api_key=j2skxacnm2uf5g6g5645p43u`
    );
  }

  //get team vs team data
  getteamvsteamdata(team1id, team2id) {
    return this.http.get(
      environment.apiUrl +
        environment.version +
        `/cricket/team/${team1id}/team/${team2id}`
    );
  }

  //get blog view
  getblogview(id) {
    return this.http.get(
      environment.apiUrl + environment.version + `/posts/view/${id}`
    );
  }

  //update post view count

  updatepostviewcount(id) {
    return this.http.put(
      environment.apiUrl + environment.version + `/posts/view/${id}`,
      null
    );
  }

  //get blog comments
  getblogcommnets(data) {
    return this.http.post(
      environment.apiUrl + environment.version + `/comments/list`,
      data
    );
  }

  //post website inquiries

  postinquiries(data) {
    return this.http.post(
      environment.apiUrl + environment.version + `/inquiries`,
      data
    );
  }

  //get custom ads data

  getcustomadsbanner() {
    return this.http.get(environment.apiUrl + environment.version + `/ads`);
  }

  //update adclick count
  updateaddclickcount(id) {
    return this.http.get(
      environment.apiUrl + environment.version + `/ads/${id}`
    );
  }

  //get contact details
  getcontactdetails() {
    return this.http.get(
      environment.apiUrl + environment.version + `/contact-details`
    );
  }

  //get admin posts
  getadminposts(data) {
    return this.http.post(
      environment.apiUrl + environment.version + `/posts/adminposts`,
      data
    );
  }

  //get tournament team profile
  getteamprofile(tournamentid, teamid) {
    return this.http.get(
      environment.apiUrl +
        environment.version +
        `/cricket/tournament/${tournamentid}/teams/${teamid}`
    );
  }

  //get writer profile
  getwriterprofile(data) {
    return this.http.post(
      environment.apiUrl + environment.version + `/writerprofile`,
      data
    );
  }

  //get search results
  getsearchresult(data) {
    return this.http.post(
      environment.apiUrl + environment.version + `/search`,
      data
    );
  }

  //get CMS Content
  getcmscontent(sKey){
    let headers = new HttpHeaders({
      'Content-Type': 'text/html'
  });
    return this.http.get(
      environment.apiUrl + environment.version + `/cms/${sKey}`, {headers:headers,responseType:'text'}
    );
  }

  connect(){
    return io(environment.socket.baseUrl)
    
  }


}
