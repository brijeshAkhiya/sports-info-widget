import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "@env";
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
  constructor(public http: HttpClient) { }

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

  getmatchresults() {
    // Cache it once if configs value is false
    return this.http.get(environment.apiUrl + environment.version + "/cricket/results")


  }

  getmatchfixtures() {
    return this.http.get(
      environment.apiUrl + environment.version + "/cricket/fixtures"
    );
  }

  //get current cricket tournaments - CRICKET Page API --------------->

  getcurrentseries() {
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

  getcricketfixtures() {
    // return this.http.get(environment.apiUrl + environment.version + '/cricket/fixtures/all');

    return this.http
      .get(environment.apiUrl + environment.version + "/cricket/fixtures/all")
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

  //get team result
  getteamresults(id) {
    return this.http.get(
      environment.apiUrl + environment.version + `/cricket/team/${id}/results`
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

  //get match team lineups
  getmatchteamlineup(matchid) {
    return this.http.get(
      environment.apiUrl + environment.version + `/cricket/match/${matchid}/lineups`
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
      `http://192.168.11.118:3008/api/v1/user/json/${id}`
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

  //add user comment 
  addusercomment(data){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('userT')
    });
    return this.http.post(
      environment.apiUrl + environment.version + `/comments`,
      data,{ headers: headers }
    );
  }

  //post website inquiries

  postinquiries(data) {
    return this.http.post(
      environment.apiUrl + environment.version + `/inquiries`,
      data,
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

  //get team profile without tournament id
  getteamprofileview(teamid) {
    return this.http.get(
      environment.apiUrl +
      environment.version +
      `/cricket/team/${teamid}/profile`
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
  getcmscontent(sKey) {
    let headers = new HttpHeaders({
      'Content-Type': 'text/html'
    });
    return this.http.get(
      environment.apiUrl + environment.version + `/cms/${sKey}`, { headers: headers, responseType: 'text' }
    );
  }

  getReverseGeo(address) {
    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${environment.mapsKey}`
    );
  }

  //get meta tags 
  getmetatags(){
    return this.http.get(
      environment.apiUrl + environment.version + `/seotags` 
    );
  }

  //social login 
  sociallogin(type,data){
    return this.http.post(
      environment.apiUrl + environment.version + `/login/${type}`,
      data
    );
  }

  //social logout
  userlogout(token){
    let headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get(
      environment.apiUrl + environment.version + `/logout`, { headers: headers }
    );
  }

  //update favourites 
  updatefavourites(data){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('userT')
    });
    return this.http.put(
      environment.apiUrl + environment.version + `/favorites`,
      data,{ headers: headers }
    );
  }

  //get user favourites
  getuserfavourite(){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('userT')
    });
    return this.http.get(
      environment.apiUrl + environment.version + `/favorites` ,{headers:headers}
    );
  }

  connect() {
    return io(environment.socket.baseUrl)
  }


  /**
   * Kabaddi Services
   */

  //get teams
  getkabadditeams() {
    return this.http.get(
      environment.apiUrl +
      environment.version +
      `/kabaddi/team/list?per_page=15&paged=1`
    );
  }
  //get team details
  getkabaddiTeamProfile(id) {
    return this.http.get(
      environment.apiUrl +
      environment.version +
      `/kabaddi/team/${id}/profile`
    );
  }

  //get player profile
  getKabaddiPlayerprofile(id) {
    return this.http.get(
      environment.apiUrl + environment.version + `/kabaddi/player/${id}`
    );
  }


}
