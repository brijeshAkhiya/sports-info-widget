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
 
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.getCustomAds();
  }

  //get custom ads data from Ngrx 
  
    getCustomAds(){
    this.store.subscribe((data)=>{
        this.customads = data['ads'].Ads
     })
    }

}
