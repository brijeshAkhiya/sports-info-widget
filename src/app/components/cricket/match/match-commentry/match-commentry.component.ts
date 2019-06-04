import { Component, OnInit, Input } from '@angular/core';
import { CricketService } from "@providers/cricket-service";

@Component({
  selector: 'app-match-commentry',
  templateUrl: './match-commentry.component.html',
  styleUrls: ['./match-commentry.component.css']
})
export class MatchCommentryComponent implements OnInit {

  @Input() data: any;
  @Input() commentry: any;
  @Input() oversummery: any;
  @Input() ballerList: any;
  @Input() batsmanList:any;
  showCommetry;
  ballers: any;
  currentover;

  constructor(
    private cricketService: CricketService
  ) {
  }

  ngOnInit(){
  }
}