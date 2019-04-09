import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable()
export class SportsService {

    constructor(public http: HttpClient) {}


    //<----home page services starts -------->
   
    //get popular posts - HOME

     getpopularpost(data){
        return this.http.post(environment.apiUrl + environment.version + '/posts/populer',data);
     }

     //get recent posts - HOME

     getrecentpost(data){
        return this.http.post(environment.apiUrl + environment.version + '/posts/recent',data);
     }

}