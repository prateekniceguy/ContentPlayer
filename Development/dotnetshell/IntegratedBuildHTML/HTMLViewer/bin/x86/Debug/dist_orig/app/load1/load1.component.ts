import { Component , OnInit } from '@angular/core';

import 'jquery';
declare var $: any;


@Component({
    selector: 'my-load1',
    template: require('./load1.component.html'),
    styles: [require('./load1.component.css')]

})

export class Load1Component implements OnInit{

	ngOnInit() {
  $("#video").on("timeupdate", function () {
      var myVideo = $(this)[0];
      var value = (100 / myVideo.duration) * myVideo.currentTime;
      $("#seek-bar").val(value);
  });
    console.log("i m in load1 page.....")

  }

}
