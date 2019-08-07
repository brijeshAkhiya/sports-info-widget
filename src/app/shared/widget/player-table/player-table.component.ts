import { Component, OnInit, Input, ViewChildren, Directive, Output,EventEmitter, QueryList, ElementRef, Renderer } from '@angular/core';

import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';
import { KabaddiService } from '@app/modules/kabaddi/kabaddi.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})

@Directive({selector: 'th[shortable]'})

export class PlayerTableComponent implements OnInit {
  

  @Input() data: any[];
  @Input() options;
  @Input() sortable: string;
  values=[];
  private toggleSort: boolean = false;

  // @Input('sortKey') key: any;

  constructor(
    private commonService: CommonService,
    private cricketService: CricketService,
    private kabaddiService: KabaddiService,
    private el: ElementRef, private renderer: Renderer
  ) {
    
   }

  ngOnInit() {
    console.log(this.sortable)
    console.log(this.options)
    console.log(this.options.values)
    this.renderer.listen(this.el.nativeElement, 'click', (event) => {
      let parentNode = this.el.nativeElement.parentNode;
      let children   = parentNode.children;

      if(this.data)
      {
        //  let sortedData: any = this.sortArray();
      }  
      this.toggleSort = !this.toggleSort;
    })
  }
  name(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.name;
    var value = idAttr.nodeValue;
    console.log(value)
     this.values = this.options.values;
    // this.options.forEach(element => {
    //   this.values = element.values;
    // });
    console.log(this.values.includes(value))
  }

  // sortArray (): Array<any> {
  //   let tempArray: Array<any> = this.data;
  //   tempArray.sort((a, b) => {
  //     // let aKey = a[this.key];
  //       this.options.forEach(element => {
  //           this.values = element.values;
  //       });
      
  //       let str1: string = a[this.options.values].toLowerCase();
  //       let str2: string = b[this.options.values].toLowerCase();
  //       if (this.toggleSort) {
  //         if (str1 < str2) {
  //           return -1;
  //         }
  //         if (str1 > str2) {
  //           return 1;
  //         }
  //       }
  //       else {
  //         if (str1 > str2) {
  //           return -1;
  //         }
  //         if (str1 < str2) {
  //           return 1;
  //         }
  //       }
  //     return 0;
  //   });
  //   return tempArray;
  // }
  
}
