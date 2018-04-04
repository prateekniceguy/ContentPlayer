
import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PlayComponent} from './play/play.component';
import {AboutComponent} from './about/about.component';
import {LoadComponent} from './load/load.component';
import {Load1Component} from './load1/load1.component';
import {Load2Component} from './load2/load2.component';
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
import {TemplatefourComponent} from './templatefour/templatefour.component';
import {TemplatefiveComponent} from './templatefive/templatefive.component';
import {TemplatesixComponent} from './templatesix/templatesix.component';
import {TemplateelevenComponent} from './templateeleven/templateeleven.component';
import {Template11dupComponent} from './template11dup/template11dup.component';
import {TemplatetwoActComponent} from './templatetwoAct/templatetwoact.component';
import {TemplatetwoActdupComponent} from './templatetwoActdup/templatetwoactdup.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent ,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'play/:id', component: PlayComponent },
      { path: 'about/:id', component: AboutComponent },
      { path: 'load/:id', component: LoadComponent },
      { path: 'load1', component: Load1Component },
      { path: 'load2', component: Load2Component },
      { path: 'activity', component: ActivityComponent },
	  { path: 'activitydup', component: ActivitydupComponent },
	  { path: 'temptwo', component: TemplatetwoComponent },
	  { path: 'dupTemptwo', component: TemplatetwodupComponent },
	  { path: 'tempnine', component: TemplatenineComponent },
    { path: 'templateone', component: TemplateoneComponent },
    { path: 'templateonedup', component: TemplatedupComponent},
	  { path: 'dupTempnine', component: TemplateninedupComponent },
    { path: 'template3', component: TemplatethreeComponent},
    { path: 'template3dup', component: TemplatethreedupComponent},
    { path: 'template7', component: Template7Component},
    { path: 'template7dup', component: Template7dupComponent},
    { path: 'templateeight', component: TemplateeightComponent},
	{ path: 'templateeightdup', component: TemplateeightdupComponent},
	{ path: 'tempfour', component: TemplatefourComponent},
	{ path: 'tempfive', component: TemplatefiveComponent},
	{ path: 'tempeleven', component: TemplateelevenComponent},
	{ path: 'template11dup', component: Template11dupComponent},
	{ path: 'tempsix', component: TemplatesixComponent},
  { path: 'templatetwoAct', component: TemplatetwoActComponent},
  { path: 'templatetwoActdup', component: TemplatetwoActdupComponent},


  ]
  }
];
