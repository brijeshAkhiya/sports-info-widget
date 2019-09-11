import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { CommonService } from '@providers/common-service';


@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  @Input() data: any[];
  @Input() options;
  private toggleSort = false;
  index: any;
  object: any;
  value: any;
  sort: any;

  constructor(
    private commonService: CommonService) { }

  ngOnInit() {
    console.log(this.data);

  }

  getname(event) {

    console.log(this.data);
    this.value = event.target.attributes.title.nodeValue;
    this.index = this.options.titles.findIndex(element => element == this.value);
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
    this.toggleSort = !this.toggleSort;

  }

  sortArray() {
    if (this.toggleSort) {
      this.data.sort((a, b) => b[this.object] - a[this.object]);
    } else {
      this.data.sort((a, b) => a[this.object] - b[this.object]);
    }
  }

}
