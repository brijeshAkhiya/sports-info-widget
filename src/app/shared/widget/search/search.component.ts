import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, Input, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { SportsService } from "@providers/sports-service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchkey: string;  
  searchdata: any;
  @ViewChild('searchBox') searchBox;
  @Input() issearch;
  @Input() searchOpen;
  @Output()
  public clickOutside = new EventEmitter();

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
    private router: Router,
    private sportsService: SportsService,
    ) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {    
      const clickedInside = this.searchBox.nativeElement.contains(targetElement);
      if (targetElement != this.searchOpen && !clickedInside) {
          this.clickOutside.emit(false);
      }
  }
  
  ngOnInit() {
  }


  blogList(){
    this.issearch = false;
    this.renderer2.removeClass(document.body, "search-box-open");
    this.router.navigate(['search', this.searchkey],{ 
      state: { data:  this.searchdata, sSearch : this.searchkey} 
    });
    this.searchkey = '';
    this.searchdata = [];

  }

  //search api call
  search() {
    if (this.searchkey.trim()) {
      let data = {
        sSearch: this.searchkey,
        nLimit: 5,
        nStart: 0
      };
      this.searchdata = [];
      // this.noresults = false;
      this.sportsService.getsearchresult(data).subscribe(res => {
        if (res["data"].length != 0) {
          this.searchdata = res["data"];
        } else {
          // this.noresults = true;
        }
      });
    }
  }

  valuechange($e){
    if($e.keyCode != 8 && this.searchkey.length > 2){
      this.search();
    }
    else if(this.searchkey == '')
      this.searchdata = [];
  }

  //search close
  closesearch() {
    this.clickOutside.emit(false);
  }

}
