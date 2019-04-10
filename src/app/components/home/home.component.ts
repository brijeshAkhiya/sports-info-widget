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
  ArticleUrl: any;
  mainBannerObj: {};
  constructor(private slugifyPipe: SlugifyPipe, private renderer2: Renderer2, private sportsService: SportsService) { }

  ngOnInit() {
    this.getBannerPost();
    this.getPopularArticles();
    this.getPopularVideos();
    this.getRecentPosts();
  }


  //get banner posts 

  getBannerPost() {
    this.sportsService.getbannerpost().subscribe((res) => {
      if (res['data']) {
        console.log(res['data']);
        this.mainBannerObj = res['data'].oMainBanner;
        setTimeout(() => {
          let bannerurl = this.mainBannerObj['sImage']
          this.getDominantColor(bannerurl);

        }, 1000);
      }
    })
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

  getRecentPosts() {
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
    console.log('fnnn');

    var vibrant = new Vibrant()
    console.log(vibrant);

    var swatches = vibrant.swatches()
    console.log('swa', swatches);
  }

  //get dominant color of image - vibrant

  getDominantColor(image) {
    let img = this.img.nativeElement;
    this.renderer2.setAttribute(img, 'src', image)
    var canvas = this.renderer2.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/jpeg");
    dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");
    this.renderer2.setAttribute(img, 'src', dataURL)

      console.log(img);


    // setTimeout(() => {
    //   this.fn(img);
    // },2000);


    // for (var swatch in swatches) {
    //   console.log(swatch);

    //   if (swatches.hasOwnProperty(swatch) && swatches[swatch])
    //     console.log(swatch, swatches[swatch].getHex())
    //   console.log('2a');

    //   console.log('rr', swatches[swatch].getRgb())
    // }

  }

  myfn() {
    // const ele:HTMLImageElement = <HTMLImageElement>document.getElementById('img');
    console.log('my fn');
    
    let img = this.img.nativeElement;

    var vibrant = new Vibrant(img);
    var swatches = vibrant.swatches()
    for (var swatch in swatches)
      console.log(swatch);

    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
      console.log(swatch, swatches[swatch].getHex())

  }

}
