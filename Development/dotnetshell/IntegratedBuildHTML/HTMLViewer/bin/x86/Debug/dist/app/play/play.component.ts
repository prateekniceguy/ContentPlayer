import { Component , OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';
import 'jquery';
declare var $: any;

@Component({
    selector: 'my-play',
    template: require('./play.component.html'),
    styles: [require('./play.component.css')]

})

export class PlayComponent implements OnInit{
  id: number;
  e:any;
  constructor(private router: Router,
      private route: ActivatedRoute,private _sharedService: SharedService) {}

      toggleCheck(idbutton){
		if (idbutton == 2){
  this._sharedService.scoreData(1);
  console.log('Data sent',this._sharedService.Activity_Score);
		}
		else {
  this._sharedService.scoreData(0);
  console.log('Data sent',this._sharedService.Activity_Score);
		}
	}


	ngOnInit() {
  this.e = new Date();
  this._sharedService.Segment_Start_Time_Activity=this.e.getTime();
  console.log('Data sent@@@@@@@',this._sharedService.Segment_Start_Time_Activity);

  this.router.events.subscribe((e) => {
    var previousroute =this._sharedService.service_variable;
  if(previousroute != "") {
    this._sharedService.Segment_End_Time_Activity=new Date().getTime();
  }
      this._sharedService.service_variable = e.url;
  });


  this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
       console.log(this.id)
  });
  	var defaultPath;
  	var className;


  	$(".options-block span .opt-img,.options-block span .option")
      .click(function () {
  		var confirmIt = $(this).parent().parent().hasClass("correct");

  		$(".tick_true,.tick_false").hide();
  		if(confirmIt)
  		{
  			$(this).closest(".options-block span").children(".tick_true").show();
  		}
  		else{
  			$(this).closest(".options-block span").children(".tick_false").show();
  		}
      });


  	$(document.body).fadeIn(500,subject);
  	function quest(){

  	};
  	function subject(){

  		$(".subject-img img").animate({width: '105%'}, "fast").animate({width: '102%'}, "fast", options);
  	};
  	function options(){
  		$(".opt-ans").fadeTo(700,1);
  	};


  }

}
