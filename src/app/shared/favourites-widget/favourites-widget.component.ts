import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from "@providers/sports-service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../app-reducer'

@Component({
  selector: 'app-favourites-widget',
  templateUrl: './favourites-widget.component.html',
  styleUrls: ['./favourites-widget.component.css']
})
export class FavouritesWidgetComponent implements OnInit {
  @Input() value: any
  isadded: boolean = false
  userfavourites: any;
  isLogin: boolean = true;
  constructor(private sportsService: SportsService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    if (localStorage.getItem('userT')) {
      this.store.subscribe((data) => {
        this.userfavourites = data.Favourites.Favourites
        this.userfavourites.map((data) => {
          if (data.id == this.value.id) {
            this.isadded = true
          }
        })
      })
    }
  }

  addfav() {
    if (localStorage.getItem('userT')) {
      if (this.isadded) {
        this.isadded = false
        this.userfavourites.splice(this.userfavourites.findIndex(v => v.id === this.value.id), 1);
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
      this.isLogin = false
      setTimeout(() => {
        this.isLogin = true
      }, 3000);
    }

  }

  updatefavourites(data) {
    this.userfavourites.push(data);
    this.sportsService.updatefavourites({ data: this.userfavourites }).subscribe((res: any) => {
      if (res) {
        console.log(res);
      }
    })
  }

}
