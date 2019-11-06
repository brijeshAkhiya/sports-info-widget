import { Component, OnInit, Input } from '@angular/core';

import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-probability',
  templateUrl: './probability.component.html',
  styleUrls: ['./probability.component.css']
})
export class ProbabilityComponent implements OnInit {

  @Input() options;

  constructor(
    public commonService: CommonService
  ) { }

  ngOnInit() {
  }

}
