import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './modules/routing';
import { ContainerComponent } from './controller/container.component';
import { VideoComponent } from './controller/video.component';
import { SignalrCustomModule } from './modules/signalr';


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignalrCustomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
