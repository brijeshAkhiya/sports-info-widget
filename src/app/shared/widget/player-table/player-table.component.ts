import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';
import { KabaddiService } from '@app/modules/kabaddi/kabaddi.service';


@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {
  
  @Input() data: any[];
  @Input() options;
  private toggleSort: boolean = false;
  alltitle: any;
  allvalue: any;
  index: any;
  object: any;
  value: any;

  constructor(
    private commonService: CommonService,
    private cricketService: CricketService,
    private kabaddiService: KabaddiService)
  {}

  ngOnInit() {}
  
  getname(event)
  {
    this.value = event.target.attributes.title.nodeValue;
    this.alltitle = this.options.titles;
    this.allvalue = this.options.values;
    this.alltitle.forEach(element => {
      if(element == this.value)
      {
        this.index = this.alltitle.findIndex(element=> element == this.value)
        this.object = this.allvalue[this.index];
        this.sortArray();
        this.toggleSort = !this.toggleSort;
      }
    }); 
  }
  
  sortArray () 
  {
    if(this.toggleSort)
    {
       this.data.sort((a, b) => b[this.object] - a[this.object] )
    }
    else
    {
      this.data.sort((a, b) => a[this.object] - b[this.object] )
    }
  }
  
}
