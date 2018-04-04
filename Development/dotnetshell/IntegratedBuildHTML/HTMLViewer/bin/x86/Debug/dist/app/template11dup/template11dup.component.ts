import { Component , OnInit ,HostListener ,ViewChild,NgZone} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';
import {ResponsiveImageComponent} from '../directive/responsiveImage.component';

import 'jquery';


declare var $: any;

@Component({
    selector: 'template11dup',
    template: require('./template11dup.component.html'),
    styles: [require('./template11dup.component.css')],

})

export class Template11dupComponent implements OnInit{
constructor(private router: Router,
      private route: ActivatedRoute,private _sharedService: SharedService,private ngZone:NgZone) {
                                                
				  }
                  @ViewChild('fireworks')  fireworks: any;
                  @ViewChild('myDiv')  myDiv: any;
                  @ViewChild('narrator_voice') narrator_voice: any;
                  @ViewChild('myClose')  myClose: any;
                  @ViewChild('overlay')  overlay: any;
                  @ViewChild('overlayOut')  overlayOut: any;
				// initialize all variables
				timernextseg:any;
				i=0;
				currentIdx = 0;
				j:number=0;
				ans_idx:number=0;
				optimage:any;
				bool:boolean=false;
				show:boolean=false;
				audio =new Audio();

				optionslist = this._sharedService.navigatetoroute.main;

