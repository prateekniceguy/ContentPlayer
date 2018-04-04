import { Component , OnInit,ViewChild,trigger,state, style,transition,animate,keyframes,Directive,Input} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';
import {ResponsiveImageComponent} from '../directive/responsiveImage.component';
import 'jquery';


declare var $: any;

@Component({
    selector: 'tempnine',
    template: require('./templatenine.component.html'),
    styles: [require('./templatenine.component.css')],
	animations:[
      trigger('flyInOut',[
        transition('void=>*',[
          style({transform: 'translateX(-100%)'}),
            animate('.5s')
            ])

        ])
    ]
})

export class TemplatenineComponent implements OnInit{
constructor(private router: Router,
      private route: ActivatedRoute,private _sharedService: SharedService) {}
	  
	  @ViewChild('fireworks')  fireworks: any;
      @ViewChild('myDiv')  myDiv: any;
      @ViewChild('narrator_temp9') narrator_voice: any;
      @ViewChild('myClose') myClose : any;
      timernextseg:any;
	  timernextinterval:any;
      //init function
      // initialize all variables
        i=0;
        currentIdx = 0;
        j:number=0;
        ans_idx:number=0;
        optimage:any;
        bool:boolean=false;
	    show:boolean=false;
		showHover:any = [false,false,false];
		showques:boolean = false;
        audio =new Audio();
        blink:boolean;
        answered:boolean = false;

