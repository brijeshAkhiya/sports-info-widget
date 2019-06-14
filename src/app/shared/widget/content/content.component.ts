import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SportsService } from "@providers/sports-service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

  @Input() cmsKey;
  data;

  constructor(
    private sportsService: SportsService
  ) { }

  ngOnInit() {
    this.getCMSContent();
  }

  getCMSContent(){
    this.sportsService.getcmscontent(this.cmsKey).subscribe((res)=>{
      if(res){
        this.data = res;        
      }
    })
  }
}
