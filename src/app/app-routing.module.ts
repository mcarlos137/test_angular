import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderBookComponent } from '../orderBook/orderBook.component';

const routes: Routes = [
  {title: 'Order Book', path: '', component: OrderBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
