import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { SportsService } from '../../providers/sports-service';
import { SlugifyPipe } from '../../pipes/slugpipe'; //import it from your path
import {TruncatePipe} from '../../pipes/truncatepipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('videoele') videoele: ElementRef
  isPlayBtn: boolean = true
  populararticles = []
  popularvideos = []
  recentposts = []
  ArticleUrl: any;
  constructor(private slugifyPipe: SlugifyPipe, private renderer2: Renderer2, private sportsService: SportsService) { }

  ngOnInit() {
    this.getPopularArticles();
    this.getPopularVideos();
    this.getRecentPosts();
  }

  //get popular posts 

  getPopularArticles() {
    let data = {
      eType: 'Article'
    }
    this.sportsService.getpopularpost(data).subscribe((res) => {
      if (res['data']) {
        this.populararticles = res['data'];
        this.ArticleUrl = this.populararticles[0].sImage
      }
    })
  }

  //get popular videos

  getPopularVideos() {
    let data = {
      eType: 'Videos'
    }
    this.sportsService.getpopularpost(data).subscribe((res) => {
      if (res['data']) {
        this.popularvideos = res['data'];
      }
    })
  }

  //get recent posts 

  getRecentPosts(){
    let data = {
      eType: ''
    }
    this.sportsService.getrecentpost(data).subscribe((res) => {
      if (res['data']) {
        this.recentposts = res['data'];
      }
    })
  }


  slugify(input: string) {
    var your_new_slug = this.slugifyPipe.transform(input);
    console.log(your_new_slug);
  }

  //video play event

  playvideo() {
    let videoEle = this.videoele.nativeElement;
    videoEle.play();
    this.renderer2.setAttribute(this.videoele.nativeElement, 'controls', '');
    this.isPlayBtn = false; //hide play button once video getting played.
  }

  fn(val) {
    console.log(val);

  }

}
