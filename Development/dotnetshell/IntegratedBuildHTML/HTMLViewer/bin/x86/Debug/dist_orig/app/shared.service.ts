
import {Injectable,Directive} from '@angular/core';
import { Router } from '@angular/router';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Directive({
    selector: '[AppComponent]'
})
@Injectable()
export class SharedService {
  constructor(private router: Router,private _http: Http) {
  console.log("contt value>>>>",this.contt);
}
  service_variable: any = "";  //used in play component for setting e.url
  service_variable_lesson: any = "";  //used in about component for setting e.url
  dataArray: any = []; //feedback array
  play: any = []; //play time array
  pause: any = []; // pause time array
  final_difference: any = []; //pause-play difference array
  tera_triple_array: any = [this.play,this.pause,this.final_difference];
  routesArray: any = []; //routing array
  tempobject: any= {};
  tempobject1 : any= {};
  contt = 1;
  Activity_Score: any; //done
  navShow=0;
  playPending = false;
  disableClick=0;
  insertData(data) {
  this.dataArray.push(data);
  }
		playclick() {
		var pstring1 = {"sessionId" : this.newjson.sessionId, "segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "play"}};
		var pstring =  JSON.stringify(pstring1);
		console.log("play button pressed" + pstring);
		}
		pauseclick(time,pos) {
		var pausestring1 ={"sessionId" : this.newjson.sessionId,"segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "pause","time": time, "currentPosition":pos}};
		var pausestring =JSON.stringify(pausestring1);
		console.log("pause button pressed" + pausestring);
		}
		playextra() {
		var pstring1 = {"sessionId" : this.newjson.sessionId, "segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "play"}};
		var pstring =  JSON.stringify(pstring1);
		console.log("play button pressed" + pstring);
		}
		pauseextra(time,pos) {
		var pausestring1 ={"sessionId" : this.newjson.sessionId,"segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "pause","time": time, "currentPosition":pos}};
		var pausestring =JSON.stringify(pausestring1);
		console.log("pause button pressed" + pausestring);
		}
		pauseclick1(pos) {
		var pstring1_1 ={"sessionId" : this.newjson.sessionId,"segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "exit","currentPosition":pos}};
		var pausestring1_1 =JSON.stringify(pstring1_1);
		console.log("close button pressed" + pausestring1_1);
		}
		extrafunc1(){
			this.only_once=0;
			//var sconsole1 = {
			//"sessionId" : this.newjson.sessionId,
			//"segmentId" :  this.newjson.files1[this.counter].segmentId,
			//"event" :
			//{
			//"action": "change","currentactive": this.newjson.files1[this.counter].segmentId
			//}
			//};
			//var showconsole1 = JSON.stringify(sconsole1);
			//console.log("showconsole 1 extra func in service",showconsole1);

			if(this.navShow==1) {
				if(this.newjson.files1[this.counter].startAt==0){
					this.Activity_Score = 0;
					var sconsole1_2={
					"sessionId" : this.newjson.sessionId,
					"segmentId" :  this.newjson.files1[this.counter].segmentId,
					"event" :
					{"action": "segmentBegins"}
					};
					var showconsole1_2 = JSON.stringify(sconsole1_2);
					console.log("showconsole 1_2 extra func in service",showconsole1_2);
				}
				else{
					var pstring10 = {"sessionId" : this.newjson.sessionId, "segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "play"}};
					var pstring0 =  JSON.stringify(pstring10);
					console.log("play button pressed" + pstring0);
				}
			} else {
				this.Activity_Score = 0;
				var sconsole1_2={
				"sessionId" : this.newjson.sessionId,
				"segmentId" :  this.newjson.files1[this.counter].segmentId,
				"event" :
				{"action": "segmentBegins"}
				};
				var showconsole1_2 = JSON.stringify(sconsole1_2);
				console.log("showconsole 1_2 extra func in service",showconsole1_2);
			}

		}
		extrafunc2(){
		var sconsole2={
		"sessionId" : this.newjson.sessionId,
		"segmentId" :  this.newjson.files1[this.counter].segmentId,
		"event" :
		{"action": "complete" }
		};
		var showconsole2 = JSON.stringify(sconsole2);
		//console.log("showconsole 2 extra func in service",showconsole2);
		var sconsole2_1={
		"sessionId" : this.newjson.sessionId,
		"segmentId" :  this.newjson.files1[this.counter].segmentId,
		"event" :
		{"action": "segmentEnds","score": this.Activity_Score }
		};
		var showconsole2_1 = JSON.stringify(sconsole2_1);
		console.log("showconsole 2_1 extra func in service",showconsole2_1);

		}
		extrafunc3(){
		var sconsole3={
		"sessionId" : this.newjson.sessionId,
		"segmentId" :  this.newjson.files1[this.counter].segmentId,
		"event" :
		{"action": "complete" }
		};
		var showconsole3=JSON.stringify(sconsole3);
		//alert("segment lesson complete "+ showconsole3);
		//console.log("showconsole 3 extra func in service",showconsole3);

		var sconsole3_1={
		"sessionId" : this.newjson.sessionId,
		"segmentId" :  this.newjson.files1[this.counter].segmentId,
		"event" :
		{"action": "segmentEnds" }
		};
		var showconsole3_1 = JSON.stringify(sconsole3_1);
		console.log("showconsole 3_1 extra func in service",showconsole3_1);

		}


		doAutoplayIfNeed() {
			if(this.playPending) {
				if(this.navShow==1) {
					this.videofinished();
				} else {
					this.activityfinished();
				}
			}
		}

  playTime(data) {
    this.play.push(data);

  }
  pauseTime(data) {
    this.pause.push(data);

  }
  final_difference_time(data) {
    this.final_difference.push(data);

  }
  scoreData(data) {
    this.Activity_Score=data;
  }

  insertRoute(data) {
    this.routesArray.push(data);
  }



  files:any = [
   {
	  "startAt": 6,
    "segmentId": 140,
    "file": "http://localhost:8080/content9/"
  },
  {
	  "startAt": 6,
    "segmentId": 180,
    "file": "http://localhost:8080/content8/"
  },
  {
	  "startAt": 6,
    "segmentId": 188,
    "file": "http://localhost:8080/content08/"
  },
  {
    "startAt": 19,
    "segmentId": 130,
    "file": "http://localhost:8080/content01/"
  },
  {
  "startAt": 25,
  "segmentId": 132,
  "file": "http://localhost:8080/content01_dup/"
  },
  {
	  "startAt": 7,
    "segmentId": 141,
    "file": "http://localhost:8080/content09/"
  },
 {
	  "startAt": 10,
    "segmentId": 120,
    "file": "http://localhost:8080/content0/"
  },
  {
	  "startAt": 10,
    "segmentId": 128,
    "file": "http://localhost:8080/content00/"
  },
  {
	  "startAt": 20,
    "segmentId": 123,
    "file": "http://localhost:8080/content1/"
  },

  {
	  "startAt": 15,
    "segmentId": 124,
    "file": "http://localhost:8080/content2/"
  },
  {
	  "startAt": 13,
    "segmentId": 125,
    "file": "http://localhost:8080/content3/"
  },
  {
    "startAt": 2,
    "segmentId": 134,
    "file": "http://localhost:8080/content03/"
  },
  {
      "startAt": 9,
      "segmentId": 138,
      "file": "http://localhost:8080/content03_dup/"
  },

  {
	  "startAt": 19,
    "segmentId": 126,
    "file": "http://localhost:8080/content4/"
  },
  {
    "startAt": 19,
    "segmentId": 146,
    "file": "http://localhost:8080/content9/"
  },
  {
    "startAt": 20,
    "segmentId": 135,
    "file": "http://localhost:8080/content7/"
  },
  {
    "startAt": 20,
    "segmentId": 150,
    "file": "http://localhost:8080/content7_dup/"
  },
{
    "startAt": 19,
    "segmentId": 147,
    "file": "http://localhost:8080/content09/"
}


  ];

  newjson:any = {
		"sessionId": "jkdfjddfk43243kjfkj",
		"homePath": "home",
		"files1": this.files,
		"playerPreview" : false,
		"forwardEnabled":false
	}
  preview_mode = true;
  data;
  counter=0;
  isLastActivity = false;
  structure_load() {

    //disable next on last activity last question//
    if(this.counter === this.newjson.files1.length-1) this.isLastActivity = true;

    this._http.get(this.newjson.files1[this.counter].file+'structure.json')
    .map(resp => resp.json())
    .subscribe(
    resp => {

		this.segmentChanged();
    /*this.counter++;

    if( this.counter < this.newjson.files1.length){
    //console.log("length>>>>>>>>",this.files.length);
		console.log("check me counter>>>>>>>>",this.counter,this.newjson.files1.length);
    }
    else{
    this.counter=0;
    }*/

    console.dir("ye wala>>>>>>>>>>>>>>",resp.structure);
    this.data = resp.structure;
    this.preview_mode=this.newjson.playerPreview;

	  //console.log("this.preview_mode:",this.preview_mode);
    this.navigateRoute(this.data);
	this.extrafunc1();//$
    },
    err => console.log(err));

  //play next from eventr array
}
  s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);
  }
 guid() {
 return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
 this.s4() + '-' + this.s4() + this.s4() + this.s4();
}


updateCounter() {
	console.log(this.counter+"=counter update"+this.newjson.files1.length+"files length");
  if(this.doAutoplay() == 1 && this.counter < this.newjson.files1.length+1) {
	this.counter++;

    //if( this.counter < this.newjson.files1.length){
    //console.log("length>>>>>>>>",this.files.length);
		console.log("check me counter>>>>>>>>",this.counter,this.newjson.files1.length);
    //}
   // else{
		//this.counter=0;
    //}
  }
  else{
	  if(this.doAutoplay() == 1) {
		  this.counter = this.newjson.files1.length-1;
	  } else {
		  this.playPending = true;
	  }
	  console.log("do nothing");
  }
}

templateRouterArray:any = [

	['/home/about/', '/home/load/', 0],
	['/home/activity', '/home/activitydup', 0],
	['/home/temptwo', '/home/dupTemptwo', 0],
    ['/home/tempnine', '/home/dupTempnine', 0],
    ['/home/templateone', '/home/templateonedup', 0],
    ['/home/template3', '/home/template3dup', 0],
    ['/home/template7', '/home/template7dup', 0],
	['/home/templateeight', '/home/templateeightdup', 0]





];

/////config to set next button enable for development/////
devEnvironment:any ={
      disableNextButton: false
        }
//////////////////////////////////////////////////////////

tracker = 0;
updateBA(inda) {
	if(this.templateRouterArray[inda][2] == 0) {
			this.templateRouterArray[inda][2] = 1;
		} else if(this.templateRouterArray[inda][2] == 1) {
			this.templateRouterArray[inda][2] = 0;
		}

}

  navigatetoroute : any;
  navigateRoute(datar) {
  //console.log("this is the navigator function input>>>>>>",datar.type);

  switch(datar.type) {

    case "0":
      this.navigatetoroute = datar;
	  this.navShow=1;
		console.log("route route ="+this.templateRouterArray[0][this.templateRouterArray[0][2]]+   "    "+this.templateRouterArray[0][this.templateRouterArray[2]]);
		this.router.navigate([ this.templateRouterArray[0][this.templateRouterArray[0][2]] + this.guid()]);

		this.updateBA(0);
		console.log("route route r = "+this.templateRouterArray[0][this.templateRouterArray[0][2]]);
    break;

    case "1":
      this.navigatetoroute = datar;
	  this.navShow=0;
	
      //this.router.navigate(['/home/activity']);
			this.router.navigate([ this.templateRouterArray[1][this.templateRouterArray[1][2]]]);
		  this.updateBA(1);
    	break;

	case "2":
      this.navigatetoroute = datar;
	  this.navShow=0;

      //this.router.navigate(['/home/temptwo']);
	    this.router.navigate([ this.templateRouterArray[2][this.templateRouterArray[2][2]]]);
	    this.updateBA(2);
      break;

    case "3":
      this.navigatetoroute = datar;
	  this.navShow=0;

      //this.router.navigate(['/home/temptwo']);
      this.router.navigate([ this.templateRouterArray[3][this.templateRouterArray[3][2]]]);
      this.updateBA(3);
      break;

    case "4":
      this.navigatetoroute = datar;
	  this.navShow=0;
      //this.router.navigate(['/home/templateone']);
      //console.log("switch template", [ this.templateRouterArray[4][this.templateRouterArray[4][2]]]);
      this.router.navigate([ this.templateRouterArray[4][this.templateRouterArray[4][2]]]);
      this.updateBA(4);
      break;

      case "5":
      this.navigatetoroute = datar;
	  this.navShow=0;
      //this.router.navigate(['/home/template3']);
      //console.log("switch template", [ this.templateRouterArray[5][this.templateRouterArray[5][2]]]);
      this.router.navigate([ this.templateRouterArray[5][this.templateRouterArray[5][2]]]);
      this.updateBA(5);
      break;

      case "6":
      this.navigatetoroute = datar;
	    this.navShow=0;
      //this.router.navigate(['/home/template7']);
      console.log("switch template", [ this.templateRouterArray[6][this.templateRouterArray[6][2]]]);
      this.router.navigate([ this.templateRouterArray[6][this.templateRouterArray[6][2]]]);
      this.updateBA(6);
      break;

      case "7":
      this.navigatetoroute = datar;
	    this.navShow=0;
      //this.router.navigate(['/home/template7']);

      this.router.navigate([ this.templateRouterArray[7][this.templateRouterArray[7][2]]]);
      this.updateBA(7);
      break;

  }

}
  autoplay_var=1;
  only_once=0;
  doAutoplay() {
  return this.autoplay_var;
  }

  videofinished() {// complete event
this.disableClick=0;
//  if(this.newjson.playerPreview== true){
//	  this.autoplay_var=0;
//  }
//  else{}
  if(this.only_once==0){
		this.extrafunc3();
		this.only_once=1;
	}

  this.updateCounter();
  this.checkAutoplay();

  }

  activityfinished() {
 this.disableClick=0;
//if(this.newjson.playerPreview== true){
//	  this.autoplay_var=0;
// }
//  else{}
	if(this.only_once==0){
		this.extrafunc2();
		this.only_once=1;
	}
  this.updateCounter();
  this.checkAutoplay();

  }

  segmentChanged() {
	console.log("segment changed to "+this.counter+ " ,previous video duration="+this.durmins+":"+this.dursecs);
	//$this.extrafunc1();
}

	checkAutoplay() {
	  console.log(this.counter+"=counter "+this.newjson.files1.length+"files length");
	  if(this.doAutoplay() == 1 && this.counter < this.newjson.files1.length ) {
		//console.log("this is the ccheckauto");
	  this.structure_load();// play next from eventr array
}
  else{
	  if(this.doAutoplay() == 1) {
		  this.counter = this.newjson.files1.length-1;
	  } else {
		  this.playPending = true;
	  }
  console.log("i wont autoplay");
  this.disableClick=1;
}
  }

  value_time: any = "";
  curmins: any = "";
  cursecs: any = "";
  durmins: any = "";
  dursecs: any = "";

  timeUpdate1(value_time1,curmins1,cursecs1,durmins1,dursecs1){
  this.value_time=value_time1;
  this.curmins=curmins1;
  this.cursecs=cursecs1;
  this.durmins=durmins1;
  this.dursecs=dursecs1;
  }

  routesArrayFunc() {
  if(this.contt==this.routesArray.length){
  this.contt=0;
  console.log("contt value>>>>",this.contt);
  this.playerEvents.endTime = new Date().getTime();
  console.log("api object from service.....",this.playerEvents)
}
  console.log("contt value>>>>",this.contt,this.routesArray[this.contt], this.routesArray.length);
  this.router.navigate([this.routesArray[this.contt]]);
  this.contt++;
  //console.log("contt value>>>>",this.contt);

}

   Segment_End_Time_Activity: any; //done
   Segment_Start_Time_Activity: any; //done

   Segment_End_Time_Lesson: any;//done
   Segment_Start_Time_Lesson: any;//done


   playerEvents : any = {
   "sessionId" : "avcdefghixslakd9w32p339",
   "initiatedBy": "player" , // can take 2 values container or player
   "activities": []
   }

    playerEventChange() {

   	this.tempobject.sequenceId= this.contt; // array element +1
   	this.tempobject.segmentId= 232; //?
   	this.tempobject1.sequenceId= this.contt; // array element +1
   	this.tempobject1.segmentId= 232; //?
   	if(this.tera_triple_array.length > 0 && this.tera_triple_array[0].length > 0) {
   	for(var o = 0; o < this.tera_triple_array[0].length; o++) {
   	var play_time = this.tera_triple_array[0][o];
   	var pause_time = this.tera_triple_array[1][o];
   	this.tempobject.action = "play";  // play, pause, stop, ...
   	this.tempobject.startTime = play_time;
   	this.tempobject.endTime = pause_time;
   	this.playerEvents.activities.push(this.tempobject);
    //console.log("show the result...////????",this.playerEvents)
   	var duration_time = this.tera_triple_array[2][o];
   	this.tempobject1.duration = duration_time;
   	this.tempobject1.action = "pause";  // play, pause, stop, ...
   	this.tempobject1.startTime = pause_time;
   	if(o+1 < this.tera_triple_array[0].length) {
   			this.tempobject1.endTime =this.tera_triple_array[0][o+1];
   	}
    else {
   		this.tempobject1.endTime = -1
   	}
   	this.playerEvents.activities.push(this.tempobject1);
    //console.log("show the result...??????",this.playerEvents)
   		}

   	}

   }

    ////////Analytics/////////

	attempts:any =[];

	first_option_selected : number =0;
	first_option_selected_data : string ="none";
	attempt_counter = 0;
	correct_option_attempt_counter =0;
	speaker_counter = 0;
	correct_index :number;
	objectClick: any = {};
	optionclickhandler(current_option_selected_index,current_option_selected_data,questionId){

	this.objectClick.option_index = current_option_selected_index; // selected option index/position(0th 1st 2nd)
	this.objectClick.option_data = current_option_selected_data;   // selected option text/image path
	this.attempts.push(this.objectClick);
	//console.log("attempts array>>>>",this.attempts);
	//data prep
	var option_clicked1 ={"sessionId" : this.newjson.sessionId,"segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "option_clicked","questionId":questionId,"index": this.objectClick.option_index, "data":this.objectClick.option_data}};
	var option_clicked =JSON.stringify(option_clicked1);
	console.log("option_clicked>>>>>" + option_clicked);
	//if jo abhi abhi select hua hai wo first selected hai to
	if(this.objectClick.option_index == this.first_option_selected){
	var first_option_clicked1={"sessionId" : this.newjson.sessionId,"segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "first_option_clicked","questionId":questionId,"index": this.first_option_selected, "data":this.first_option_selected_data}};
	var first_option_clicked =JSON.stringify(first_option_clicked1);
	console.log("first_option_clicked>>>>>" + first_option_clicked);
}
	else{}
  //jo abhi abhi select hua hai wo correct hai to
	if(this.correct_index==this.objectClick.option_index){
	var correct_option_clicked1={"sessionId" : this.newjson.sessionId,"segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "correct_option_clicked","questionId":questionId,"index": this.objectClick.option_index, "data":this.objectClick.option_data,"attempt":this.correct_option_attempt_counter}};
	var correct_option_clicked =JSON.stringify(correct_option_clicked1);
	console.log("correct_option_clicked>>>>>" + correct_option_clicked);
	this.correct_index=0;
}
  else{}
}
	speakerbutton() { // on click of speaker button
	var speaker_clicked1={"sessionId" : this.newjson.sessionId,"segmentId" : this.newjson.files1[this.counter].segmentId, "event" :{"action" : "speaker_clicked","times": this.speaker_counter}};
	var speaker_clicked =JSON.stringify(speaker_clicked1);
	console.log("speaker_clicked>>>>>" + speaker_clicked);
}

////////Analytics////////

     Feedback_Type: any;
     Feedback_Status: any;
     No_of_times_particular_segment_replayed: any;
     Segment_Type_End_Time: any; // in playerEvents object
     Segment_Type_Start_Time: any; // in playerEvents object
     Segment_Name_Pause_Button: any;
     Nugget_End_Time: any;
     Nugget_Start_Time: any;
     Segment_Name: any;
     Segment_Type_Name: any;
     Nugget_Title: any;
     Chapter_Name: any;
}
