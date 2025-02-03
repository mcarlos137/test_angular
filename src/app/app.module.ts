import { NgModule } from '@angular/core';
import { InitialComponent } from '../initial/initial.component';
import { InitialModule } from '../initial/initial.module';
import { AppComponent } from './app.component';
import { OrderBookModule } from '../orderBook/orderBook.module';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //InitialModule,
    AppRoutingModule,
    BrowserModule,
    HomeModule,
    OrderBookModule,
  ],
  bootstrap: [
    //InitialComponent,
    AppComponent
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ]
})
export class AppModule { }
