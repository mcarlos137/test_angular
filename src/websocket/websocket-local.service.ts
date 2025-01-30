import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { transformStringData } from '../orderBook/orderBook.utils';

@Injectable({
    providedIn: 'root'
})
export class WebSocketLocalService {

    private socket: WebSocket;

    constructor(private dataService: DataService) {
        this.socket = new WebSocket('ws://localhost:8082/data');
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
        const data = JSON.parse(event.data)
        console.log(data)
        if (!data['asks'] || !data['bids']) {
            return
        }
        var { bids, asks } = data;
        bids = transformStringData(bids, 2, 5)
        asks = transformStringData(asks, 2, 5)
        this.dataService.orderBook.update(() => ({ asks: asks, bids: bids }));
    }

    public subscribe(operation: string = 'orderBook', channel: string = 'binance.ETH-USDT'): void {
        this.socket.send(JSON.stringify({
            method: 'SUBSCRIBE',
            operation: operation,
            channel: channel
        }));
    }

    public unsubscribe(operation: string = 'orderBook', channel: string = 'binance.ETH-USDT'): void {
        this.socket.send(JSON.stringify({
            method: 'UNSUBSCRIBE',
            operation: operation,
            channel: channel
        }));
    }

}