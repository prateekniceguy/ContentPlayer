import { Component , OnInit,ViewChild,trigger,state, style,transition,animate,keyframes,Directive,Input} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';
import {ResponsiveImageComponent} from '../directive/responsiveImage.component';
import 'jquery';
declare var $: any;

@Component({
    selector: 'my-tempthree',
    template: require('./template3.component.html'),
    styles: [require('./template3.component.css')],
    animations:[
      trigger('flyInOut',[
        transition('void=>*',[
          style({transform: 'translateX(-100%)'}),
            animate('.5s')
            ])

        ])
    ],
   /* directives: [ResponsiveImageDirective]*/

})

export class TemplatethreeComponent implements OnInit{
  constructor(private router: Router,
        private route: ActivatedRoute,private _sharedService: SharedService) {
          console.log("coming json",this._sharedService.navigatetoroute.main);
      }
      @ViewChild('fireworks')  fireworks: any;
      @ViewChild('myDiv')  myDiv: any;
      @ViewChild('narrator_voice') narrator_voice: any;
      @ViewChild('myClose') myClose : any;
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
        blink:boolean;
        answered:boolean = false;


        optionslist = this._sharedService.navigatetoroute.main;

        optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
        myoption = this.optionslist[this.currentIdx].options;
        option_fixed =this.optionslist[this.currentIdx].options.map(x => Object.assign({},x));
        question = this.optionslist[this.currentIdx].ques;
        feedback = this.optionslist[this.currentIdx].feedback;
        answers = this.optionslist[this.currentIdx].answers;
        speaker = this.optionslist[this.currentIdx].speaker;



        //disable next on last activity last question//
        isLastActivity = this._sharedService.isLastActivity;


      stopAllSounds(e) {
         console.log("Event", e);
       if(!this.narrator_voice.nativeElement.paused){
           e.stopPropagation();
          
       }
       else{}

    }
      playSound(sound) {
        this.audio.pause();
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
      //this.playSound(this.question.sound);
      if (el.paused){
            el.play();
      }else{
            el.currentTime = 0;
            el.play();
        }
    }
  }

      stopSound()
      {}


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

      checkAnswer(option,event,index) {

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

        // call to play answer sound
        this.playSound(this.feedback.write_ans_sound.path);
        this.answered = true;
        if(this.currentIdx == this.optionslist.length-1){
        this.blink=true;
      }else{
        //Auto next within activity
        let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
        this.timernextseg=setTimeout(function() {
        el.click();
      }, 10000);
    }


      //fireworks POC
          let elfireworks: HTMLElement = this.fireworks.nativeElement as HTMLElement

          elfireworks.className = "class4";
          elfireworks.style.position = "absolute";
          elfireworks.style.top = "40%";
          elfireworks.style.left = "30%";

        // question next timeout

    //     let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    //
    //     this.timernextseg=setTimeout(function() {
    //
    //   el.click();
    // }, 10000);

        //call random
        // this.myoption = this.doRandomize(this.myoption);

        //call getItemAt
      }


      else{
        // call to play answer sound

        this.playSound(this.feedback.wrong_ans_sound.path);
        console.log("try again");
        //vibrate POC
        this.optimage=event.toElement;
        console.log(this.optimage);
        this.optimage.className=this.optimage.className.concat(" animation-shake");

        // Show popup
        var modal = document.getElementById('myModal');
        var modalImg = document.getElementById("modal-img") as HTMLImageElement;
        var modalcontent  = document.getElementById('modalContent');
        modalcontent.style.background = this.feedback.wrong_ans_popup.image_bg;

        setTimeout(function() {
        modal.style.display = "block";
        modalImg.src=option.image;
        }, 1000);

        let el: HTMLElement = this.myClose.nativeElement as HTMLElement;
        this.timernextseg=setTimeout(function() {
        el.click();
      }, 11000);


        var abj:any=this;
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

      getItemAt(index_in_array, array_reference) {
                  // return array_reference[index_in_array];
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


        // previous function
        previous(){
        this.audio.pause();
        this.blink=false;
        this.answered = false;
        if( this.currentIdx > 0) {
        this.currentIdx--;
        this.optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
        this.myoption = this.optionslist[this.currentIdx].options;
        this.question = this.optionslist[this.currentIdx].ques;
        this.feedback = this.optionslist[this.currentIdx].feedback;
        this.answers = this.optionslist[this.currentIdx].answers;
        this.speaker = this.optionslist[this.currentIdx].speaker;
               }
               this.removeEvents();
      }
        //next function
     //    next(){
     //    if( this.currentIdx < (this.optionslist.length-1)) {
     //    this.currentIdx++;
        // this.optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
     //    this.myoption = this.optionslist[this.currentIdx].options;
        // this.question = this.optionslist[this.currentIdx].ques;
        // this.feedback = this.optionslist[this.currentIdx].feedback;
        // this.answers = this.optionslist[this.currentIdx].answers;
        // this.speaker = this.optionslist[this.currentIdx].speaker;
        // this.playSound(this.question.sound);

     //       }
       // this.removeEvents();
       // this.reset();
       // this.setEnability(this.bool,this.currentIdx);

     //  }

      next(){
        this.audio.pause();
        this.answered = false;
        if( this.currentIdx < (this.optionslist.length)) {
            this.currentIdx++;
      if( this.currentIdx <= (this.optionslist.length-1)) {
      this.optionslist_main = this._sharedService.navigatetoroute.main[this.currentIdx];
            this.myoption = this.optionslist[this.currentIdx].options;
      this.question = this.optionslist[this.currentIdx].ques;
      this.feedback = this.optionslist[this.currentIdx].feedback;
      this.answers = this.optionslist[this.currentIdx].answers;
      this.speaker = this.optionslist[this.currentIdx].speaker;
      this.playSound(this.question.sound);
      }
         }
     this.removeEvents();
     // this.reset();
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

   onHover(option)
    {
       option.imgsrc =option.img_hover;
       if(this.audio.play()){
       this.audio.pause();
       this.playSound(option.sound);
       }
       else{
       this.playSound(option.sound);
       }

    }

    onHoverout(option)
    {
      //console.log("hi hoverout");
      if(option.imgsrc ==option.img_hover || option.imgsrc ==option.img_feedback){
          option.imgsrc = option.image;
      }
      else{

      }

    }

      ngOnInit() {
        //Play question
        //this.playSound(this.question.sound);
      console.log("hi init:",this.question.sound);
    }

  }
