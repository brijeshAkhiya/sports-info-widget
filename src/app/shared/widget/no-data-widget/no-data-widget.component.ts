import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-data-widget',
  templateUrl: './no-data-widget.component.html',
  styleUrls: ['./no-data-widget.component.css']
})
export class NoDataWidgetComponent implements OnInit {
  imagepath: { image: string; };
  @Input() message;
  @Input() sport;
  
  constructor() { }

  ngOnInit() {
    if(this.sport == 'kabaddi'){
      this.imagepath = { image : 'assets/images/match/kabaddi_no_data.svg' };
    }else{
      let array = [
        {image:'assets/images/no_data_1.svg'},
        {image:'assets/images/no_data_2.svg'},
      ]
      this.imagepath = array[Math.floor(Math.random() * array.length)];
    }
  }

}
