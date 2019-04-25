import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../providers/sports-service';
@Component({
  selector: 'app-cricket-home',
  templateUrl: './cricket-home.component.html',
  styleUrls: ['./cricket-home.component.css']
})
export class CricketHomeComponent implements OnInit {
  cricketseries: any;
  populartags: any;
  populararticles: any;
  latestposts: any;
  popularvideos: any;
  widget1title = 'Current Series';
  widget1type = 'currentseries'
  widget2title = 'Popular Right Now'
  widget2type = 'populartags'
  constructor(private sportsService: SportsService) { }

  ngOnInit() {
    this.getPopularArticles();
    // this.getRecentPosts();
    //this.getCricketSeries();
   // this.getPopularTags();

  }


   //get current cricket series 

   getCricketSeries() {
    this.sportsService.getcurrentseries().subscribe((res) => {
      if (res['data']) {
        this.cricketseries = res['data']
        console.log(this.cricketseries);
        
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
