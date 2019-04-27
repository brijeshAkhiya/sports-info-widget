import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SportsService } from '../../providers/sports-service';

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CricketComponent implements OnInit {
  cricketseries: any;
  populartags: any;
  populararticles: any;
  latestposts: any;
  popularvideos: any;

  constructor(private sportsService: SportsService) { }

  ngOnInit() {
    this.getPopularArticles();
    // this.getRecentPosts();
    this.getCricketSeries();
    this.getPopularTags();

  }

  //get current cricket series 

  getCricketSeries() {
    this.sportsService.getcurrentseries().subscribe((res) => {
      if (res['data']) {
        this.cricketseries = res['data']
      }
    })
  }

  //get popular cricket tags 

  getPopularTags() {
    let data = {
      eSport: 'Cricket'
    }
    this.sportsService.getpopulartags(data).subscribe((res) => {
      if (res['data']) {
        this.populartags = res['data']
      }
    })
  }

  //get popular posts 

  getPopularArticles() {
    let data = {
      nLimit: 10
    }
    this.sportsService.getpopularpost(data).subscribe((res) => {
      if (res['data']) {
        this.populararticles = res['data'];
      }
    })
  }

  //get recent posts 

  getRecentPosts() {
    let data = {
      eType: '',
      nLimit: 10,
      eSport: 'Cricket'
    }
    this.sportsService.getrecentpost(data).subscribe((res) => {
      if (res['data']) {
        this.latestposts = res['data'];
      }
    })
  }

  //get video posts 

  getVideoPosts() {
    let data = {
      nLimit: 10,
      eType: 'Video'
    }
    this.sportsService.getpopularpost(data).subscribe((res) => {
      if (res['data']) {
        this.popularvideos = res['data'];
      }
    })
  }



}
