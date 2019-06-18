import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  cmsdata;
  readers = [
    {
      'name':'Jigar Patel',
      'image':'assets/images/static/jigar-patel.jpg',
      'view':'Sports.info is a great example of sports should be served to a large audience. It makes browsing sports whole lot of fun. Any die hard sports fan will find it fascinating.',
    },
    {
      'name':'Aarav Gunani',
      'view':'I get all the updates of different sports instantly. It is a great sport information platform. I love it. As I am very fond of cricket it keeps me informed about the scores. Extremely amazing experience with sports.info'
    },
    {
      'name':'Vihaan Sharma',
      'view':'Sport has a great impact on our life. We like different sports and always want to be updated about scores. But due to busy office hours we cannot do it so but this is a way u can stay updated about your favourite sports.',
    },
    {
      'name':'Prachi Kumari',
      'view':'Sports.info has a versatile collection of various sports related articles and news that is highly relevant, updated and accurate. It is an easy to use and convenient platform that is categorized into relevant Sports Topics for the ease of reference.',
    },
    {
      'name':'Damyanti Basu',
      'view':'I would recommend all Sports Fan in India and around the world to follow sports.info to stay updated about the fascinating world of Sports. Some of their video contents help us to gather very interesting connections from the sporting perspective and revive Sport history.',
    },
    {
      'name':'Suhani Rao',
      'view':'Sports.info undoubtedly is the Numero Uno Sports platform in India and has taken the world of Sports Websites by storm. It surely deserves a lot of credits and appreciation for its wonderful coverage about the world of Sports',
    },
    {
      'name':'Reyansh Gupta',
      'view':'There are several websites about sports, but fewer are well designed and easy to use. Sports.info is one of them! I am a huge cricket fan, love to read articles, news, stats all over the time! I was searching for a light yet elegant website for a long time and I found this one!',
    },
  ];
  
  statistics = [
    {title:'Articles' , count: '4,200+' },
    {title:'Videos' , count: '1,400' },
    {title:'Viewers' , count: '45,000+' },
  ]
  
  constructor() { }

  ngOnInit() {
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
