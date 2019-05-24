import { Component, OnInit } from '@angular/core';
import { SportsService } from "../../../providers/sports-service";
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  slides = [
    {id:'1'},
    {id:'2'},
    {id:'3'},
    {id:'4'},

  ]
  cmsdata;
  constructor(private sportsService: SportsService,) { }

  ngOnInit() {
    this.getCMSContent();
  }

  getCMSContent(){
    let sKey = 'About Us'
    this.sportsService.getcmscontent(sKey).subscribe((res)=>{
      if(res){
        this.cmsdata = res
        console.log(this.cmsdata);
        
      }
    })
  }

  customOptions: any = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    lazyLoad: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      612: {
        items: 2,
      }
    },
    nav: false
  }
}
