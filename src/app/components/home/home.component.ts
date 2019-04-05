import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { SlugifyPipe } from '../../pipes/slugpipe'; //import it from your path

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('videoele') videoele: ElementRef
  isPlayBtn: boolean = true
  constructor(private slugifyPipe: SlugifyPipe, private renderer2: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.slugify('ipl 208')
  }

  slugify(input: string) {
    var your_new_slug = this.slugifyPipe.transform(input);
    console.log(your_new_slug);
  }

  //video play event

  playvideo() {
    let videoEle = this.videoele.nativeElement;
    videoEle.play();
    this.renderer2.setAttribute(this.videoele.nativeElement,'controls','');
    this.isPlayBtn = false; //hide play button once video getting played.
  }

}
