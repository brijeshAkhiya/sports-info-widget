import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from "@providers/sports-service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../app-reducer'
import * as favourites from '../../store/favourites-management/favourites.actions'

@Component({
  selector: 'app-favourites-widget',
  templateUrl: './favourites-widget.component.html',
  styleUrls: ['./favourites-widget.component.css']
})
export class FavouritesWidgetComponent implements OnInit {
  @Input() value: any
  isadded: boolean = false
  userfavourites = [];
  isLogin: boolean = true;
  constructor(private sportsService: SportsService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.select('Favourites').subscribe((data) => {
      console.log(data);
      
      this.userfavourites = (typeof data.Favourites != 'undefined' && data.Favourites != null) ? data.Favourites : [] 
      this.isadded = false
      this.userfavourites.map((data) => {
        if (data.id == this.value.id && data.type == this.value.type) {
          this.isadded = true
        }
      })
    })
  }

  addfav() {
    if (localStorage.getItem('userT')) {
      if (this.isadded) {
        this.isadded = false
        this.userfavourites.splice(this.userfavourites.findIndex(v => v.id === this.value.id), 1);
        
        localStorage.setItem('favourites', JSON.stringify(this.userfavourites))
        
        this.sportsService.updatefavourites({ data: this.userfavourites }).subscribe((res: any) => {
          if (res) {
            console.log(res);
          }
        })
      }
      else {
        this.isadded = true
      
        this.updatefavourites(this.value);
      }
    }
    else {
      if (this.isadded) {
        this.isadded = false
        this.userfavourites.splice(this.userfavourites.findIndex(v => v.id === this.value.id), 1);
        localStorage.setItem('favourites', JSON.stringify(this.userfavourites))
        this.store.dispatch(new favourites.SaveFavourites(this.userfavourites));
      }
      else {
        if (JSON.parse(localStorage.getItem('favourites'))) {
          this.userfavourites = JSON.parse(localStorage.getItem('favourites'));
        }
        this.userfavourites.push(this.value)
        this.userfavourites = this.userfavourites.map((singleitem) => {
          return {
            ...singleitem,
            isSelect: false
          }
        });
        localStorage.setItem('favourites', JSON.stringify(this.userfavourites))
        this.store.dispatch(new favourites.SaveFavourites(this.userfavourites));
        this.isadded = true
      }
      // this.isLogin = false
      // setTimeout(() => {
      //   this.isLogin = true
      // }, 3000);
    }
  }

  updatefavourites(data) {
    this.userfavourites.push(data);
    this.userfavourites = this.userfavourites.map((singleitem) => {
      return {
        ...singleitem,
        isSelect: false
      }
    });
    localStorage.setItem('favourites', JSON.stringify(this.userfavourites))
    this.sportsService.updatefavourites({ data: this.userfavourites }).subscribe((res: any) => {
      if (res) {
      }
    })
  }

}
