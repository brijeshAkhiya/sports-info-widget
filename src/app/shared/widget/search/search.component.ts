import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, Input, ViewChild, Renderer2, ViewEncapsulation, OnChanges, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit, OnChanges {
  searchkey: string;
  searchdata: any;
  noresults: boolean;
  constructor(
    private el: ElementRef,
    private router: Router,
    private renderer2: Renderer2,
    private sportsService: SportsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  @ViewChild('searchBox') searchBox;
  @ViewChild('name') nameField: ElementRef;
  @Input() issearch;
  @Input() searchOpen;
  @Output()
  public clickOutside = new EventEmitter();


  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (isPlatformBrowser(this.platformId)) {
      const clickedInside = this.searchBox.nativeElement.contains(targetElement);
      if (targetElement != this.searchOpen && !clickedInside) {
        this.searchkey = '';
        this.searchdata = [];
        this.issearch = false;
        this.clickOutside.emit(false);
      }
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.issearch)
      this.nameField.nativeElement.focus();
  }


  blogList() {
    this.issearch = false;
    this.renderer2.removeClass(document.body, 'search-box-open');
    this.router.navigate(['search', this.searchkey], {
      state: { data: this.searchdata, sSearch: this.searchkey }
    });
    this.searchkey = '';
    this.searchdata = [];
  }
  prev;
  valuechange($e) {
    if (this.searchkey && this.searchkey.length > 2 && (this.searchkey != this.prev)) {
      this.search();
      this.prev = this.searchkey;
    } else if (this.searchkey == '')
      this.searchdata = [];
  }


  // search api call
  search() {
    if (this.searchkey.trim()) {
      let data = {
        sSearch: this.searchkey,
        nLimit: 5,
        nStart: 0
      };
      this.searchdata = [];
      // this.noresults = false;
      this.noresults = false;
      this.sportsService.getsearchresult(data).subscribe(res => {
        if (res['data'].length != 0) {
          this.searchdata = res['data'];
        } else {
          // this.noresults = true;
          this.noresults = true;
        }
      });
    }
  }

  //search close
  closesearch() {
    this.clickOutside.emit(false);
  }

}
