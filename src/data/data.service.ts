import { Injectable, signal } from '@angular/core';
import { IOrderBook } from '../orderBook/orderBook.types';
import { PRODUCTS } from '../orderBook/orderBook.config';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public orderBook = signal<IOrderBook>({ bids: [], asks: [] })
    public product = signal(PRODUCTS[0])
    public paused = signal<boolean>(false)

    constructor() {}

}