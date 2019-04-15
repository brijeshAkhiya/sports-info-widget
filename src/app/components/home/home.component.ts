import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { SportsService } from '../../providers/sports-service';
import { SlugifyPipe } from '../../pipes/slugpipe'; //import it from your path
declare var Vibrant: any;
import '../../../assets/js/vibrant.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('videoele') videoele: ElementRef
  @ViewChild('img') img: ElementRef

  isPlayBtn: boolean = true
  populararticles = []
  popularvideos = []
  recentposts = []
  bannerposts: any;
  bannerimages = []
  imageindex: number = 0;
  listindex: number = 0;
  populartags = [];
  constructor(private slugifyPipe: SlugifyPipe, private renderer2: Renderer2, private sportsService: SportsService) { }

  ngOnInit() {
    this.getBannerPost();
    this.getPopularArticles();
    this.getPopularVideos();
    this.getRecentPosts();
    this.getPopularTags();
  }


  //get banner posts 

  getBannerPost() {
    this.sportsService.getbannerpost().subscribe((res) => {
      if (res['data']) {
        this.bannerposts = res['data'];
        this.bannerposts.map((data, i) => {
          this.bannerimages[i] = data.sImage
        })
      }
    })
  }


  //get popular posts 

  getPopularArticles() {
    let data = {
      eType: 'Article',
      nLimit: 5
    }
    this.sportsService.getpopularpost(data).subscribe((res) => {
      if (res['data']) {
        this.populararticles = res['data'];
      }
    })
  }

  //get popular videos

  getPopularVideos() {
    let data = {
      eType: 'Video'
    }
    this.sportsService.getpopularpost(data).subscribe((res) => {
      if (res['data']) {
        this.popularvideos = res['data'];
      }
    })
  }

  //get recent posts 

  getRecentPosts() {
    let data = {
      eType: '',
      nLimit: 10
    }
    this.sportsService.getrecentpost(data).subscribe((res) => {
      if (res['data']) {
        this.recentposts = res['data'];
      }
    })
  }

  //get popular topics tags - 

  getPopularTags() {
    let data = {
      eSport: ''
    }
    this.sportsService.getpopulartags(data).subscribe((res) => {
      if (res['data']) {
        this.populartags = res['data']
      }
    })
  }

  //change image dynamically form list hover
  onmouseover(index) {
    this.imageindex = index //dyanmic image index value
    this.listindex = index
  }

  slugify(input: string) {
    var your_new_slug = this.slugifyPipe.transform(input);
  }

  //video play event

  playvideo() {
    let videoEle: HTMLVideoElement = this.videoele.nativeElement;
    console.log(videoEle);
    setTimeout(() => {
      videoEle.play();
    }, 1000);
    this.renderer2.setAttribute(this.videoele.nativeElement, 'controls', '');
    this.isPlayBtn = false; //hide play button once video getting played.
  }

}
