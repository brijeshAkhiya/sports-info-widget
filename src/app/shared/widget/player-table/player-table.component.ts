import { Component, OnInit, Input, ViewChildren, Directive, Output,EventEmitter, QueryList, ElementRef, Renderer } from '@angular/core';

import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';
import { KabaddiService } from '@app/modules/kabaddi/kabaddi.service';
import { stringify } from '@angular/compiler/src/util';
import { filter, findIndex } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

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
    private kabaddiService: KabaddiService,
    private el: ElementRef, 
    private renderer: Renderer) {
  }

  ngOnInit() 
  {
      this.renderer.listen(this.el.nativeElement, 'click', (event) => {
      if(this.data && this.value)
      {
         let sortedData: any = this.sortArray();
      }  
      this.toggleSort = !this.toggleSort;
    })
  }
  
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
