import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InitialComponent } from './initial.component';
import { InitialRoutingModule } from './initial-routing.module';

@NgModule({
  declarations: [
    InitialComponent
  ],
  imports: [
    BrowserModule,
    InitialRoutingModule,
  ],
  bootstrap: [InitialComponent]
})
export class InitialModule { }
