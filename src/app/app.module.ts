import { NgModule } from '@angular/core';
import { InitialComponent } from '../initial/initial.component';
import { InitialModule } from '../initial/initial.module';
import { AppComponent } from './app.component';
import { OrderBookModule } from '../orderBook/orderBook.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //InitialModule,
    AppRoutingModule,
    BrowserModule,
    OrderBookModule,
  ],
  bootstrap: [
    //InitialComponent,
    AppComponent
  ]
})
export class AppModule { }
