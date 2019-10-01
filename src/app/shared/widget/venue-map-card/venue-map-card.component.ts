import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-venue-map-card',
  templateUrl: './venue-map-card.component.html',
  styleUrls: ['./venue-map-card.component.css']
})
export class VenueMapCardComponent implements OnInit {
  @Input() venuedetails;
  @Input() sport;
  constructor() { }

  ngOnInit() { }

}
