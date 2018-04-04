import { Component , OnInit } from '@angular/core';

import 'jquery';
declare var $: any;


@Component({
    selector: 'my-load2',
    template: require('./load2.component.html'),
    styles: [require('./load2.component.css')]

})

export class Load2Component implements OnInit{

	ngOnInit() {
  $("#video").on("timeupdate", function () {
      var myVideo = $(this)[0];
      var value = (100 / myVideo.duration) * myVideo.currentTime;
      $("#seek-bar").val(value);
  });
    console.log("i m in load2 page.....")

  }

}
