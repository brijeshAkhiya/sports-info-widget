import { Component, OnInit, Input } from '@angular/core';

import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.css']
})
export class SidebarLinksComponent implements OnInit {

  @Input() data;
  @Input() sport;
  @Input() link_type;
  @Input() options;

  constructor(
    private sportsService: SportsService
  ) { }

  ngOnInit() {
    if (!this.data) {
      if (this.link_type == 'blogs' && this.options.type == 'recent')
        this.getRecentPosts();
      else if (this.link_type == 'tournament' && this.options.type == 'current' && this.sport == 'Cricket')
        this.getCurrentSeries();
      else if (this.link_type == 'popular' && this.options.type == 'tags')
        this.getPopularTags();
      else if (this.sport == 'Soccer' && this.link_type == 'tournament' && this.options.type == 'current')
        this.getSoccerCurrentTournament();
    }
  }

  // get recent posts
  getRecentPosts() {
    this.sportsService.getrecentpost({ eType: '', nLimit: 10 }).subscribe((res: any) => {
      if (res.data) {
        this.data = res.data;
      }
    });
  }
  // get current cricket series
  getCurrentSeries() {
    this.sportsService.getcurrentseries().subscribe((res: any) => {
      if (res.data) {
        this.data = res.data;
      }
    });
  }

  // get popular cricket tags
  getPopularTags() {
    this.sportsService.getpopulartags(this.options.reqParams).subscribe((res: any) => {
      if (res.data) {
        this.data = res.data;
        if (this.sport == 'Basketball') {
          this.data = res.data.filter(tag => tag.type != 'Tournament');
        }
      }
    });
  }

  // get soccer current tournament
  getSoccerCurrentTournament() {
    this.sportsService.getSoccerTournamentList().subscribe((res: any) => {
      if (res.data) {
        this.data = res.data;
      }
    });
  }

}
