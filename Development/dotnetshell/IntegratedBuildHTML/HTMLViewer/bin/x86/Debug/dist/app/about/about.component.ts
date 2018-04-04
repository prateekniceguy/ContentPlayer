import { Component , OnInit ,NgZone ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';
import 'jquery';
declare var $: any;


@Component({
    selector: 'my-about',
    template: require('./about.component.html'),
    styles: [require('./about.component.css')]

})

export class AboutComponent implements OnInit{
id: number;
e:any;
src:string;
constructor(private zone:NgZone,private router: Router,private route: ActivatedRoute,private _sharedService: SharedService) {


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

                ngOnInit() {

                var abj: any = this;
    var vid: any = document.getElementById("video");
	 vid.currentTime = abj._sharedService.newjson.files1[abj._sharedService.counter-0].startAt;
   console.log("startAt>>>>>",vid.currentTime);
   var p = this._sharedService.newjson.forwardEnabled;
   var maxtime =0;
  if(this._sharedService.navigatetoroute.type== 0) {

           // var vid: any = document.getElementById("video");

            vid.onended = function() {
            abj._sharedService.videofinished();

            };
  }


  this.src = this._sharedService.navigatetoroute.data[0].videourl;
  this._sharedService.playerEvents.startTime =new Date().getTime();
  this._sharedService.playerEvents.endTime=0;

  // record start time of lesson

  this.e = new Date();
  this._sharedService.Segment_Start_Time_Lesson=this.e.getTime();
// console.log('Data sent@@@@@@@lesson',this._sharedService.Segment_Start_Time_Lesson);

  // record end time of lesson

    this.router.events.subscribe((e) => {
      var previousroute =this._sharedService.service_variable_lesson;
    if(previousroute != "") {
      this._sharedService.Segment_End_Time_Lesson=new Date().getTime();
    }
        this._sharedService.service_variable_lesson = e.url;
    });

  // route for fetching parameters of route(if any)

    this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
           //  console.log(this.id)
        });


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
         //event.preventDefault();
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
          //Need to change it in typescript
          (function()
          {
              var body = document.body || document.querySelector('body');
              var xhr = new XMLHttpRequest();
              xhr.onload = function(response)
              {

                  var target = response.srcElement || response.currentTarget;
                //  var statusText = target.statusText.toLowerCase();
              //    if (statusText == "ok" || statusText == "")
              //    {
                      var div = document.createElement('div');
                      div.innerHTML = this.responseText;
                      div.style.display = 'none';
                      body.insertBefore(div, body.firstChild);
              //    }
              }
              xhr.open('get', 'assets/images/all.svg', true);
              xhr.send();
          })();
  }

}
