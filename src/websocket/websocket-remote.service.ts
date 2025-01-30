import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { IOrderBook } from '../orderBook/orderBook.types';
import { reduceOrders } from '../orderBook/orderBook.utils';
import { REMOTE_FEED_SNAPSHOT, REMOTE_XBT_PRODUCT_ID, REMOTEL_FEED_DELTA } from '../orderBook/orderBook.config';

@Injectable({
    providedIn: 'root'
})
export class WebSocketRemoteService {

    private socket: WebSocket;

    constructor(private dataService: DataService) {
        this.socket = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
    }

    public connect(): Observable<any> {
        return new Observable(observer => {
            this.socket.onopen = () => observer.next('connected')
            this.socket.onmessage = (event) => observer.next(this.onMessage(event));
            this.socket.onerror = (event) => observer.error(event);
            this.socket.onclose = () => observer.complete();
        });
    }

    private onMessage = (event: any) => {
        const data = JSON.parse(event.data);
        const { bids, asks } = data;
        const { feed } = data
        if (feed === REMOTE_FEED_SNAPSHOT) {
            this.dataService.orderBook.update(() => <IOrderBook>{ bids, asks })
            //setOrderBook({ bids, asks });
        }
        if (feed === REMOTEL_FEED_DELTA) {
            if ((bids && bids.length) || (asks && asks.length)) {
                this.dataService.orderBook.update(({ asks: oldAsks, bids: oldBids }) => ({
                    asks: asks
                        .reduce(reduceOrders, oldAsks)
                        // sort ascending
                        .sort((a: [number], b: [number]) => a[0] - b[0]),
                    bids: bids
                        .reduce(reduceOrders, oldBids)
                        // sort descending
                        .sort((a: [number], b: [number]) => b[0] - a[0]),
                }));
            }
        }
    }

    public subscribe(feed: string = 'book_ui_1', productId: string = REMOTE_XBT_PRODUCT_ID): void {
        this.socket.send(JSON.stringify({
            event: 'subscribe',
            feed: feed,
            product_ids: [productId],
        }));
    }

    public unsubscribe(feed: string = 'book_ui_1', productId: string = REMOTE_XBT_PRODUCT_ID): void {
        this.socket.send(JSON.stringify({
            event: 'unsubscribe',
            feed: feed,
            product_ids: [productId],
        }));
    }

}