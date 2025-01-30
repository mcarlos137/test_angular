import { NgModule } from '@angular/core';
import { BodyModule } from './body/body.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { PausedModule } from './paused/paused.module';
import { OrderBookComponent } from './orderBook.component';

@NgModule({
  declarations: [OrderBookComponent],
  imports: [PausedModule, HeaderModule, BodyModule, FooterModule],
  exports: [OrderBookComponent]
})
export class OrderBookModule { }
