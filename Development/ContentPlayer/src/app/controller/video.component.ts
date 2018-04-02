import {ApplicationmodelService} from '../model/applicationmodel.service';
import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';

declare var Slider: any;

@Component({
  selector: 'app-video',
  templateUrl: '../view/layout/video.component.html',
  styleUrls: ['../view/css/video.component.css', '../view/css/bootstrap.css',
    '../view/css/bootstrap-slider.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit {

  private appModel: ApplicationmodelService;

  private duration;
  protected currentTime = 0;
  protected progressBarValue = 0;
  protected sliderRef = null;

  protected isPlaying = false;

  @ViewChild('mainVideo') mainVideo;

  constructor(appModel: ApplicationmodelService) {
    this.appModel = appModel;
  }

  ngOnInit() {
    const thisref = this;
    /*this.sliderRef = new Slider('#seek-bar', { id: "slider5a",
     * formatter: updateTimeTT, min: 0, max: 100, value: 0, forwardValue: maxtime + 1, forwardEnabled: !p });
     */
    this.sliderRef = new Slider('#seek-bar', {
      id: 'slider5a', // latest
      min: 0, max: 100, value: this.progressBarValue, forwardValue: 50, forwardEnabled: false
    });

    this.sliderRef.on('slideStop', function(event) {
      thisref.currentTime = event / (100 / thisref.duration);

    });

    this.sliderRef.on('mouseup', function(event) {
      console.log('VideoComponent: mouseup=', this, event);
      // event.preventDefault();
      /*if (p) {
        var myVideo = $('#video')[0];
        var newTime = this.progressBarValue / (100 / myVideo.duration);
        myVideo.currentTime = newTime;
      } else {
        if ($('#seek-bar').val() <= maxtime) {
          var myVideo = $('#video')[0];
          var newTime = this.progressBarValue / (100 / myVideo.duration);
          myVideo.currentTime = newTime;
        } else {
          $('#seek-bar').val(this.seekbarPreviousVal);
        }
      }*/

    });

  }

  loadedHandler(event) {
    this.duration = event.currentTarget.duration;
  }

  updatePlay(event) {
    if (this.isPlaying) {
      this.mainVideo.nativeElement.pause();
    } else {
      this.mainVideo.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  get path(): string {
    console.log('VideoComponent: path=', this.appModel.content.id + '/' + this.appModel.content.contentData.data['path']);
    return this.appModel.content.id + '/' + this.appModel.content.contentData.data['path'];
  }

  get sourceType(): string {
    console.log('VideoComponent: sourceType=', this.appModel.content.contentData.data['type']);
    return this.appModel.content.contentData.data['type'];
  }

  updateHandler(event) {
    const duration = event.currentTarget.duration;
    const current = event.currentTarget.currentTime;
    const value = (100 / duration) * current;
    this.progressBarValue = value;
    console.log('VideoComponent: updateHandler value=', value, this.progressBarValue);
    /*this.sliderRef.setAttribute('value', value);
    this.sliderRef.refresh();*/
    this.sliderRef.setValue(value, false, false);
  }

  endedHandler(event) {
    console.log('VideoComponent: endedHandler');
    this.appModel.nextSection();
  }

}

