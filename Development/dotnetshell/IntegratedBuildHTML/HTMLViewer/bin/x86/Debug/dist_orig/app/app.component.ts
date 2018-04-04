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
  <button class="btn btn-success btnclicked openbtn" (click)="open(eventrjson)">Open </button>
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
  eventrjson:string= "{\"homePath\": \"home\",\"forwardEnabled\": false,\"playerPreview\": false,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 5,\"segmentId\": 125,\"file\": \"http://localhost:8080/content1/\"},{\"startAt\": 0,\"segmentId\": 140,\"file\": \"http://localhost:8080/content00/\"},{\"startAt\": 12,\"segmentId\": 128,\"file\": \"http://localhost:8080/content0/\"},{\"startAt\": 40,\"segmentId\": 180,\"file\": \"http://localhost:8080/content8/\"},{\"startAt\": 19,\"segmentId\": 146,\"file\": \"http://localhost:8080/content9/\"},{\"startAt\": 19,\"segmentId\": 147,\"file\": \"http://localhost:8080/content09/\"},{\"startAt\": 0,\"segmentId\": 120,\"file\": \"http://localhost:8080/content7/\"},{\"startAt\": 0,\"segmentId\": 150,\"file\": \"http://localhost:8080/content7_dup/\"},{\"startAt\": 19,\"segmentId\": 130,\"file\": \"http://localhost:8080/content01/\"},{\"startAt\": 25,\"segmentId\": 132,\"file\": \"http://localhost:8080/content01_dup/\"},{\"startAt\": 2,\"segmentId\": 134,\"file\": \"http://localhost:8080/content03/\"},{\"startAt\": 9,\"segmentId\": 138,\"file\": \"http://localhost:8080/content03_dup/\"},{\"startAt\": 40,\"segmentId\": 188,\"file\": \"http://localhost:8080/content08/\"}]}";
 // eventrjson:string= "{\"homePath\": \"home\",\"forwardEnabled\": false,\"playerPreview\": true,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 0,\"segmentId\": 140,\"file\": \"http://localhost:8080/content8/\"}]}";

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
