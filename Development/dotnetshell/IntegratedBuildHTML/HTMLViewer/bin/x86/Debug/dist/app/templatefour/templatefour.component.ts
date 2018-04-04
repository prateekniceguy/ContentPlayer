import { Component , OnInit ,HostListener ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';
import {ResponsiveImageComponent} from '../directive/responsiveImage.component';

import 'jquery';


declare var $: any;

@Component({
    selector: 'tempfour',
    template: require('./templatefour.component.html'),
    styles: [require('./templatefour.component.css')],
    //directives: [ResponsiveImageDirective]

})

export class TemplatefourComponent implements OnInit{
constructor(private router: Router,
      private route: ActivatedRoute,private _sharedService: SharedService) {
		  	console.log("coming json",this._sharedService.navigatetoroute.main);
	  }
	  @ViewChild('fireworks')  fireworks: any;
	  @ViewChild('myDiv')  myDiv: any;
	  @ViewChild('narrator_voice') narrator_voice: any;
	  timernextseg:any;
		//init function
		//init(){
		// initialize all variables
			i=0;
			currentIdx = 0;
			j:number=0;
			ans_idx:number=0;
			optimage:any;
			bool:boolean=false;
			
			audio =new Audio();

			optionslist = this._sharedService.navigatetoroute.main;

			optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
		
			speaker = this.optionslist[this.currentIdx].speaker;
			myoption = this.optionslist[this.currentIdx].options;
			question = this.optionslist[this.currentIdx].ques;
		
			feedback = this.optionslist[this.currentIdx].feedback;
			answers = this.optionslist[this.currentIdx].answers;


	    //disable next on last activity last question//
			isLastActivity = this._sharedService.isLastActivity;
		//}
		

		stopAllSounds(e) {
	     console.log("Event", e);
		 if(!this.narrator_voice.nativeElement.paused){
			 //console.log("hi i m in do something func");
			   e.stopPropagation();
			   console.log("narrator voice still playing");
		 }
		 else{}

	}
	    playSound(sound) {
        // plays a sound
			this.audio.src =  sound;
			this.audio.load();
			this.audio.play();
	
		
       }
	   
		playSound_Speaker(el: HTMLAudioElement){
	
		if(!this.narrator_voice.nativeElement.paused){
			console.log("narrator voice still playing");
		}
		else{
		  this._sharedService.speaker_counter++;
		  this._sharedService.speakerbutton();
		  console.log("speaker_counter:",this._sharedService.speaker_counter);
		    if (el.paused) {
			el.play();
			}else{
			el.currentTime = 0;
			el.play();
			}
		 
		}
	}

		stopSound() {


	}


		loadImage(imgPath, refDiv) {

		console.log(imgPath,refDiv);
		//var id =refDiv.id;
		// load imgPath in refDiv
		   var elem = document.createElement("img");
		   refDiv.appendChild(elem);
		   elem.src = imgPath;
		   elem.className="btn btn1 no-padding options";
		   elem.style.width="60%";


	}
		UnloadImage(refDiv) {
		// unload imgPath in
		  var c = refDiv.childNodes[1];
		  if(c!=undefined)
		  refDiv.removeChild(c);

	}

		checkAnswer(option,event) {

		// Analytics called for attempt counter & first option is clicked
		this._sharedService.optionclickhandler(option.custom_id,option.imgsrc,this.optionslist_main.id);
		this._sharedService.attempt_counter++;  // called when any option is clicked
			console.log("attempt_counter>>>>",this._sharedService.attempt_counter);
			if(this._sharedService.attempt_counter == 1){
            this._sharedService.first_option_selected=option.custom_id;
            this._sharedService.first_option_selected_data=option.imgsrc;
            console.log("first option selected >>>>",this._sharedService.first_option_selected,this._sharedService.first_option_selected_data);
            }

		// logic to check what user has done is correct or wrong
		if(option.custom_id == this.answers[this.i].custom_id && this.i<this.answers.length){
			// empty cloud
			option.imgsrc = option.image;
			

		

			console.log("i have hit correct sequence");

			//visibility true and call loadImage()
			if(this.j < this.answers.length){
			this.loadImage(this.answers[this.j].imgsrc, document.getElementById("div"+this.j));
			this.j++;
			}
			document.getElementById("div"+this.i).style.visibility = "visible";
			this.i++;
			console.log("check:",this.i,this.answers.length);
			if(this.i==this.answers.length)
			{
			//fireworks POC
			// call to play answer sound
				this.playSound(this.feedback.write_ans_sound.path);
				let elfireworks: HTMLElement = this.fireworks.nativeElement as HTMLElement

				elfireworks.className = "class4";
				elfireworks.style.position = "absolute";
				elfireworks.style.top = "100%";
				elfireworks.style.left = "30%";
			//disable click on options and speaker
			var disableOption=document.getElementById("disableOption")
			var disableSpeaker=document.getElementById("disableSpeaker")
			disableOption.className = disableOption.className.concat(" disable");
			disableSpeaker.className = disableSpeaker.className.concat(" disable");
			
			// question next timeout

			let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;

			this.timernextseg=setTimeout(function() {

			el.click();
			}, 7000);
			}

			//call random

			this.myoption = this.doRandomize(this.myoption);

		}


		else{
			// call to play answer sound

			this.playSound(this.feedback.wrong_ans_sound.path);

			console.log("try again");
			//vibrate POC
			this.optimage=event.toElement;
			console.log(this.optimage);
			this.optimage.className=this.optimage.className.concat(" animation-shake");
			var abj:any=this;
			setTimeout(function() {
			abj.optimage.className = "btn btn1 no-padding options";
			}, 1000);
			//call random
			setTimeout(function() {
			abj.myoption = abj.doRandomize(abj.myoption);
			console.log("random options array: ",abj.myoption);
			}, 2000);

		}

	}


		doRandomize(array) {

		  var currentIndex = array.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		  }

		  return array;

	}

	    // previous function
        previous(){
        if( this.currentIdx > 0) {
            this.currentIdx--;
			this.optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
            this.myoption = this.optionslist[this.currentIdx].options;
			this.question = this.optionslist[this.currentIdx].ques;
			this.feedback = this.optionslist[this.currentIdx].feedback;
			this.answers = this.optionslist[this.currentIdx].answers;
			this.speaker = this.optionslist[this.currentIdx].speaker;
             }
    }
	    // next function
        next(){
        if( this.currentIdx < (this.optionslist.length)) {
            this.currentIdx++;
			if( this.currentIdx < (this.optionslist.length-1)) {  
			this.optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
            this.myoption = this.optionslist[this.currentIdx].options;
			this.question = this.optionslist[this.currentIdx].ques;
			this.feedback = this.optionslist[this.currentIdx].feedback;
			this.answers = this.optionslist[this.currentIdx].answers;
			this.speaker = this.optionslist[this.currentIdx].speaker;
			}
         }
		 this.removeEvents();
		 this.reset();
		 this.setEnability(this.bool,this.currentIdx);

    }
		setEnability(flag, option_ref) {
		// sets enabled or disabled
		this.bool=true;
		 if(this.optionslist.length == option_ref && this.bool ){
            this._sharedService.activityfinished();
			this.bool=false;
         }
	}

		removeEvents() {
		// remove event handlers for all clickable items in the dom
		 clearTimeout(this.timernextseg);
		 let elfireworks: HTMLElement = this.fireworks.nativeElement as HTMLElement
		 elfireworks.className = "class3";
	}

		reset() {
		// will reset all what user performed
		this.audio.pause();
		this._sharedService.correct_option_attempt_counter =0;
		this._sharedService.attempt_counter =0;
		this._sharedService.first_option_selected =0;
		this._sharedService.first_option_selected_data="none";
		this._sharedService.speaker_counter =0;
		for(this.j=0;this.j< this.answers.length;this.j++){
			document.getElementById("div"+this.j).style.visibility = "hidden";
			this.UnloadImage(document.getElementById("div"+this.j));
		}
		this.i=0;
		this.j=0;

	}

		ngOnInit() {

		console.log("hi init:");
	}

}
