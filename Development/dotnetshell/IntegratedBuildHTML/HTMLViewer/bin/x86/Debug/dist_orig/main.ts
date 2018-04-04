import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import {enableProdMode} from '@angular/core';
import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';
import {SharedService} from './app/shared.service';
import { AppModule } from './app/app.module';

enableProdMode();


browserDynamicPlatform().bootstrapModule(AppModule);
