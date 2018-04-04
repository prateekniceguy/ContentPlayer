import { Component , OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';
import 'jquery';
declare var $: any;

@Component({
    selector: 'my-activitydup',
    template: require('./activitydup.component.html'),
    styles: [require('./activitydup.component.css')]

})

export class ActivitydupComponent implements OnInit{
constructor(private router: Router,
      private route: ActivatedRoute,private _sharedService: SharedService) {}


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
        if( this.currentIdx < (this.optionslist.length-1)) {
              this.currentIdx++;
              this.myoption = this.optionslist[this.currentIdx];
              this.myoption_duplicate = this.optionslist_duplicate[this.currentIdx];    }
       }

     id: number;
      styles = {};
      isaudio = false;
      audio =new Audio();

      selected(option) {
		  if(option.correct1 == true){
			   this._sharedService.scoreData(10);
               console.log('Data sent of score',this._sharedService.Activity_Score);
		  }
		  else{
			  this._sharedService.scoreData(0);
			  console.log('Data sent of score',this._sharedService.Activity_Score);
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

          var audio = new Audio();
          audio.src = this.myoption_duplicate[0].path;
          if(this.myoption_duplicate[0].path =="null" && this._sharedService.navigatetoroute.type== 1){
            this._sharedService.activityfinished();
          }
          audio.load();
          audio.play();

      }



	ngOnInit() {

  this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
       console.log(this.id)
  });




  }

}
