import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    console.log(this.activatedroute)
    if(this.activatedroute.snapshot.routeConfig.path == 'privacy-policy'){
      this.cmsType = "Privacy Policies";
      this.title = "Privacy Policy"
    }else if(this.activatedroute.snapshot.routeConfig.path == 'terms-and-conditions'){
      this.cmsType = "T & C";
      this.title = "Terms & Conditions"
    }
  }

}
