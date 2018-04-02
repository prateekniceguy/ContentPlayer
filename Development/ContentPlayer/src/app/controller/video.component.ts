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
  protected time = '00:00 / 00:00';

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

    const curmins = Math.floor(current / 60);
    const cursecs = Math.floor(current - curmins * 60);
    const durmins = Math.floor(duration / 60);
    const dursecs = Math.floor(duration - durmins * 60);
    const ttime = dursecs + (durmins * 60);
    const ctime = cursecs + (curmins * 60);
    const rtime = ttime - ctime;
    const remainingt = this.convertDigits(Math.floor(rtime / 60)) + ':' + this.convertDigits(rtime % 60);
    this.time = remainingt + ' / ' + this.convertDigits(durmins) + ':' + this.convertDigits(dursecs);

    // update slider
    this.sliderRef.setValue(value, false, false);
  }

  updateVolume(event) {
    console.log('VideoComponent: updateVolume - event=', event);
    this.mainVideo.nativeElement.volume = event.target.value;
  }

  endedHandler(event) {
    console.log('VideoComponent: endedHandler');
    this.appModel.nextSection();
  }

  convertDigits(value: number): string {
    if (value < 10) {
      return '0' + value;
    } else {
      return '' + value;
    }
  }

}

