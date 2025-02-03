import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import AppServerModule from './main.server';

platformBrowserDynamic().bootstrapModule(AppServerModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
