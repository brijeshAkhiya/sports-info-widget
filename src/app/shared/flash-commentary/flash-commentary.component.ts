import { Component, OnInit } from "@angular/core";
import { SportsService } from "../../providers/sports-service";
import { Observable } from "rxjs";

@Component({
  selector: "app-flash-commentary",
  templateUrl: "./flash-commentary.component.html",
  styleUrls: ["./flash-commentary.component.css"]
})
export class FlashCommentaryComponent implements OnInit {
  socket: any;
  isapply: boolean;
  livematches: any;
  currentmatchid: any;
  teamsname: any;
  isshow: boolean;
  flashvalue: any;
  isnewflashvalue: boolean;
  newscoreObj = [];
  flashscorecolor: any;
  constructor(private io: SportsService) { }

  ngOnInit() {
    this.socket = this.io.connect();
    this.socket.on("connect", res => {
      this.reqFetchRooms();
      this.onNewScore();
    });
    this.onNewScore().subscribe(res => { });
    this.onNewCommentary().subscribe(res => { });
  }

  //request fetch rooms/matches
  reqFetchRooms() {
    this.socket.emit("reqFetchRooms", {}, (error, res) => {
      if (res) {
        console.log('rooms:', res);
        this.livematches = res.map(singleMatch => {
          this.newscoreObj[singleMatch.id] = singleMatch
          return {
            ...singleMatch,
            isActive: true
          }
        });
      }
    });
  }

  //Match is active/disable handled by this function
  reqLeaveRoom(matchid, isactive) {
    if (isactive == true) {
      this.socket.emit("reqLeaveRoom", matchid, (error, res) => {
        if (res) {
          console.log(res);
          this.livematches = this.livematches.map((singlematch) => {
            if (singlematch.id == matchid) {
              return {
                ...singlematch,
                isActive: false
              }
            } else {
              return singlematch
            }
          })
          console.log('afterleave:', this.livematches);
        }
      });
    }
    else if (isactive == false) {
      this.socket.emit("reqJoinRoom", matchid, (error, res) => {
        if (res) {
          console.log(res);
          this.livematches = this.livematches.map((singlematch) => {
            if (singlematch.id == matchid) {
              return {
                ...singlematch,
                isActive: true
              }
            } else {
              return singlematch
            }
          })
          console.log('afterjoin:', this.livematches);
        }
      });
    }

  }

  //request re-connect room/match from localstorage - old logic
  onReJoinRoom(matchid, teams) {
    this.teamsname = teams;
    this.currentmatchid = matchid
    this.socket.emit("reqJoinRoom", matchid, (error, res) => {
      if (res) {
        localStorage.setItem('Matchid', this.currentmatchid);
        localStorage.setItem('matchteams', JSON.stringify(this.teamsname))
        this.reqFetchRooms();
        this.isshow = true;
        this.isapply = false;
        this.onNewScore();
      }
    });
  }

  //listen event from particular match

  public onNewScore(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("echoEvent", (data: any) => {
        console.log('newcomme:', data);
        observer.next(data);
        if (this.flashvalue) {
          this.isnewflashvalue = false;
          this.flashscorecolor = this.newscoreObj[data.id].color
          this.flashvalue = data.data.data;
          setTimeout(() => {
            this.isnewflashvalue = true;
          }, 100);
        } else {
          this.isnewflashvalue = true;
          this.flashscorecolor = this.newscoreObj[data.id].color
          this.flashvalue = data.data.data;
        }
      });
    });
  }

  //on change new commentary

  public onNewCommentary(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("newCommentry", (data: any) => {
        observer.next(data);
        this.livematches = []
        this.livematches = data.map((singlematch) => {
          this.newscoreObj[singlematch.id] = singlematch
          return {
            ...singlematch,
            isActive: true
          }
        })
      });
    });
  }
}







