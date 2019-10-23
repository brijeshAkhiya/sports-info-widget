import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private translateservice: TranslateService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    const data: any = this.activatedRoute.data;
    this.params = data.value;
    let title = this.params.sport;
    let sport = this.params.sport;
    if (this.params.sport == 'Basketball')
      title = 'NBA';
    else if (this.params.sport == 'Hockey') {
      title = 'Field Hockey';
      sport = 'FieldHockey';
    } else if (this.params.sport == 'Racing') {
      let parentParams: any = this.activatedRoute.parent.params;
      title = parentParams.value.game;
    }
    this.options = {
      reqParams:
        { eSport: sport, aIds: [] },
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
