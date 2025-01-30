import { Component, effect, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { IOrderBook } from '../orderBook.types';
import { DataService } from '../../data/data.service';
import { WebSocketLocalService } from '../../websocket/websocket-local.service';
import { WebSocketRemoteService } from '../../websocket/websocket-remote.service';
import { PRODUCTS, TRANSLATION } from '../orderBook.config';

@Component({
  selector: 'orderBook-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false,
})
export class HeaderComponent implements OnInit, OnDestroy {

  PRODUCTS = PRODUCTS
  TRANSLATION = TRANSLATION
  product: Signal<{ code: string; id: string, source: string }>
  orderBook: Signal<IOrderBook> = signal({ bids: [], asks: [] })

  setOrderBook = (orderBook: IOrderBook) => {
    this.dataService.orderBook.update(() => orderBook)
  }

  constructor(
    private webSocketLocalService: WebSocketLocalService,
    private webSocketRemoteService: WebSocketRemoteService,
    private dataService: DataService
  ) {
    this.product = this.dataService.product
    this.orderBook = this.dataService.orderBook
    effect(() => {
      this.product = this.dataService.product
    })
    effect(() => {
      this.orderBook = this.dataService.orderBook
    })
  }

  ngOnInit(): void {
    console.log('INIT')
    this.webSocketLocalService.connect().pipe().subscribe(message => console.log(message))
    this.webSocketRemoteService.connect().pipe().subscribe(message => console.log(message))
    new Promise(r => setTimeout(r, 2000)).then(() => {
      if (this.product().source === 'LOCAL') {
        this.webSocketLocalService.subscribe()
      } else if (this.product().source === 'REMOTE') {
        this.webSocketRemoteService.subscribe()
      }
    })
  }

  ngOnDestroy(): void {
    console.log('DESTROY')
  }

}
