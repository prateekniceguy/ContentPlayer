import { Component , OnInit ,HostListener ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {SharedService} from '../shared.service';

import 'jquery';


declare var $: any;

@Component({
    selector: 'tempsix',
    template: require('./templatesix.component.html'),
    styles: [require('./templatesix.component.css')]

})

export class TemplatesixComponent implements OnInit{
constructor(private router: Router,
      private route: ActivatedRoute,private _sharedService: SharedService) {
		  	console.log("coming json",this._sharedService.navigatetoroute.main);
	  }
		show(){
			alert("hiiiiiiii");
		}
		

		pause(){
			let elements: NodeListOf<Element> = document.getElementsByClassName("fallingLeaves");
			let classes: DOMTokenList = elements[0].classList;
			classes.toggle("fallingLeavespause");
		  
		}
	

		pauseone(){
			let elements: NodeListOf<Element> = document.getElementsByClassName("fallingLeavesone");
			console.log("hiii pauseone",elements);
			let classes: DOMTokenList = elements[0].classList;
			
			classes.toggle("fallingLeavespause");
			console.log("hiii pauseone classes",classes);
		  
		}


		pausetwo(){
			let elements: NodeListOf<Element> = document.getElementsByClassName("fallingLeavestwo");
			let classes: DOMTokenList = elements[0].classList;
			classes.toggle("fallingLeavespause");
			let changeImage=document.getElementById("two") as HTMLImageElement
			changeImage.src="assets/images/smile2.jpg";
		    
		}
		ngOnInit() {

		console.log("hi init:");
	}

}
