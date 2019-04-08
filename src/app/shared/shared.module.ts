import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
    imports:[
        CommonModule,
        RouterModule
    ],
    declarations: [MainHeaderComponent,MainFooterComponent
    ],
    exports:[MainHeaderComponent,MainFooterComponent]
  })
  export class SharedModule {}