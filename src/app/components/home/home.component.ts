import { Component, OnInit } from '@angular/core';
import { SlugifyPipe } from '../../pipes/slugpipe'; //import it from your path

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private slugifyPipe: SlugifyPipe) { }

  ngOnInit() {
    this.slugify('ipl 208')
  }

  slugify(input: string){
    var your_new_slug = this.slugifyPipe.transform(input);
    console.log(your_new_slug);
    
}


}
