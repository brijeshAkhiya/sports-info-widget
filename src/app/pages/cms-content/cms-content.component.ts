import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cms-content',
  templateUrl: './cms-content.component.html',
})
export class CmsContentComponent implements OnInit {

  cmsType;
  title;

  constructor(
    private activatedroute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.cmsType = this.activatedroute.snapshot.routeConfig.path;
    this.title = this.activatedroute.snapshot.routeConfig.path;
  }

}
