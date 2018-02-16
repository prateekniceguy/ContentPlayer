import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-video',
  templateUrl: '../view/layout/video.component.html',
  styleUrls: ['../view/css/video.component.css']
})
export class VideoComponent implements OnInit {

  someRange = 15;

  constructor() {
  }

  ngOnInit() {
  }

}
