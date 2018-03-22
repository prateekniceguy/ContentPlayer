import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var Slider: any;

@Component({
  selector: 'app-video',
  templateUrl: '../view/layout/video.component.html',
  styleUrls: ['../view/css/video.component.css', '../view/css/bootstrap.css',
     '../view/css/bootstrap-slider.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit {

  someRange = 5;
  sliderRef = null;
  constructor() {
  }

  ngOnInit() {
    /*this.sliderRef = new Slider('#seek-bar', { id: "slider5a",
     * formatter: updateTimeTT, min: 0, max: 100, value: 0, forwardValue: maxtime + 1, forwardEnabled: !p });
     */
    /*this.sliderRef = new Slider('#seek-bar', { id: 'slider5a',// latest
      min: 0, max: 100, value: 0, forwardValue: 50, forwardEnabled: false });*/
  }

}
