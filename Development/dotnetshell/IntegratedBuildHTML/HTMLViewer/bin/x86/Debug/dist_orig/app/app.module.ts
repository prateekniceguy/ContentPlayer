
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {ModalModule} from 'ng2-modal';
import { routes } from './app.routing';
import {SharedService} from './shared.service';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './list/list.component';
import {PlayComponent} from './play/play.component';
import {AboutComponent} from './about/about.component';
import {LoadComponent} from './load/load.component';
import {Load1Component} from './load1/load1.component';
import {Load2Component} from './load2/load2.component';
import {CommentComponent} from './comment/comment.component';
import {ActivityComponent} from './activity/activity.component';
import {ActivitydupComponent} from './activitydup/activitydup.component';
import {TemplatetwoComponent} from './templatetwo/templatetwo.component';
import {TemplatetwodupComponent} from './templatetwodup/templatetwodup.component';
import {TemplatenineComponent} from './templatenine/templatenine.component';
import {TemplateninedupComponent} from './templateninedup/templateninedup.component';
import {TemplateoneComponent} from './templateone/templateone.component';
import {TemplatedupComponent} from './templateonedup/templateonedup.component';
import {TemplatethreeComponent} from './template3/template3.component';
import {TemplatethreedupComponent} from './template3dup/template3dup.component';
import {Template7Component} from './template7/template7.component';
import {Template7dupComponent} from './template7dup/template7dup.component';
import {TemplateeightComponent} from './templateeight/templateeight.component';
import {TemplateeightdupComponent} from './templateeightdup/templateeightdup.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	ModalModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
  AppComponent,
  HomeComponent,
  ListComponent,
  PlayComponent,
  AboutComponent,
  LoadComponent,
  Load1Component,
  Load2Component,
  ActivityComponent,
  ActivitydupComponent,
  TemplatetwoComponent,
  TemplatetwodupComponent,
  TemplatenineComponent,
  TemplateninedupComponent,
  TemplateoneComponent,
  TemplatedupComponent,
  TemplatethreeComponent,
  TemplatethreedupComponent,
  Template7Component,
  Template7dupComponent,
  TemplateeightComponent,
  TemplateeightdupComponent,
  CommentComponent

  ],
  providers: [SharedService],
  bootstrap: [AppComponent ]
})
export class AppModule {
}
