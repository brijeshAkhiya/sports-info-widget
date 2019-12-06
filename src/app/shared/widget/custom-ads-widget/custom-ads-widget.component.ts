import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { SportsService } from '@providers/sports-service';

declare var window: any;
@Component({
  selector: 'app-custom-ads-widget',
  templateUrl: './custom-ads-widget.component.html',
  styleUrls: ['./custom-ads-widget.component.css']
})
export class CustomAdsWidgetComponent implements OnInit {
  @Input() type: any;
  adsObj = [];
  addata: any;
  defaultImageLarge = '/assets/images/ad-1320-300.jpg';
  defaultImageRectangle = '/assets/images/ad-320-267.jpg';
  defaultImageBanner = '/assets/images/ad-320-80.jpg';

  constructor(
    private store: Store<any>,
    private sportsService: SportsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // ngrx store code
      this.store.select('ads').subscribe((data: any) => {
        let arr = data.Ads;
        arr.map(data => {
          if (!this.adsObj[data.eType])
            this.adsObj[data.eType] = [];
          this.adsObj[data.eType].push(data);
        });
        // pick random custom ad from ngrx store data obj
        if (this.adsObj[this.type]) {
          this.addata = this.adsObj[this.type][Math.floor(Math.random() * this.adsObj[this.type].length)];
          if (this.addata.eAdType == 'JS') {
            this.loadJS(this.addata.sContent);
          }
        }

      });
    }
  }

  /** For load custom js */
  loadJS(ads) {
    this._document.body.append(this._document.createRange().createContextualFragment(ads))
  }

  adclick(id, adlink) {
    this.updateAdclickCount(id);
    window.open(adlink, '_blank');
  }

  updateAdclickCount(id) {
    if (id) {
      this.sportsService.updateaddclickcount(id);
    }
  }
}
