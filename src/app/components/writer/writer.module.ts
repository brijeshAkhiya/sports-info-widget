import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { WriterRoutingModule } from './writer-routing.module';
import { WriterComponent } from './writer.component';

@NgModule({
  imports: [
    CommonModule,
    WriterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [WriterComponent]
})
export class WriterModule { }
