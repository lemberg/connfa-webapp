import {enableProdMode} from '@angular/core';
import { AppModule } from './app/app.module';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";


if (process.env.ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, [

]);
