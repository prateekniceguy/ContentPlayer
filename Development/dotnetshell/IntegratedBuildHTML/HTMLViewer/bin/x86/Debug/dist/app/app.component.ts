import 'rxjs/add/operator/pairwise';
import {Component , OnInit ,NgZone ,Input} from '@angular/core';
import { ROUTER_DIRECTIVES ,Router} from '@angular/router';
import {Http, HTTP_PROVIDERS} from '@angular/http'
import {SharedService} from './shared.service';
@Component({
selector: 'app-root',
 template:
  `
<div class="callbtn" style="position: absolute; z-index:2;">
  <button class="btn btn-info" (click)="show($event)">Object1</button>
  <button class="btn btn-success btnclicked openbtn" [ngStyle]="addStyle()" (click)="open(eventrjson)">Open </button>
</div>


  <div class="outer-outlet">
    <router-outlet></router-outlet>
  </div>
  `,
  providers: [
         HTTP_PROVIDERS
     ],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent{
   eventrjson:string= "{\"homePath\": \"home\",\"forwardEnabled\": true,\"playerPreview\": false,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/content1/\"},{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/tempeleven/\"},{\"startAt\": 19,\"segmentId\": 130,\"file\": \"http://localhost:8080/content01/\"},{\"startAt\": 12,\"segmentId\": 128,\"file\": \"http://localhost:8080/content00/\"},{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/content11d1act4/\"},{\"startAt\": 0,\"segmentId\": 140,\"file\": \"http://localhost:8080/content0/\"},{\"startAt\": 0,\"segmentId\": 199,\"file\": \"http://localhost:8080/content1d2act1/\"},{\"startAt\": 19,\"segmentId\": 146,\"file\": \"http://localhost:8080/content9/\"},{\"startAt\": 19,\"segmentId\": 147,\"file\": \"http://localhost:8080/content09/\"},{\"startAt\": 19,\"segmentId\": 146,\"file\": \"http://localhost:8080/contentact4/\"},{\"startAt\": 19,\"segmentId\": 147,\"file\": \"http://localhost:8080/contentact5/\"},{\"startAt\": 19,\"segmentId\": 146,\"file\": \"http://localhost:8080/contentact6/\"},{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/content11d3act2/\"},{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/content11d3act3/\"},{\"startAt\": 0,\"segmentId\": 140,\"file\": \"http://localhost:8080/content00_1/\"},{\"startAt\": 12,\"segmentId\": 128,\"file\": \"http://localhost:8080/content00_2/\"}]}";
 				
 // eventrjson:string= "{\"homePath\": \"home\",\"forwardEnabled\": false,\"playerPreview\": true,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 0,\"segmentId\": 140,\"file\": \"http://localhost:8080/content8/\"}]}";

 addStyle(){

	 let styles = {
		 'margin-left':'700px'
	 };
	 return styles;
 }

  constructor(private zone:NgZone, private router: Router, private _sharedService: SharedService,private _http: Http) {
    this.router.events.pairwise().subscribe((e) => {
        //console.log(e);
    });

if((window as any).angularComponentRef) {
                  (window as any).angularComponentRef= { show:(value)  => this.show(value)};

                  } else {
                                (window as any).angularComponentRef = {
                                                zone: this.zone,
                                                show: (value) => this.show(value),
                                                component: this
                                  };
                  }
if((window as any).angularComponentRef) {
                  (window as any).angularComponentRef= { open:(value)  => this.open(value)};

                  } else {
                                (window as any).angularComponentRef = {
                                                zone: this.zone,
                                                open: (value) => this.open(value),
                                                component: this
                                  };
                  }
  console.log('reference added');
}

        show(event) {
           this.zone.run(() => {
            console.log('calledFromOutside object 1 ');
               alert("Hi from object1 ");
           });
        }



		/*play(event) {

			alert("play button pressed");


		}

		pause(event) {
			alert("pause button pressed");

		}

		segmentChanged(event) {
			alert("segment changed to");
			alert(counter);
		}*/



        open(eventr) {

			console.log("app component eventr",eventr);
        var event=JSON.parse(eventr);
		console.log("app component event",event);
         this.zone.run(() => {
          console.log('calledFromOutside object 2 ',this._sharedService.files);

          if(event != null && event.homePath) {

            //event.files
           //this._sharedService.structure_load(event);
           //this._sharedService.structure_load();
			this._sharedService.newjson.files1=event.files;
			this._sharedService.newjson.homePath=event.homePath;
			this._sharedService.newjson.playerPreview=event.playerPreview;
			this._sharedService.newjson.forwardEnabled=event.forwardEnabled;
			this._sharedService.newjson.sessionId=event.sessionId;
			//this._sharedService.files=event.files;
			this._sharedService.structure_load();

					  }


          else {
            //this.files

            //this._sharedService.structure_load(this);
              this._sharedService.structure_load();

            //for (let entry of this.files) {
            //console.log(entry.file);
            //this._sharedService.insertRoute(entry.file);
          //  console.log('Data sent',this._sharedService.routesArray);
              // this.router.navigate([this._sharedService.routesArray[0]]);
        //  }

      }

         });
      }


}
