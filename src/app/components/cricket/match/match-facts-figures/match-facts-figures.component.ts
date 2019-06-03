import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from "@providers/sports-service";
import { CricketService } from "@providers/cricket-service";
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

  constructor(
    private sportsService: SportsService,
    private router: Router,
    public cricketService: CricketService) {}

  ngOnInit() {
    console.log('lastmatchess::',this.teamLastmatch);
    
    if(this.matchdata){
    console.log('matchdata:::',this.matchdata);
    
      this.getVenueData();

      if(this.matchdata.sport_event_status.status == 'not_started')
        this.getMatchProbability();

    }
  } 

  /** Get Venue Details */
  getVenueData(){
    if (this.matchdata.sport_event.venue) {
      this.venuedetails = this.matchdata.sport_event.venue;
      if (this.matchdata.sport_event.venue.map_coordinates) {
        this.venuedetails.lat = Number(this.matchdata.sport_event.venue.map_coordinates.split(",")[0]);
        this.venuedetails.long = Number(this.matchdata.sport_event.venue.map_coordinates.split(",")[1]);
      } else {
        // TODO - Reverse Geo coding
        this.venuedetails.lat = 22.5726;
        this.venuedetails.long = 88.363;
      }
    }
  }

  /** get match probablities */
  getMatchProbability() {
    this.sportsService.getmatchprobability(this.matchdata.sport_event.id).subscribe((res:any) => {
      this.matchprobability = res.data;
      if (
        this.matchprobability[0].probability >
        this.matchprobability[1].probability
      ) {
        this.stylepercentage = `${this.matchprobability[0].probability}%`;
      } else {
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
