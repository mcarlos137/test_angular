import { Component, effect, Signal } from '@angular/core';
import { DataService } from '../../data/data.service';
import { WebSocketLocalService } from '../../websocket/websocket-local.service';
import { WebSocketRemoteService } from '../../websocket/websocket-remote.service';
import { PRODUCTS, TRANSLATION } from '../orderBook.config';

@Component({
  selector: 'orderBook-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: false,
})
export class FooterComponent {

  TRANSLATION = TRANSLATION
  PRODUCTS = PRODUCTS
  product: Signal<{ code: string; id: string, source: string }>

  toggleFeed = () => {
    this.dataService.product.update(pro => {
      const index = PRODUCTS.findIndex(
        (p) => p.id === pro.id,
      );
      if (PRODUCTS[index].source === 'LOCAL') {
        this.webSocketLocalService.unsubscribe('orderBook', PRODUCTS[index].id)
      } else if (PRODUCTS[index].source === 'REMOTE') {
        this.webSocketRemoteService.unsubscribe('book_ui_1', PRODUCTS[index].id)
      }
      //this.dataService.orderBook.set({ bids: [], asks: [] })
      const newIndex = index + 1 === PRODUCTS.length ? 0 : index + 1
      if (PRODUCTS[newIndex].source === 'LOCAL') {
        this.webSocketLocalService.subscribe('orderBook', PRODUCTS[newIndex].id)
      } else if (PRODUCTS[newIndex].source === 'REMOTE') {
        this.webSocketRemoteService.subscribe('book_ui_1', PRODUCTS[newIndex].id)
      }
      return PRODUCTS[newIndex];
    })
  }

  constructor(
    private webSocketLocalService: WebSocketLocalService,
    private webSocketRemoteService: WebSocketRemoteService,
    private dataService: DataService
  ) {
    this.product = this.dataService.product
    effect(() => {
      this.product = this.dataService.product
    })
  }

}
