import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './modules/routing';
import { ContainerComponent } from './controller/container/container.component';
import { VideoComponent } from './controller/video/video.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
