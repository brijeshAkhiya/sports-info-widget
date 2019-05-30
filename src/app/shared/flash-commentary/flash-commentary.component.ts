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
  constructor(private io: SportsService) {}

  ngOnInit() {
    this.socket = this.io.connect();
    this.socket.on("connect", res => {
      this.reqFetchRooms();
    });
    this.onNewScore().subscribe(res => {});
    this.onNewCommentary().subscribe(res => {});
  }

  //request fetch rooms/matches
  reqFetchRooms() {
    this.socket.emit("reqFetchRooms", {}, (error, res) => {
      if (res) {
        console.log("fetchrooms::", res);
        this.livematches = res;
      }
    });
  }

  //request join room/match

  reqJoinRoom(matchid, teams) {
    if (this.currentmatchid && matchid != this.currentmatchid) {
      this.socket.emit("reqLeaveRoom", this.currentmatchid, (error, res) => {
        if (res) {
          console.log("leaveroom ::", res);
        }
      });
    }
    this.currentmatchid = matchid;
    this.teamsname = teams.split("vs");
    this.socket.emit("reqJoinRoom", matchid, (error, res) => {
      if (res) {
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
        observer.next(data);
        if (this.flashvalue) {
          this.isnewflashvalue = false;
          this.flashvalue = data.data;
          setTimeout(() => {
            this.isnewflashvalue = true;
          }, 100);
        } else {
          this.isnewflashvalue = true;
          this.flashvalue = data.data;
        }
      });
    });
  }

  //on change new commentary

  public onNewCommentary(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("newCommentry", (data: any) => {
        observer.next(data);
        this.livematches = this.livematches.concat(data);
      });
    });
  }
}