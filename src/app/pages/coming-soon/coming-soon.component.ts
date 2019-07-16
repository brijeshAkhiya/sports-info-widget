import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {

  lottieConfig: any;
  sport: any;
  images = {
    'kabaddi' : 'assets/images/coming-soon/kabaddi.jpg',
    'soccer' :'assets/images/coming-soon/football.jpg',
    'badminton' : 'assets/images/coming-soon/badminton.jpg',
    'basketball' : 'assets/images/coming-soon/basketball.jpg',
    'field-Hockey' : 'assets/images/coming-soon/hockey.jpg',
    'racing' : 'assets/images/coming-soon/racing.jpg',
    'tennis-sports' : 'assets/images/coming-soon/tennis.jpg',
  }

  constructor(private activatedroute: ActivatedRoute) {
    this.lottieConfig = {
      path: 'assets/json/animation.json',
      autoplay: true,
      loop: true
    };
  }

  ngOnInit() {
    this.sport = this.activatedroute.snapshot.params.sport;
    this.activatedroute.params.subscribe(params => {
      this.sport = params.sport;
    });
  }

}
