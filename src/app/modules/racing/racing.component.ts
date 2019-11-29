import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-racing',
  template: `
  <app-menu [options]="{ sport: 'Racing', type: 'home' }"></app-menu>
  <router-outlet></router-outlet>
  `
})
export class RacingComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.activatedRoute.children.length == 0)
      this.router.navigate(['/racing/f1']);
  }

}