        optionslist = this._sharedService.navigatetoroute.main;
        optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
        myoption = this.optionslist[this.currentIdx].options;
        option_fixed =this.optionslist[this.currentIdx].options.map(x => Object.assign({},x));
        question = this.optionslist[this.currentIdx].ques;
        feedback = this.optionslist[this.currentIdx].feedback;
		
		
		checkAnswer(option,event,index) {
			    console.log("Event", event);
       if(!this.narrator_voice.nativeElement.paused){
         //console.log("hi i m in do something func");
           event.stopPropagation();
       }
       else{
		   var abj:any=this;
			console.log("answer is in process");
      // Analytics called for attempt counter & first option is clicked
      this._sharedService.optionclickhandler(option.id,option.image,this.optionslist_main.id);
      this._sharedService.attempt_counter++;  // called when any option is clicked
        console.log("attempt_counter>>>>",this._sharedService.attempt_counter);
        if(this._sharedService.attempt_counter == 1){
              this._sharedService.first_option_selected=option.id;
              this._sharedService.first_option_selected_data=option.image;
              console.log("first option selected >>>>",this._sharedService.first_option_selected,this._sharedService.first_option_selected_data);
              }

        //show feedback image
         option.imgsrc =option.img_feedback;
		 
		
      // logic to check what user has done is correct or wrong
       var selectedIndex = this.option_fixed.map(function(item) { return item.id; }).indexOf(option.id);
      if(selectedIndex == this.feedback.correct_ans_index){
		  
		   // remove selected option 
		 document.getElementById("optimage"+index).style.visibility = "hidden";
		 
		 this.showques= true;
		//this.question.image = this.question.img_answer;
        this.answered = true;
      
		//fireworks POC
          let elfireworks: HTMLElement = this.fireworks.nativeElement as HTMLElement
          elfireworks.className = "class4";
          elfireworks.style.position = "absolute";
          elfireworks.style.top = "40%";
          elfireworks.style.left = "30%";
		 
        // call to play answer sound
        var feedbackfirework_audio=this.playSound(this.question.right_ans_sound);
     
		this.timernextinterval=setInterval(function() {
        if(abj.isPlaying()){
		let elfireworks: HTMLElement = abj.fireworks.nativeElement as HTMLElement
        elfireworks.className = "class3";
			
		if(abj.currentIdx == abj.optionslist.length-1){
        abj.blink=true;
        }else{
        //Auto next within activity
        let el: HTMLElement = abj.myDiv.nativeElement as HTMLElement;
        el.click();
        }
		clearInterval(abj.timernextinterval);
		}
		else{
			console.log("feedback_audio still playing");
		}
        }, 1000);
  
      }


     else{
        // call to play answer sound
		
        this.playSound(this.question.wrong_ans_sound);
        console.log("try again");
        //vibrate POC
        this.optimage=event.path[1];
        console.log("vibrate poc:",event.path[1]);
        this.optimage.className=this.optimage.className.concat(" animation-shake");

        // Show popup
        var modal = document.getElementById('myModal');
        var modalImg = document.getElementById("modal-img") as HTMLImageElement;
        var modalcontent  = document.getElementById('modalContent');
        modalcontent.style.background = this.feedback.wrong_ans_popup.image_bg;

        setTimeout(function() {
        modal.style.display = "block";
        modalImg.src=option.image_PopUp_ans;
        }, 1000);

        let el: HTMLElement = this.myClose.nativeElement as HTMLElement;
      //  this.timernextseg=setTimeout(function() {
		var feedback_audio=this.playSound(this.question.wrong_ans_sound)
		this.timernextinterval=setInterval(function() {
        if(abj.isPlaying()){
			 console.log("dfhdfhdfh");
			 el.click();
			 clearInterval(abj.timernextinterval);
		}
		else{
			console.log("feedback_audio still playing");
		}
        }, 1000);
		
       // el.click();
    //  }, 11000);
		

        
        setTimeout(function() {
        // option.dispaly_image = option.image;
        abj.optimage.className = "btn btn1 no-padding options";
        }, 3000);

        //call random
          setTimeout(function() {
        abj.myoption = abj.doRandomize(abj.myoption);
        console.log("random options array: ",abj.myoption);
        }, 3000);

        //call getItemAt
      }

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
  
    //close modal
       closeModal()
    {
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
      if(this.audio.play()){
         this.audio.pause();
      }
      else{
         this.audio.play();
      }
    }
	
	onHover(option,index)
		{
			//this.showHover[index] = true;
		  // option.imgsrc =option.imgsrc_hover;
		  if(!this.narrator_voice.nativeElement.paused){
						console.log("narrator voice still playing");
					}
					else{
						$(".btn1").addClass("cursor-pointer");
						for(var i in this.showHover){
							this.showHover[i] = false;
						}
						this.showHover[index] = true;
						/*if(this.audio.play()){
						this.audio.pause();
						this.playSound(option.sound);
						}
						else{
						this.playSound(option.sound);
						}*/
					}

		}

		onHoverout(option,index)
		{
			this.showHover[index] = false;
			//console.log("hi hoverout");
			//if(option.imgsrc ==option.imgsrc_hover){
			//		option.imgsrc = option.imgsrc_original;
			//}
			//else{

			//}

		}
		
		 // previous function
        previous(){
			 this.showques= false;
				// to hide resize of image
			document.getElementById("div1").style.visibility = "hidden";
			
			setTimeout(function(){
				document.getElementById("div1").style.visibility = "visible";
			},200)
			
        this.blink=false;
        this.audio.pause();
        this.answered = false;
        if( this.currentIdx > 0) {
        this.currentIdx--;
        this.optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
        this.myoption = this.optionslist[this.currentIdx].options;
        this.question = this.optionslist[this.currentIdx].ques;
        this.feedback = this.optionslist[this.currentIdx].feedback;
               }
               this.removeEvents();
      }

      next(){
		  console.log("########################");
		   this.showques= false;
		    
		  	// to hide resize of image
			document.getElementById("div1").style.visibility = "hidden";
			
			setTimeout(function(){
				document.getElementById("div1").style.visibility = "visible";
			},200)
			 
			
        this.audio.pause();
		this.narrator_voice.nativeElement.pause();
        this.answered = false;
        if( this.currentIdx < (this.optionslist.length)) {
            this.currentIdx++;
      if( this.currentIdx <= (this.optionslist.length-1)) {
      this.optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
            this.myoption = this.optionslist[this.currentIdx].options;
      this.question = this.optionslist[this.currentIdx].ques;
      this.feedback = this.optionslist[this.currentIdx].feedback;
      //this.playSound(this.question.sound);
      }
         }
     this.removeEvents();
     // this.reset();


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
       clearInterval(this.timernextinterval);
       this.setEnability(this.bool,this.currentIdx);
	   let elfireworks: HTMLElement = this.fireworks.nativeElement as HTMLElement
       elfireworks.className = "class3";
	   //clearTimeout(this.timernextseg);
	 
    }
	
	playSound(sound) {
        this.audio.pause();
        this.audio.src =  sound;
        this.audio.load();
        this.audio.play();
		
    }
	
    isPlaying() { return this.audio.paused; }

	ngOnInit() {
		console.log("ng on in it from "+this.optionslist);
 }

}
