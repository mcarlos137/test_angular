import { NgModule } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { RouterModule, Routes } from '@angular/router';
import { OrderBookComponent } from '../orderBook/orderBook.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    title: 'Home', 
    path: 'home', 
    component: HomeComponent,
  },
  {
    title: 'Order Book', 
    path: '', 
    //path: 'orderBook', 
    component: OrderBookComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
