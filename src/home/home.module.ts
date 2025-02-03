import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterLink, RouterOutlet],
  exports: [HomeComponent]
})
export class HomeModule { }
