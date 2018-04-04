import { Component , OnInit } from '@angular/core';
import {SharedService} from '../shared.service';

import 'jquery';
declare var $: any;
import '../../assets/js/bootstrap.js';
@Component({
    selector: 'my-comment',
    template: require('./comment.component.html'),
    providers: [SharedService],
    styles: [require('./comment.component.css')]


})

export class CommentComponent implements OnInit{

    constructor(private _sharedService: SharedService){}
    str: string;

    sendValues(): void {
    console.log(this.str)
    this._sharedService.insertData(this.str);
    console.log('Data sent',this._sharedService.dataArray);
    this.str="";
    }

	ngOnInit() {

    console.log("i m in comment page.....")
  }

}
