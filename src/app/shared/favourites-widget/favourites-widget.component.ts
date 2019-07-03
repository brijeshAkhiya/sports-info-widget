import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from "@providers/sports-service";

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
  constructor(private sportsService: SportsService) { }

  ngOnInit() {
    if (localStorage.getItem('userT')) {
      this.getuserfavourites()
    }
  }

  //get user favourites
  getuserfavourites() {
    this.sportsService.getuserfavourite().subscribe((res: any) => {
      this.userfavourites = res
      this.userfavourites.data.map((data) => {
        if (data.id == this.value.id) {
          this.isadded = true
        }
      })
    })
  }

  addfav() {
    if (localStorage.getItem('userT')) {
      if (this.isadded) {
        this.isadded = false
        this.userfavourites.data.splice(this.userfavourites.data.findIndex(v => v.id === this.value.id), 1);
        this.sportsService.updatefavourites(this.userfavourites).subscribe((res: any) => {
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
    this.userfavourites.data.push(data);
    this.sportsService.updatefavourites(this.userfavourites).subscribe((res: any) => {
      if (res) {
        console.log(res);
      }
    })
  }

}
