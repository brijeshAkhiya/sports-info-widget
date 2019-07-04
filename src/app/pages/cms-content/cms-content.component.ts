import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

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
    this.cmsType = this.activatedroute.snapshot.routeConfig.path;
    this.title = this.activatedroute.snapshot.routeConfig.path;
    // if(this.activatedroute.snapshot.routeConfig.path == 'privacy-policy'){
    //   this.cmsType = "Privacy Policies";
    //   this.title = "Privacy Policy"
    // }else if(this.activatedroute.snapshot.routeConfig.path == 'terms-and-conditions'){
    //   this.cmsType = "T & C";
    //   this.title = "Terms & Conditions"
    // }
  }

}
