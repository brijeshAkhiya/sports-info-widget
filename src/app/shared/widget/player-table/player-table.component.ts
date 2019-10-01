import { Component, OnInit, Input, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { CommonService } from '@providers/common-service';
import { ArrToStringPipe } from '@app/shared/pipes/arr-to-string.pipe';


@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerTableComponent implements OnInit {

  @Input() data: any[];
  @Input() options;
  private toggleSort = false;
  index: any;
  object: any;
  value: any;
  sort: any;
  sorting ='ASC';
  prevstate: any;

  constructor(
    private commonService: CommonService, public ArrToStringPipe:ArrToStringPipe
   ) { }

  ngOnInit() {
  }

  getname(event) {
    this.value = event.target.attributes.title.nodeValue;
    this.index = this.options.titles.findIndex(element => element == this.value);
    this.prevstate = this.object;
    this.object = this.options.values[this.index];
    if (this.options.sport === 'Kabaddi' && this.object == 'loss') {
      this.data = this.data.map(element => {
        this.sort = element.matchplayed - element.win - element.draw;
        const set = Object.assign({}, element);
        set.loss = this.sort;
        return set;
      });
    }
    this.sortArray();
  }

  sortArray() {
    if (this.prevstate === this.object) {
    } else {
      this.sorting = 'ASC';
    }
    if (this.object.includes('.')) {
      let filterPipe = new ArrToStringPipe();
      if (this.sorting == 'DESC') {
        this.data.sort((a, b) => filterPipe.transform(a, this.object) - filterPipe.transform(b, this.object));
        this.sorting = 'ASC';
      } else {
        this.data.sort((a, b) => filterPipe.transform(b, this.object) - filterPipe.transform(a, this.object));
        this.sorting = 'DESC';
      }
    } else {
      if (this.sorting == 'DESC') {
        this.data.sort((a, b) => a[this.object] - b[this.object]);
        this.sorting = 'ASC';
      } else {
        this.data.sort((a, b) => b[this.object] - a[this.object]);
        this.sorting = 'DESC';
      }
    }
    }

}
