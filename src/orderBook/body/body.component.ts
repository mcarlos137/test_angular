import { Component, computed, effect, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { IOrder, IOrderBook, IOrderWithTotal } from '../orderBook.types';
import { DataService } from '../../data/data.service';
import { calculateHighestTotal, calculateRowDepth, calculateSpread, calculateSpreadPercent, calculateTotals, getTopOrder } from '../orderBook.utils';
import { TRANSLATION } from '../orderBook.config';

@Component({
  selector: 'orderBook-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  standalone: false,
})
export class BodyComponent {

  TRANSLATION = TRANSLATION
  orderBook: Signal<IOrderBook> = signal({ bids: [], asks: [] })

  setOrderBook = (orderBook: IOrderBook) => {
    this.dataService.orderBook.update(() => orderBook)
  }

  round = (number: number) => Math.round((number + Number.EPSILON) * 100) / 100;
  validateOrders = (bids: IOrder[], asks: IOrder[]) => bids && bids.length && asks && asks.length;
  calculateStop = (total: number, highestTotal: number) => (100 - calculateRowDepth(total, highestTotal))

  bids: Signal<IOrderWithTotal[]> = computed(() => calculateTotals(this.orderBook().bids.slice(0, 25)))
  asks: Signal<IOrderWithTotal[]> = computed(() => calculateTotals(this.orderBook().asks.slice(0, 25)))
  highestTotal: Signal<number> = computed(() => calculateHighestTotal([...this.bids(), ...this.bids()]))

  topAsk: Signal<number> = computed(() => getTopOrder(this.orderBook().asks))
  topBid: Signal<number> = computed(() => getTopOrder(this.orderBook().bids))
  spread: Signal<number> = computed(() => calculateSpread(this.topAsk(), this.topBid()))
  spreadPercentage: Signal<number> = computed(() => calculateSpreadPercent(this.spread(), this.topAsk()))

  constructor(private dataService: DataService) {
    this.orderBook = this.dataService.orderBook
    effect(() => {
      this.orderBook = this.dataService.orderBook
    })
  }

}
