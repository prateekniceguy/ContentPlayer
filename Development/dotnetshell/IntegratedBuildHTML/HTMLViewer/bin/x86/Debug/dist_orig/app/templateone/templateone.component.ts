import { Component , OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';
import 'jquery';
declare var $: any;

@Component({
    selector: 'my-tempone',
    template: require('./templateone.component.html'),
    styles: [require('./templateone.component.css')]

})

export class TemplateoneComponent implements OnInit{
      constructor(private router: Router,private route: ActivatedRoute,private _sharedService: SharedService) {}
		@ViewChild('myDiv')  myDiv: any;
      timernextseg:any;
	    data=this._sharedService.navigatetoroute.set;
      instruction=this._sharedService.navigatetoroute.instruction;
      myoption = this.data[0].optionslist;
      question = this.data[0].question;
      optionslist_duplicate=this._sharedService.navigatetoroute.optionslist_duplicate;
      myoption_duplicate = this.optionslist_duplicate[0];

      //disable next on last activity last question//
      isLastActivity = this._sharedService.isLastActivity;

      currentIdx = 0;
      hoverIdx: number;
      tempImg: string;
      id: number;
      toggleImg  = true;//
      styles = {};
      isaudio = false;
      audio =new Audio();

        playInstruction(){
        this.audio.src =  this.instruction.sound;
        this.audio.load();
        this.audio.play();
      }

          playQuestion(que){
          this.audio.src =  que.sound;
          this.audio.load();
          this.audio.play();

      }
          previous(){
          if( this.currentIdx > 0) {
          this.currentIdx--;
          this.myoption = this.data[this.currentIdx].optionslist;
          this.question = this.data[this.currentIdx].question;
          this.playQuestion(this.question);
          this.myoption_duplicate = this.optionslist_duplicate[this.currentIdx];
             }
       }

       next(){
        if( this.currentIdx < (this.data.length-1)) {
              this.currentIdx++;
              this.myoption = this.data[this.currentIdx].optionslist;
              this.question = this.data[this.currentIdx].question;
              this.playQuestion(this.question);
            this.myoption_duplicate = this.optionslist_duplicate[this.currentIdx];
          }   //else{this._sharedService.activityfinished();}
       }



        playAudio(option, index) {
        this.hoverIdx = index;
        this.toggleImg = false;
        this.audio.src =  option.sound;
        this.audio.load();
        this.audio.play();
        this.tempImg = option.imgsrc;
        option.imgsrc =  option.imgsrc1;
      }

      pauseAudio(option){
      option.imgsrc = this.tempImg;
      }
      selected(option){
      this._sharedService.attempt_counter++;  // called when any option is clicked
			console.log("attempt_counter>>>>",this._sharedService.attempt_counter);
			if(this._sharedService.attempt_counter == 1){
      this._sharedService.first_option_selected=option.index;
      this._sharedService.first_option_selected_data=option.imgsrc;
      console.log("first option selected >>>>",this._sharedService.first_option_selected,this._sharedService.first_option_selected_data);
      }
			else{}
			if(option.class=="tick-true"){
			this._sharedService.correct_index =option.index;
			this._sharedService.correct_option_attempt_counter=this._sharedService.attempt_counter;
			console.log("correct_option_attempt_counter",this._sharedService.correct_option_attempt_counter);

			let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
			this.timernextseg=setTimeout(function() {

			el.click();
			}, option.timer);

			}
			this._sharedService.optionclickhandler(option.index,option.imgsrc,this.myoption_duplicate[0].questionId);

        this.audio.src =  option.sound1;
        this.audio.load();
        this.audio.play();
        this.myoption[0].hideElement = false;
        this.myoption[1].hideElement = false;
        this.myoption[2].hideElement = false;
        option.hideElement= true;
        }

      clickAudi(){
        this._sharedService.speaker_counter++;
        this._sharedService.speakerbutton();
        this.audio.src = "http://localhost:8080/content01/Tha.ogg";
        this.audio.load();
        this.audio.play();

      }

      clicked0(event) {
          this._sharedService.correct_option_attempt_counter =0;
          this._sharedService.attempt_counter =0;
          this._sharedService.first_option_selected =0;
          this._sharedService.first_option_selected_data="none";
          this._sharedService.speaker_counter =0;
         this.audio.src = this.myoption_duplicate[0].path;
         if(this.myoption_duplicate[0].next == true){
          console.log("testingggg......");
          this._sharedService.activityfinished();
          }else{
          this.audio.load();
          this.audio.play();
          this.next();
          }
  clearTimeout(this.timernextseg);

      }

      ngOnInit() {
      this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log("tONE");
      this.playInstruction();
    //if audio is stopped the n run line 40
    //this.playQuestion(this.question);
  });

}


}
