import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from "@providers/sports-service";
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

import { Router } from '@angular/router';

@Component({
  selector: 'app-match-facts-figures',
  templateUrl: './match-facts-figures.component.html',
  styleUrls: ['./match-facts-figures.component.css']
})
export class MatchFactsFiguresComponent implements OnInit {

  @Input() matchdata;
  @Input() teamLastmatch;
  @Input() teamMatchResult;
  venuedetails;
  matchprobability;
  stylepercentage;
  comp1;
  comp2;

  constructor(
    private sportsService: SportsService,
    private router: Router,
    public cricketService: CricketService, private commonService: CommonService) { }

  ngOnInit() {
    console.log(this.teamMatchResult);

    if (this.matchdata) {
      this.getVenueData();
      if (this.matchdata.sport_event_status.status != 'ended' || this.matchdata.sport_event_status.status != 'closed')
        this.getMatchProbability();

    }
  }

  /** Get Venue Details */
  getVenueData() {
    if (this.matchdata.sport_event.venue) {
      this.venuedetails = this.matchdata.sport_event.venue;
      if (this.matchdata.sport_event.venue.map_coordinates) {
        this.venuedetails.lat = Number(this.matchdata.sport_event.venue.map_coordinates.split(",")[0]);
        this.venuedetails.long = Number(this.matchdata.sport_event.venue.map_coordinates.split(",")[1]);
      } else {
        // TODO - Reverse Geo coding
        console.log('reverse geo code');
        this.sportsService.getReverseGeo(this.venuedetails.name).subscribe((res: any) => {
          this.venuedetails.lat = res.results[0].geometry.location.lat;
          this.venuedetails.long = res.results[0].geometry.location.lng;
        })
      }
    }
  }

  /** get match probablities */
  getMatchProbability() {
    this.sportsService.getmatchprobability(this.matchdata.sport_event.id).subscribe((res: any) => {
      this.matchprobability = res.data;
      if (
        this.matchprobability[0].probability >
        this.matchprobability[1].probability
      ) {
        this.comp1 = this.matchprobability[0];
        this.comp2 = this.matchprobability[1];
        this.stylepercentage = `${this.matchprobability[0].probability}%`;
      } else {
        this.comp1 = this.matchprobability[1];
        this.comp2 = this.matchprobability[0];
        this.stylepercentage = `${this.matchprobability[1].probability}%`;
      }
    });
  }

  //get match detail
  matchDetail(id, team1, team2) {
    let teams = team1.concat("-", team2);
    this.router.navigate(["/cricket/match", btoa(id), teams]);
  }


}
