import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private el: ElementRef,
    ) { }
  
  @ViewChild('searchBox') searchBox;
  @Input() issearch;
  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
      const clickedInside = this.searchBox.nativeElement.contains(targetElement);
      console.log(clickedInside)
      if (!clickedInside) {
          this.clickOutside.emit(null);
      }
  }
  
  ngOnInit() {
  }

}
