import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { CommonService } from '@providers/common-service';
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
    private translateservice: TranslateService,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    const data: any = this.activatedRoute.data;
    this.params = data.value;
    let title = this.params.sport;
    if (this.params.sport == 'Basketball')
      title = 'NBA';
    else if (this.params.sport == 'Hockey')
      title = 'Field Hockey';
    this.options = {
      reqParams:
        { eSport: this.params.sport, aIds: [] },
      title: this.translateservice.get(title)['value'],
      type: 'sport'
    };
    if (this.activatedRoute.snapshot.params.id) {
      this.options.tournamentid = this.commonService.getIds(this.activatedRoute.snapshot.params.id, 'cricket', 'tournament');
      this.options.reqParams.aIds.push(this.commonService.getIds(this.activatedRoute.snapshot.params.id, this.params.sport, 'tournament'));
      if (this.activatedRoute.snapshot.params.slug)
        this.options.title = this.activatedRoute.snapshot.params.slug.replace(/-/g, ' ');
    }
  }

}
