import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app-reducer';
import * as favourites from '../../store/favourites-management/favourites.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites-widget',
  template: `
  <button class="add-to-fav-btn" [ngClass]="{'added': isadded}"
  title="{{('widget_Module2.Add_to_favourites' | translate)}}"
  (click)="add()"><span>{{ isadded ? ('widget_Module2.Added_to_favourites' | translate) : ('widget_Module2.Add_to_favourites' | translate)}}</span></button>
  <div class="login-toast active d-flex align-items-center" *ngIf="!isLogin">
    <img src="assets/images/blog/error-icon.svg" alt="error">
    <p class="dark-text"> {{ 'Shared_module.must_login_for_fav' | translate }}</p>
  </div>
`
})
export class FavouritesWidgetComponent implements OnInit, OnDestroy {
  @Input() value: any;
  isadded = false;
  userfavourites = [];
  isLogin = true;
  favSubscription;

  constructor(
    private sportsService: SportsService,
    private store: Store<fromRoot.State>,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.favSubscription = this.store.select('Favourites').subscribe((data) => {
      this.userfavourites = (typeof data.Favourites != 'undefined' && data.Favourites != null) ? data.Favourites : [];
      this.isadded = false;
      this.userfavourites.map((data) => {
        if (data.url == this.router.url) {
          this.isadded = true;
        }
      });
    });
  }

  add() {
    if (this.isadded) {
      this.userfavourites.splice(this.userfavourites.findIndex(v => v.url === this.router.url), 1);
    } else {
      this.userfavourites.push({ name: this.value.name, url: this.router.url, isSelect: false });
    }
    this.isadded = (this.isadded) ? false : true;
    this.commonService.setInStorage('favourites', JSON.stringify(this.userfavourites));
    if (this.commonService.getFromStorage('userT')) {
      this.sportsService.updatefavourites({ data: this.userfavourites });
    } else
      this.store.dispatch(new favourites.SaveFavourites(this.userfavourites));
  }

  ngOnDestroy() {
    this.favSubscription.unsubscribe();
  }

}
