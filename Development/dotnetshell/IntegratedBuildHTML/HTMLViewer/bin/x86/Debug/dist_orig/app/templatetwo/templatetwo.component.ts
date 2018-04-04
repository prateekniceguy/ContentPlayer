import { Component , OnInit ,HostListener ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';

import 'jquery';


declare var $: any;

@Component({
    selector: 'temptwo',
    template: require('./templatetwo.component.html'),
    styles: [require('./templatetwo.component.css')]

})

export class TemplatetwoComponent implements OnInit{
constructor(private router: Router,
      private route: ActivatedRoute,private _sharedService: SharedService) {}
      @ViewChild('narrator_voice') narrator_voice: any;
	  @ViewChild('myDiv')  myDiv: any;
	  @ViewChild('myClose')  myClose: any;
	  timerclose:any;
	  timernextseg:any;
	   i=0;
	   myArraycount:any = [0,1,2,0];

	   public doSomething(e) {

        console.log("Event", e);
		 if(!this.narrator_voice.nativeElement.paused){
			 //console.log("hi i m in do something func");
			   e.stopPropagation();
		 }
		 else{}
    }

      //disable next on last activity last question//
      isLastActivity = this._sharedService.isLastActivity;

        optionslist=this._sharedService.navigatetoroute.data[0].optionslist;
        optionslist_duplicate=this._sharedService.navigatetoroute.data[0].optionslist_duplicate;
        myoption = this.optionslist[0];
        myoption_duplicate = this.optionslist_duplicate[0];
        currentIdx = 0;

        previous(){
        if( this.currentIdx > 0) {
            this.currentIdx--;
            this.myoption = this.optionslist[this.currentIdx];
            this.myoption_duplicate = this.optionslist_duplicate[this.currentIdx];
             }
        }

        next(){
		      //this.narrator_voice.nativeElement.pause();
		       this.bool = true;
        if( this.currentIdx < (this.optionslist.length-1)) {
              this.currentIdx++;
              this.myoption = this.optionslist[this.currentIdx];
              this.myoption_duplicate = this.optionslist_duplicate[this.currentIdx];    }
        }

      id: number;
      styles = {};
      isaudio = false;
      audio =new Audio();

//	   @HostListener('document:click', ['$event'])
//    documentClick(event: MouseEvent) {

//alert('clicked');
//		 this.narrator_voice.nativeElement.pause();

// this.audio.pause();
// this.audio.play();
//    }


       	close()
		{


			console.log("coming object",this.myoption[this.myArraycount[this.i]]);
			this.myoption[this.myArraycount[this.i]].imgsrc= this.myoption[this.myArraycount[this.i]].imgsrc_ans;
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




		bool: boolean = true;
         selected(option) {
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
			}

			this._sharedService.optionclickhandler(option.index,option.imgsrc,this.myoption_duplicate[0].questionId);

			if(this.audio.play()){
				 this.audio.pause();
			}
			else{
				 this.audio.play();
			}


		    if(option.correct1 == true){

			   this._sharedService.scoreData(10);
               console.log('Data sent of score',this._sharedService.Activity_Score);
			   option.imgsrc =option.imgsrc_ans;
				var modalcontent  = document.getElementById('modalContent');
			   modalcontent.style.background = option.PopUp;   // updating the div via its properties
			// Get the modal
			var modal = document.getElementById('myModal');
			var modalImg = document.getElementById("img01") as HTMLImageElement;
			modal.style.display = "block";
			modalImg.src=option.imgsrc_original;

		    this.bool = false;


			let ell: HTMLElement = this.myClose.nativeElement as HTMLElement;
			let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
			this.timerclose=setTimeout(function() {
			ell.click();
			}, option.close_timer);

			this.timernextseg=setTimeout(function() {
			el.click();
			}, option.timer);

		    }
		    else if(option.correct1 == "false1"){
			  this._sharedService.scoreData(0);
			  console.log('Data sent of score',this._sharedService.Activity_Score);
			  option.imgsrc =option.imgsrc_ans;
		    }
			else{
			  this._sharedService.scoreData(0);
			  console.log('Data sent of score',this._sharedService.Activity_Score);
			  option.imgsrc =option.imgsrc_ans;
			}

        this.audio.src =  option.sound;
        this.audio.load();
        this.audio.play();


        this.myoption[0].hideElement = false;
        this.myoption[1].hideElement = false;
        this.myoption[2].hideElement = false;
        option.hideElement= true;

        }

        clicked0(event) {
			this._sharedService.correct_option_attempt_counter =0;
			this._sharedService.attempt_counter =0;
			this._sharedService.first_option_selected =0;
			this._sharedService.first_option_selected_data="none";
			this._sharedService.speaker_counter =0;
          //var audio = new Audio();
          //this.audio.src = this.myoption_duplicate[0].path;
		  if(this.myArraycount.length-1){
				this.i++;
			}
			else{}
          if(this.myoption_duplicate[0].next == true){
			 console.log("testingggg......");
            this._sharedService.activityfinished();
          }
          // this.audio.load();
          // this.audio.play();
         clearTimeout(this.timernextseg);
        }

		playMusic(el: HTMLAudioElement) {
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


	  	onHover(option)
		{
		   option.imgsrc =option.imgsrc_nuetral;

		}

		onHoverout(option)
		{
			//console.log("hi hoverout");
			if(option.imgsrc ==option.imgsrc_nuetral || option.imgsrc ==option.imgsrc_ans){
					option.imgsrc = option.imgsrc_original;
			}
			else{

			}

		}




	ngOnInit() {

	  this.route.params.subscribe(params => {
		  this.id = +params['id']; // (+) converts string 'id' to a number
		   console.log(this.id)
	  });




  }

}
