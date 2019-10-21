import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app-reducer';
import * as favourites from '../../store/favourites-management/favourites.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites-widget',
  templateUrl: './favourites-widget.component.html',
  styleUrls: ['./favourites-widget.component.css']
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
    private router: Router
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
    localStorage.setItem('favourites', JSON.stringify(this.userfavourites));
    if (localStorage.getItem('userT')) {
      this.sportsService.updatefavourites({ data: this.userfavourites });
    } else
      this.store.dispatch(new favourites.SaveFavourites(this.userfavourites));
  }

  ngOnDestroy() {
    this.favSubscription.unsubscribe();
  }

}
