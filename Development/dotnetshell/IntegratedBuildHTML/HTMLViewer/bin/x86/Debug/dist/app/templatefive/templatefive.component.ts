import { Component , OnInit ,HostListener ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';
import {ResponsiveImageComponent} from '../directive/responsiveImage.component';

import 'jquery';


declare var $: any;

@Component({
    selector: 'tempfive',
    template: require('./templatefive.component.html'),
    styles: [require('./templatefive.component.css')],

})

export class TemplatefiveComponent implements OnInit{
	
constructor(private router: Router,
      private route: ActivatedRoute,private _sharedService: SharedService) {
                                                console.log("coming json",this._sharedService.navigatetoroute.main);
                  }
                  @ViewChild('fireworks')  fireworks: any;
                  @ViewChild('myDiv')  myDiv: any;
                  @ViewChild('narrator_voice') narrator_voice: any;
                  @ViewChild('myClose')  myClose: any;
                  @ViewChild('overlay')  overlay: any;
                  @ViewChild('overlayOut')  overlayOut: any;
				 // @ViewChild(ResponsiveImageComponent) vc:ResponsiveImageComponent;
                  timerclose:any;
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

                                                optionslist_main = this.optionslist[this.currentIdx];
                                                myoption = this.optionslist[this.currentIdx].options;
                                                question = this.optionslist[this.currentIdx].ques;
                                                feedback = this.optionslist[this.currentIdx].feedback;
                                                speaker = this.optionslist[this.currentIdx].speaker;
												

                    //disable next on last activity last question//
                                                isLastActivity = this._sharedService.isLastActivity;
                                //}

                                stopAllSounds(e) {
								console.log("Event", e);
                                if(!this.narrator_voice.nativeElement.paused){
                                //console.log("hi i m in do something func");
                                e.stopPropagation();
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
                                  el.play();
                                }
                }
                                onHover(option){
                                if(!this.narrator_voice.nativeElement.paused){
                                                console.log("narrator voice still playing");
                                }
                                else{
								console.log("check:",option.imgsrc,option.imgsrchover);
								
                                                if(this.audio.play()){
                                                this.audio.pause();
                                                this.playSound(option.sound);
                                                }
                                                else{
                                                this.playSound(option.sound);
                                                }
                                }
								
                }

                                stopSound() {


                }
                                close() {

                                    var modal = document.getElementById('myModal');
                                    modal.style.display = "none";
                                                if(this.audio.play()){
                                                                this.audio.pause();
                                                }
                                                else{
                                                                this.audio.play();
                                                }
         clearTimeout(this.timerclose);
                }

                                loadImage(imgPath, refDiv) {

                               console.log(imgPath,refDiv);
                                //var id =refDiv.id;
                                // load imgPath in refDiv
                                   let elem = document.createElement("img");
                                   elem.setAttribute("id", "rightansimage");
                                   refDiv.appendChild(elem);
                                   elem.src = imgPath;
                                   elem.className="btn btn1 no-padding options";
                                   elem.style.position="absolute";
                                   elem.style.margin="18% 0% 0% 0%";
                                   elem.style.right="48%";

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
                                if(option.custom_id == this.feedback.correct_ans_index && this.i<this.myoption.length){
                                                this.i++;

                                                //Analytics
                                                this._sharedService.correct_index =option.custom_id;
                                                this._sharedService.correct_option_attempt_counter=this._sharedService.attempt_counter;
                                                console.log("correct_option_attempt_counter",this._sharedService.correct_option_attempt_counter);

                                                // call to play answer sound

                                                this.playSound(this.feedback.write_ans_sound.path);
                                                console.log("i have hit correct sequence");

                                                //fireworks POC

                                                                let elfireworks: HTMLElement = this.fireworks.nativeElement as HTMLElement

                                                                elfireworks.className = "class4";
                                                                elfireworks.style.position = "absolute";
                                                                elfireworks.style.top = "12%";
                                                                elfireworks.style.right = "40%";
												//disable click on options and speaker
												var disableOption=document.getElementById("disableOption")
												disableOption.className = disableOption.className.concat(" disable");
												                                              
                                                // question next timeout

                                                let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;

                                                this.timernextseg=setTimeout(function() {

                                                el.click();
                                                }, 7000);

                                                //overlay
                                                let overlay: HTMLElement = this.overlay.nativeElement as HTMLElement
                                                overlay.className=overlay.className.concat(" overlay");
                                                let overlayOut: HTMLElement = this.overlayOut.nativeElement as HTMLElement
                                                this.loadImage(this.feedback.write_ans_popup.imgsrc,overlayOut);
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
                                                }, 2000);

                                                setTimeout(function() {
                                                var modalcontent  = document.getElementById('modalContent');
                                                //modalcontent.style.background = abj.feedback.wrong_ans_popup.text;// updating the div via its properties
                                                // Get the modal
                                                var modal = document.getElementById('myModal');
                                                var modalImg = document.getElementById("img01") as HTMLImageElement;
                                                modal.style.display = "block";
                                                modalImg.src=abj.feedback.wrong_ans_popup.imgsrc;

                                                let ell: HTMLElement = abj.myClose.nativeElement as HTMLElement;

                                                abj.timerclose=setTimeout(function() {
                                                ell.click();
                                                }, 7000);
                                                //call random
                                                //abj.myoption = abj.doRandomize(abj.myoption);
                                                //console.log("random options array: ",abj.myoption);
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
                                                this.speaker = this.optionslist[this.currentIdx].speaker;
             }
    }
                    // next function
        next(){
			//console.log("i m next:",this.currentIdx, this.optionslist.length-1);
		
           
            if( this.currentIdx < (this.optionslist.length-1)) {
            this.currentIdx++;                                
					
            this.optionslist_main = this.optionslist[this.currentIdx];
            this.myoption = this.optionslist_main.options;
			this.question = this.optionslist_main.ques;
			this.feedback = this.optionslist_main.feedback;
            this.speaker = this.optionslist_main.speaker;
			console.log("in ts:",this.myoption);
			
         }
		 else{
			  this.currentIdx++;       
			  this.setEnability(this.bool,this.currentIdx);
		 }
		 
             this.removeEvents();
             this.reset();
            
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
                                let overlay: HTMLElement = this.overlay.nativeElement as HTMLElement
                                overlay.className = "container-fluid";
                                var rightImage=document.getElementById('rightansimage');
                                if(rightImage != null)
                                rightImage.style.display="none";
								var disableOption=document.getElementById("disableOption")
								disableOption.className = "disp-inblock pos-rel full-width correct cloud_pos";

                }

                                reset() {
                                // will reset all what user performed
                                this._sharedService.correct_option_attempt_counter =0;
                                this._sharedService.attempt_counter =0;
                                this._sharedService.first_option_selected =0;
                                this._sharedService.first_option_selected_data="none";
                                this._sharedService.speaker_counter =0;
                                this.i=0;
                                this.j=0;

                }

                                ngOnInit() {
                                console.log("hi init:");
								console.log("55555555555555555555555555");
								console.log(this.optionslist_main);
                }

}
