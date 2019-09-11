import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  params;
  options;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateservice: TranslateService
  ) { }

  ngOnInit() {
    const data: any = this.activatedRoute.data;
    this.params = data.value;
    this.options = {
      reqParams:
        { eSport: this.params.sport },
      title: this.translateservice.get(this.params.sport)['value'],
      type: 'sport'
    };
  }

}
