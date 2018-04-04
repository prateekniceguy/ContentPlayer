import { Component , OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import 'rxjs/Rx';
import {CommentComponent} from '../comment/comment.component';
@Component({
selector: 'my-list',
 template:
  `

  <button class="btn btn-xs btn-info play" [routerLink]="['/home/play',1]">Activity</button>
  <button class="btn btn-xs btn-success" [routerLink]="['/home/about',2]">Lesson</button>
  <button class="btn btn-xs btn-info activity" [routerLink]="['/home/activity']">MyActivity</button>
  <button class="btn btn-xs btn-danger" [routerLink]="['/home/load']">load</button>
  <button class="btn btn-xs btn-danger" [routerLink]="['/home/load1']">load1</button>
  <button class="btn btn-xs btn-danger" [routerLink]="['/home/load2']">load2</button>
  <button class="btn btn-xs btn-info" (click)="sendValues()">Next</button>

  <my-comment></my-comment>
  `,

  styles: [require('./list.component.css')],
  directives : [CommentComponent]
})

export class ListComponent {
constructor(private _sharedService: SharedService) {}
  sendValues(): void {
  this._sharedService.routesArrayFunc();
  }
  ngOnInit() {

  }
}
