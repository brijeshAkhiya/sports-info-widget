import { Component, OnInit } from "@angular/core";
import { SportsService } from "../../providers/sports-service";

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
        console.log("reqjoin::", res);
        this.isshow = true;
        this.isapply = false;
        this.listenEventroom("echoEvent");
      }
    });
  }

  //listen event from particular match
  listenEventroom(echoEvent) {
    this.socket.on("echoEvent", res => {
      if (this.flashvalue) {
        this.isnewflashvalue = false;
        this.isnewflashvalue = true;
        this.flashvalue = res;
      }
      this.isnewflashvalue = true;
      this.flashvalue = res;
    });
  }
}
