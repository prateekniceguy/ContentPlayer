import { Component , OnInit ,NgZone ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';

import 'jquery';
declare var $: any;


@Component({
    selector: 'my-load',
    template: require('./load.component.html'),
    styles: [require('./load.component.css')]

})

export class LoadComponent implements OnInit{
constructor(private zone:NgZone,private router: Router,
  private route: ActivatedRoute,private _sharedService: SharedService) {


                  //window expose function
                  if((window as any).angularComponentRef) {
                  (window as any).angularComponentRef= { cmsPlayerPlay:(value)  => this.cmsPlayerPlay(value)};

                  } else {
                                (window as any).angularComponentRef = {
                                                zone: this.zone,
                                                cmsPlayerPlay: (value) => this.cmsPlayerPlay(value),
                                                component: this
                                  };
                  }
                  //window expose function
   if((window as any).angularComponentRef) {
   (window as any).angularComponentRef= {cmsPlayerPause:(value)  => this.cmsPlayerPause(value)};

                  } else {
                                (window as any).angularComponentRef = {
                                                    zone: this.zone,
                                                                componentFn: (value) => this.cmsPlayerPause(value),
                                                                component: this
                                  };
                  }
                  //window expose function
   if((window as any).angularComponentRef) {
                                  (window as any).angularComponentRef={cmsPlayerClose:(value)  => this.cmsPlayerClose(value)};

                  } else {
                                (window as any).angularComponentRef = {
                                                    zone: this.zone,
                                                                componentFn: (value) => this.cmsPlayerClose(value),
                                                                component: this
                                  };
                  }

  }


  @ViewChild('videoPlayer') videoplayer: any;
cmsPlayerPlay(event) {
                                                  this.zone.run(() => {
                                                                this.videoplayer.nativeElement.play();
                                                                this._sharedService.playextra();


           });

                                }
cmsPlayerClose(event) {
                                                  this.zone.run(() => {
              this._sharedService.pauseclick1(this.videoplayer.nativeElement.currentTime);
           });

                                }
cmsPlayerPause(event) {
                  this.zone.run(() => {
                                  this.videoplayer.nativeElement.pause();

                                                                                                var e = new Date();
                                                                                                this._sharedService.pauseextra(e.getTime(),this.videoplayer.nativeElement.currentTime);


           });

                                }
src:string;
	ngOnInit() {
		var abj: any = this;
		var vid: any = document.getElementById("video");
  	 vid.currentTime = abj._sharedService.newjson.files1[abj._sharedService.counter-0].startAt;
     console.log("startAt>>>>>",vid.currentTime);
      var p = this._sharedService.preview_mode;
      var maxtime =0;
		  this.src = this._sharedService.navigatetoroute.data[0].videourl;
		   if(this._sharedService.navigatetoroute.type== 0) {

           // var vid: any = document.getElementById("video");
            //var abj: any = this;
            vid.onended = function() {
            abj._sharedService.videofinished();

            };
  }
        $("#video").on("timeupdate", function () {
            var myVideo = $(this)[0];
            var value = (100 / myVideo.duration) * myVideo.currentTime;
            var curmins = Math.floor(myVideo.currentTime / 60);
            var cursecs = Math.floor(myVideo.currentTime - curmins * 60);
            var durmins = Math.floor(myVideo.duration / 60);
            var dursecs = Math.floor(myVideo.duration - durmins * 60);

            //updating max duration video run
            maxtime = (value> maxtime) ? value : maxtime;


            abj._sharedService.timeUpdate1(value,curmins,cursecs,durmins,dursecs);
			$("progress").val(abj._sharedService.files[abj._sharedService.counter].startAt);
            $("#seek-bar").val(value);
			$("progress").val(value);
        $("#max-progress").val(maxtime);
			/*$("#tooltipn").animate( {left:"+=" + cursecs + "px"},600 );*/
		   var el, newPoint, newPlace, offset, width;

// Select all range inputs, watch for change
			$("#seek-bar").on('mouseover change', function() {

			 // Cache this for efficiency
			 el = $(this);

			 // Measure width of range input
			 width = el.width();

			 // Figure out placement percentage between left and right of input
			 newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));

			  offset = -2;

			 // Prevent bubble from going beyond left or right (unsupported browsers)
			 if (newPoint < 0) { newPlace = 0; }
			 else if (newPoint > 1) { newPlace = width; }
			 else { newPlace = width * newPoint + offset; offset -= newPoint; }
			  /*alert('NP:'+newPlace);*/

			 // Move bubble
			 $("output").css({left: newPlace, marginLeft: offset + "%"}).text(curmins +':'+ cursecs);
				 /*alert(offset);*/
			 })
			 // Fake a change to position bubble at page load
			 .trigger('change');

       $("#seek-bar").on("mousedown", function (event) {
         this.seekbarPreviousVal = $("#seek-bar").val();
       })

       //Seek bar drag to move the current playing video at the time.
       $("#seek-bar").on("mouseup", function (event) {
         event.preventDefault();
         if(p){
           var myVideo = $("#video")[0];
           var newTime = $("#seek-bar").val() / (100 / myVideo.duration);
           myVideo.currentTime = newTime;
    }else{
       if($("#seek-bar").val() <= maxtime ){
               var myVideo = $("#video")[0];
               var newTime = $("#seek-bar").val() / (100 / myVideo.duration);
               myVideo.currentTime = newTime;
    }else{
      $("#seek-bar").val(this.seekbarPreviousVal);
    }
    }

 });


        });

}
}