				optionslist_main = this.optionslist[this.currentIdx];
				myoption = this.optionslist[this.currentIdx].options;
				question = this.optionslist[this.currentIdx].ques;
				feedback = this.optionslist[this.currentIdx].feedback;
				speaker = this.optionslist[this.currentIdx].speaker;
				quesDivId:any;
				ansDivIndex:any;
				color :any;
				thickness:any;
				htmlLine:any;
				showHover:any = [false,false,false];
				timernextinterval:any;

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
				// plays a sound
					if(sound){
						this.audio.src =  sound;
						this.audio.load();
						this.audio.play();
					}
                }
				
				playSound_feedback(sound) {
					this.audio.pause();
					this.audio.src =  sound;
					this.audio.load();
					this.audio.play();
					return this.audio.paused;
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
				onHover(option,index){
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
				
				onHoverout(option,index){
					this.showHover[index] = false;
				}

				stopSound() {}
				loadImage(imgPath, refDiv) {
				   let elem = document.createElement("img");
				   elem.setAttribute("id", "rightansimage");
				   refDiv.appendChild(elem);
				   elem.src = imgPath;
				   elem.className="btn btn1 no-padding options";
				   elem.style.position="absolute";
				   elem.style.margin="18% 0% 0% 0%";
				   elem.style.right="48%";

                }
				checkAnswer(option,event,selectedIndex) {
					// remove if already answred
					if(this.narrator_voice.nativeElement.paused){
						var abc = this;
					var elem = document.getElementById("option_connector");
					if(elem){
						elem.parentNode.removeChild(elem);
						
						//remove animation classes
						$(".btn1").removeClass("animation-shake");
						$("#temp11QuesId").removeClass("animation-shake");
						$("#myCanvas").removeClass("animation-shake");
						clearTimeout(this.timernextinterval);					
					}	
					// Analytics called for attempt counter & first option is clicked
					this._sharedService.optionclickhandler(option.custom_id,option.imgsrc,this.optionslist_main.id);
					this._sharedService.attempt_counter++;  // called when any option is clicked
					if(this._sharedService.attempt_counter == 1){
						this._sharedService.first_option_selected=option.custom_id;
						this._sharedService.first_option_selected_data=option.imgsrc;
					}
                    // logic to check what user has done is correct or wrong
					if(option.custom_id == this.feedback.correct_ans_index && this.i<this.myoption.length){
						this.i++;
						//Analytics
						this._sharedService.correct_index =option.custom_id;
						this._sharedService.correct_option_attempt_counter=this._sharedService.attempt_counter;
						// call to play answer sound
						//this.playSound(this.feedback.right_ans_sound.path);
						var feedback_audio=this.playSound_feedback(this.feedback.right_ans_sound.path)
						this.timernextinterval=setInterval(function() {
						if(abc.isPlaying()){
							 //remove green line
							var elem = document.getElementById("option_connector");
							if(elem){
							elem.parentNode.removeChild(elem);
							//remove fireworks
							let elfireworks: HTMLElement = abc.fireworks.nativeElement as HTMLElement
							elfireworks.className = "class3";
							 clearInterval(abc.timernextinterval);
							 let el: HTMLElement = abc.myDiv.nativeElement as HTMLElement;
							 el.click();
							}
						}
						else{
							console.log("feedback_audio still playing");
						}
						}, 1000);
						//fireworks POC
						let elfireworks: HTMLElement = this.fireworks.nativeElement as HTMLElement
						elfireworks.className = "class4";
						elfireworks.style.position = "absolute";
						elfireworks.style.top = "12%";
						elfireworks.style.right = "40%";
						var abj = this;
						this.quesDivId = 'div1';
						this.ansDivIndex = selectedIndex;
						this.color = 'green';
						this.thickness = 10;
						setTimeout(function(){
							abc.resizeConnectorLine("create");
						},500);	
						//disable click on options and speaker
						var disableOption=document.getElementById("disableOption")
						disableOption.className = disableOption.className.concat(" disable-div");	
						} else{
						// call to play answer sound
						var feedback_audio=this.playSound_feedback(this.question.wrong_ans_sound)
						this.timernextinterval=setInterval(function() {
						if(abc.isPlaying()){
							 //remove red line
							 var elem = document.getElementById("option_connector");
							if(elem){
							elem.parentNode.removeChild(elem);
							}
							//remove animation classes
							$(".btn1").removeClass("animation-shake");
							$("#temp11QuesId").removeClass("animation-shake");
							$("#myCanvas").removeClass("animation-shake");
							
							 clearInterval(abc.timernextinterval);
						}
						else{
							console.log("feedback_audio still playing");
						}
						}, 1000);
				
				
						this.playSound(this.feedback.wrong_ans_sound.path);	
						var abj = this;
						this.quesDivId = 'div1';
						this.ansDivIndex = selectedIndex;
						this.color = 'red';
						this.thickness = 10;
						setTimeout(function(){
							abj.resizeConnectorLine("create");
						},500);
						
						// to shake question option and line
					this.optimage=event.path[1];
					console.log("####################");
					console.log(this.optimage);
					console.log(this.optimage.className);
					this.optimage.className = this.optimage.className.concat(" animation-shake");
					$("#temp11QuesId").addClass("animation-shake");
					$("#myCanvas").addClass("animation-shake");
					$("#optimage"+selectedIndex).addClass("animation-shake");
					}			
					setTimeout(function(){
						var elem = document.getElementById("myCanvas");
						elem.className += " blink_me";
					},100)
					}
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
				 // to hide resize of image
					document.getElementById("div1").style.visibility = "hidden";
					
					setTimeout(function(){
						document.getElementById("div1").style.visibility = "visible";
					},200)
				 for(var i in this.showHover){
					this.showHover[i] = false;
				 }
				  this.audio.pause();
				  this.removeEvents();
				  this.reset();  
			}
		
       // next function
        next(){
			// to hide resize of image
			document.getElementById("div1").style.visibility = "hidden";
			
			//to disable next button for 300  milisecond
			var abc = this;
			var next_btn = abc.myDiv.nativeElement as HTMLElement;
			console.log(next_btn);
			next_btn.classList.remove("btn");
			next_btn.classList.add("disable-btn");
			
			setTimeout(function(){
				document.getElementById("div1").style.visibility = "visible";
			},200)
			
			setTimeout(function(){
				//enable next button after 300 miliseconds
				var next_btn = abc.myDiv.nativeElement as HTMLElement;
				console.log(next_btn);
				next_btn.classList.remove("disable-btn");
				next_btn.classList.add("btn");
			},300)
			for(var i in this.showHover){
				this.showHover[i] = false;
			}
            this.audio.pause();
            if( this.currentIdx < (this.optionslist.length-1)) {
            this.currentIdx++;    	
            this.optionslist_main = this.optionslist[this.currentIdx];
            this.myoption = this.optionslist_main.options;
			this.question = this.optionslist_main.ques;
			this.feedback = this.optionslist_main.feedback;
            this.speaker = this.optionslist_main.speaker;
			if(this.question.sound){
				/*this.playSound(this.question.sound);*/
				this.optionslist[0].narrator_voice = this.question.sound;
			}	
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
			clearTimeout(this.timernextinterval);
			let elfireworks: HTMLElement = this.fireworks.nativeElement as HTMLElement
			elfireworks.className = "class3";
			var disableOption=document.getElementById("disableOption")
			disableOption.classList.remove("disable-div");
			// remove connecting line
			var elem = document.getElementById("option_connector");
			if(elem){
				elem.parentNode.removeChild(elem);
				//remove animation classes
					$(".btn1").removeClass("animation-shake");
					$("#temp11QuesId").removeClass("animation-shake");
					$("#myCanvas").removeClass("animation-shake");
			}
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

		connect(div1,div2Index,color,thickness) {
			var div2 = "optimage"+div2Index;
			var off1 = this.getOffset(div1);
			var off2 = this.getOffset(div2);
			// bottom right
			var x1 = off1.left + $("#myCanvas").width();
			var y1 = off1.top + off2.height/2 + div2Index*$("#optimage"+div2Index).height();
			// top right
			var x2 = off2.left;
			var y2 = off2.top + off1.height/2-($("#myCanvas").offset().top-$("#div1").offset().top);
			// distance
			var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
			// center
			var cx = ((x1 + x2) / 2) - (length / 2);
			var cy = ((y1 + y2) / 2) - (thickness / 2);
			// angle
			var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
			var left_margin = $("#div1").offset().left + $("#div1").width();
			this.htmlLine = "<div id='option_connector' style='padding:0px; height:" + thickness + "px; border-radius:5px; z-index:100; position:absolute; background-color:" + color + "; line-height:1px; margin-top: left:" + left_margin + "px; margin-top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
			document.getElementById("myCanvas").innerHTML += this.htmlLine;
		}
 
		getOffset(e1) {
			var rect1 = $("#"+e1+" img")[0] ;
			var rect = $("#"+e1+" img");
			console.log(rect1);
			var rectOffset = rect.offset();
			var canvasDiv = $("#myCanvas").offset();
			return {
				left: canvasDiv.left,
				top: 0,
				width: rect1.width || e1.offsetWidth,
				height: Math.ceil(parseInt(rect1.style.height)) || e1.offsetHeight
			};
		};
		
		resizeConnectorLine(flag){
			var elem = document.getElementById("option_connector");
			var newWidth = ($(".option_span").offset().left + ($(".option_span").width() - $(".opt_img").width()) - ($(".image_holder").offset().left + $(".image_holder").width()))
			$("#myCanvas").width(newWidth);
			document.getElementById("myCanvas").style["margin-left"] = $(".image_holder").width()+"px";
			if(elem && flag=="resize"){
				elem.parentNode.removeChild(elem);
				this.connect(this.quesDivId,this.ansDivIndex,this.color,this.thickness);
			}
			if(flag=="create"){
				if(elem){
					elem.parentNode.removeChild(elem);
				}
				this.connect(this.quesDivId,this.ansDivIndex,this.color,this.thickness);
			}
		}

		ngOnInit()	{
			window.onresize = (e) =>{
				//ngZone.run will help to run change detection
				this.ngZone.run(() => {
					console.log("Width: " + window.innerWidth);
					console.log("Height: " + window.innerHeight);
					
				});
				var abc = this;
				setTimeout(function(){
					abc.resizeConnectorLine("resize");
				},500);
			};
		}
		
		
		isPlaying() { return this.audio.paused; } 
		

}
