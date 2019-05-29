import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
declare var document: any;
declare var window: any;

@Component({
  selector: 'app-live-match-tracker',
  templateUrl: './live-match-tracker.component.html',
  styleUrls: ['./live-match-tracker.component.css']
})

// interface Scripts {
//   name: string;
//   src: string;
// }
export class LiveMatchTrackerComponent implements AfterContentInit,OnInit{
  @Input() data: any
  matchid: any;

  private scripts: any = {};
  ScriptStore: any = [
    { name: 'widgetloader', src: 'https://widgets.sir.sportradar.com/046d029afbaa353404d1b7a898dc5f0b/widgetloader' }
  ];
  loader: boolean;
  constructor() { 
    this.ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  ngOnInit(): void {
    let Id = this.data['sport_event'].id
    if(Id){
        this.matchid = Id.split(':')[2]
    }
    this.loader = true
  }

  ngAfterContentInit() {
    
    this.load('widgetloader').then(data => {      
      console.log('script loaded ', data);      
          
      window.SIR("addWidget", ".sr-widget-1", "match.lmtPlus", {
        adsFrequency: false,
        theme:true,
        layout: "topdown",
        scoreboard: "extended",
        detailedScoreboard:"disable",
        matchId: this.matchid
    });
    this.loader = false  
    }).catch(error => console.log(error));
 
  }


  load(...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
      else {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.async = 1;
        script.n = "SIR";
        script.setAttribute("n", "SIR")
        // script.setAttribute("data-sr-match-id", "18000077")
        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  //Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

}
