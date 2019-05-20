import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { getAdsState} from '../../../app-reducer';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  customads: any;
  slides = [
    {id:'1'},
    {id:'2'},
    {id:'3'},
    {id:'4'},

  ]
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.getCustomAds();
  }

  customOptions: any = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    lazyLoad: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      612: {
        items: 2,
      }
    },
    nav: false
  }


  //get custom ads data from Ngrx 
  
    getCustomAds(){
    this.store.subscribe((data)=>{
        this.customads = data['ads'].Ads
     })
    }

}
