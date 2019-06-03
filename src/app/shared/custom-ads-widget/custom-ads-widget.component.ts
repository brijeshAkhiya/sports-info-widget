import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { SportsService } from "../../providers/sports-service";

@Component({
  selector: 'app-custom-ads-widget',
  templateUrl: './custom-ads-widget.component.html',
  styleUrls: ['./custom-ads-widget.component.css']
})
export class CustomAdsWidgetComponent implements OnInit {
  @Input()type:any
  adsObj: {};
  addata: any;
  defaultImageLarge = '/assets/images/ad-1320-300.jpg'
  defaultImageRectangle = '/assets/images/ad-320-267.jpg'
  defaultImageBanner = '/assets/images/ad-320-80.jpg'

  constructor(private store: Store<any>,private sportsService: SportsService,) { }

  ngOnInit() {
    this.store.subscribe(data => {
      let arr = data["ads"].Ads;
      this.adsObj = {};
      arr.map(data => {
        if (!this.adsObj[data.eType]) 
          this.adsObj[data.eType] = [];
        this.adsObj[data.eType].push(data);
      });
    });  
    //pick random custom ad from ngrx store data obj
    this.addata = this.adsObj[this.type][Math.floor(Math.random() * this.adsObj[this.type].length)];    
  }

  adclick(id,adlink){
    this.updateAdclickCount(id);
    window.open(adlink,'_blank');   
  }

  updateAdclickCount(id){
    if(id){
      this.sportsService.updateaddclickcount(id).subscribe((res)=>{
        if(res){
        }
      })
    }
  }
}
