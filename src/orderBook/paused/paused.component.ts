import { Component, effect, OnDestroy, OnInit, Signal } from '@angular/core';
import { DataService } from '../../data/data.service';
import { WebSocketLocalService } from '../../websocket/websocket-local.service';
import { WebSocketRemoteService } from '../../websocket/websocket-remote.service';
import { TRANSLATION } from '../orderBook.config';

@Component({
  selector: 'orderBook-paused',
  templateUrl: './paused.component.html',
  styleUrl: './paused.component.css',
  standalone: false,
})
export class PausedComponent implements OnInit, OnDestroy {

  TRANSLATION = TRANSLATION
  paused: Signal<boolean>

  pause = () => {
    this.dataService.paused.set(true)
    if (this.dataService.product().source === 'LOCAL') {
      this.webSocketLocalService.unsubscribe('orderBook', this.dataService.product().id)
    } else if (this.dataService.product().source === 'REMOTE') {
      this.webSocketRemoteService.unsubscribe('book_ui_1', this.dataService.product().id)
    }
  }

  unpause = () => {
    this.dataService.paused.set(false)
    if (this.dataService.product().source === 'LOCAL') {
      this.webSocketLocalService.subscribe('orderBook', this.dataService.product().id)
    } else if (this.dataService.product().source === 'REMOTE') {
      this.webSocketRemoteService.subscribe('book_ui_1', this.dataService.product().id)
    }
  }

  onBlur = () => {
    this.pause()
  }

  constructor(
    private webSocketLocalService: WebSocketLocalService,
    private webSocketRemoteService: WebSocketRemoteService,
    private dataService: DataService
  ) {
    this.paused = this.dataService.paused
    effect(() => {
      this.paused = this.dataService.paused
    })
  }

  ngOnInit(): void {
    window.addEventListener('blur', () => {
      this.pause()
    });
  }

  ngOnDestroy(): void {
    //window.removeEventListener('blur', this.onBlur);
  }

}