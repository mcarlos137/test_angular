import { NgModule } from '@angular/core';
import { InitialComponent } from '../initial/initial.component';
import { InitialModule } from '../initial/initial.module';
import { HeaderModule } from '../orderBook/header/header.module';
import { AppComponent } from './app.component';
import { FooterModule } from '../orderBook/footer/footer.module';
import { OrderBookModule } from '../orderBook/orderBook.module';
import { PausedModule } from '../orderBook/paused/paused.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //InitialModule,
    BrowserModule,
    OrderBookModule,
  ],
  bootstrap: [
    //InitialComponent,
    AppComponent
  ]
})
export class AppModule { }
