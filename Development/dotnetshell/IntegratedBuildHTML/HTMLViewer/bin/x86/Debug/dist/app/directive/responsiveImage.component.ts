import { Component ,Directive, OnInit , ElementRef, HostListener, Input, Output, NgZone} from '@angular/core';
import { WindowRef } from './WindowRef';
import { Router } from '@angular/router';

/*@Directive({
  selector: '[responsiveImg]',

});*/

@Component({
selector: 'imgres',
template: 
				'<img src="{{imagsrc}}" [style.width.px]= "imgWidth" [style.height.px] = "imgHeight" alt=""/>'
				
					
})


export class ResponsiveImageComponent {
@Input('responsiveImg') option: any;
@Input('useSingleimage') imgFlag: boolean;

constructor(private el: ElementRef, private zone: NgZone, private winref: WindowRef,private router: Router) {
	console.log("winref.nativeWindow zize in const");
	console.log(winref.nativeWindow.screen);
  }
	
	imagsrc:any;
	
	@Input('width') imgWidth:any;
	
	@Input('height') imgHeight:any;
	//currentUrl:any;
	
common(){
	console.log("in directive:",this.option);
	if(this.winref.nativeWindow.innerWidth > 0 && this.winref.nativeWindow.innerWidth < 1024) {
				   var source=this.option;
				   var extsource=this.option;
				   var ext= extsource.slice(-4);
				   var str1=source.slice(0, -7) + '-1s' + ext;
				   console.log("str1", str1);
				   this.option=str1;
				   this.imagsrc = this.option;
	} else if(this.winref.nativeWindow.innerWidth >= 1024 && this.winref.nativeWindow.innerWidth < 1525) {
				   var source=this.option;
				   var extsource=this.option;
				   var ext= extsource.slice(-4);
				   var str1=source.slice(0, -7) + '-2s' + ext;
				   console.log("str1", str1);
				   this.option=str1;
				   this.imagsrc = this.option;
	} else {
				   var source=this.option;
				   var extsource=this.option;
				   var ext= extsource.slice(-4);
				   var str1=source.slice(0, -7) + '-3s'+ ext;
				   console.log("str1", str1);
				   this.option=str1;
				   this.imagsrc = this.option;
	}
	  var abc = this;
			 
			  const mql: MediaQueryList = this.winref.nativeWindow.matchMedia('(min-width: 0px) and  (max-width: 1023px) ');
			  const mql1: MediaQueryList = this.winref.nativeWindow.matchMedia('(min-width: 1024px) and (max-width: 1524px) ');
			  const mql2: MediaQueryList = this.winref.nativeWindow.matchMedia('(min-width: 1525px) and (max-width: 1920px)');
				
			   mql.addListener((mql1: MediaQueryList) => {
				this.zone.run(() => {
					if(abc.winref.nativeWindow.innerWidth>0 && abc.winref.nativeWindow.innerWidth<=1023 ){
		
				   var source=abc.option;
				   var extsource=abc.option;
				   var ext= extsource.slice(-4);
				   var str1=source.slice(0, -7) + '-1s' + ext;
				   console.log("str1", str1);
				   abc.option=str1;
				   abc.imagsrc = abc.option;
					}
			});

		  });

			  mql1.addListener((mql1: MediaQueryList) => {
				this.zone.run(() => {
				if(abc.winref.nativeWindow.innerWidth>=1024 && abc.winref.nativeWindow.innerWidth<=1524){
				   //console.log("changing", abc.option.imgsrc);
				   var source=abc.option;
				   var extsource=abc.option;
				   var ext= extsource.slice(-4);
				   var str1=source.slice(0, -7) + '-2s' + ext;
				   console.log("str1", str1);
				   abc.option=str1;
				    abc.imagsrc = abc.option;
					}
			});

		  });
				mql2.addListener((mql2: MediaQueryList) => {
				this.zone.run(() => {
				   if(abc.winref.nativeWindow.innerWidth>=1525){
				   var source=abc.option;
				   var extsource=abc.option;
				   var ext= extsource.slice(-4);
				   var str1=source.slice(0, -7) + '-3s'+ ext;
				   console.log("str1", str1);
				   abc.option=str1;
				    abc.imagsrc = abc.option;
				   }
				});
			  });
}  

	singleImgstretch(){
		console.log("in stretch:",this.option);
		this.imagsrc = this.option;
		var actWidth,actHeight;
		
		//get the actual height and width
			/*var elem = document.getElementById("imageHolder")
			var actWidth = elem.offsetParent.clientWidth;
			var actHeight = elem.offsetParent.clientHeight;*/
			/*if(this.currentUrl && this.currentUrl==this.router.url){
				
			}else{*/
				/*this.currentUrl = this.router.url;*/
				actWidth = this.imgWidth;
				actHeight = this.imgHeight;
			/*}*/
			
			console.log("client width = "+actWidth);
			console.log("client height = "+actHeight);
			//console.log("normal = "+document.getElementById("imageHolder"));
			
		if(this.winref.nativeWindow.innerWidth > 0 && this.winref.nativeWindow.innerWidth < 1024) {
			//set the width and height according to winref.nativeWindow sizeToContent
			var actWidthCopy = actWidth;
			this.imgWidth = actWidth*(800/1920);
			var widthRatio;
			if(this.imgWidth>550){
				   this.imgWidth = 550;
				   widthRatio = 550/actWidthCopy;
				   this.imgHeight = actHeight*widthRatio;
			 }else{
				  widthRatio = this.imgWidth/actWidthCopy;
				  this.imgHeight = actHeight*widthRatio;
			 }	
		} else if(this.winref.nativeWindow.innerWidth >= 1024 && this.winref.nativeWindow.innerWidth < 1525) {
			var actWidthCopy = actWidth;
			this.imgWidth = actWidth*(1024/1920);
			var widthRatio;
			this.imgHeight = actHeight*widthRatio;
			if(this.imgWidth>710){
				  this.imgWidth = 710;
				   widthRatio = 710/actWidthCopy;
				   this.imgHeight = actHeight*widthRatio;
			 }else{
				  widthRatio = this.imgWidth/actWidthCopy;
				  this.imgHeight = actHeight*widthRatio;
			 }
		} else {
			var actWidthCopy = actWidth;
			if(actWidth>1100){
				   this.imgWidth = 1100;
				   widthRatio = 1100/actWidthCopy;
				   this.imgHeight = actHeight*widthRatio;
			 }else{
				  this.imgWidth =  actWidth;
				  this.imgHeight = actHeight; 
		   }
					  
		}
		  var abc = this;
				 
				  const mql: MediaQueryList = this.winref.nativeWindow.matchMedia('(min-width: 0px) and  (max-width: 1023px) ');
				  const mql1: MediaQueryList = this.winref.nativeWindow.matchMedia('(min-width: 1024px) and (max-width: 1524px) ');
				  const mql2: MediaQueryList = this.winref.nativeWindow.matchMedia('(min-width: 1525px) and (max-width: 1920px)');
					
				   mql.addListener((mql1: MediaQueryList) => {
					this.zone.run(() => {
						if(abc.winref.nativeWindow.innerWidth>0 && abc.winref.nativeWindow.innerWidth<=1023 ){
							var actWidthCopy = actWidth;
							abc.imgWidth = actWidth*(800/1920);
							var widthRatio;
							if(abc.imgWidth>550){
								  abc.imgWidth = 550;
								   widthRatio = 550/actWidthCopy;
								   abc.imgHeight = actHeight*widthRatio;
							 }else{
								 widthRatio = abc.imgWidth/actWidthCopy;
								 abc.imgHeight = actHeight*widthRatio; 
							 }
						}
				});

			  });

				  mql1.addListener((mql1: MediaQueryList) => {
					this.zone.run(() => {
					if(abc.winref.nativeWindow.innerWidth>=1024 && abc.winref.nativeWindow.innerWidth<=1524){
						var actWidthCopy = actWidth;
						var widthRatio;
						abc.imgWidth = actWidth*(1024/1920);
						//abc.imgHeight = actHeight*widthRatio;
						if(abc.imgWidth>710){
							 abc.imgWidth = 710;
						     widthRatio = 710/actWidthCopy;
						     abc.imgHeight = actHeight*widthRatio;
						 }else{
							 widthRatio = abc.imgWidth/actWidthCopy;
							 abc.imgHeight = actHeight*widthRatio;
						 }
						}
				});

			  });
			  
				  mql2.addListener((mql2: MediaQueryList) => {
					this.zone.run(() => {
					   if(abc.winref.nativeWindow.innerWidth<=1920){
						   var widthRatio;
						   if(actWidth>1100){
							  abc.imgWidth = 1100;
							   widthRatio = 1100/actWidthCopy;
							   abc.imgHeight = actHeight*widthRatio;
						   }else{
							  abc.imgWidth =  actWidth;
							  abc.imgHeight = actHeight; 
						   }
					   }
					});
				  });
	} 
	  // ngOnInit (){
	  ngOnChanges (){
		    /*this.winref.nativeWindow.onresize = (e) =>{
				console.log(this.winref.nativeWindow.innerHeight);
				console.log(this.winref.nativeWindow.innerWidth);
							this.zone.run(() => {
								console.log("zone run");
								this.dimensionCalculator();
							});
						};
						console.log("testtttttttttttttttt");
						console.log(this.imgWidth);
						
						console.log(this.imgHeight);*/
		  this.dimensionCalculator();
     }
	 
	 
	 dimensionCalculator(){
		  var abc = this;
		  if(abc.imgFlag){
				  setTimeout(function(){
				  abc.singleImgstretch();
			  },100); 
			   
		  }else{
			  this.common(); 
		  }
	 }
	  
	
    }




/**
  @HostListener('winref.nativeWindow:resize', ['$event'])  onResize(event) {

this.foo( event )
  }



 this.resolutions =["800x600","1024x768","1920x1080"];
public foo( event:any ){


  console.log('dadasdsadasdsad----->',event.target.innerWidth )

  var abc = this;
   var resolution;
   var winref.nativeWindowWidth = event.target.innerWidth;

   //if valid URL
   this.resolutions.forEach(function(item){


    if(abc.option.imgsrc.indexOf(item)>-1){
         resolution =  item;
       }
    });

  //then replace according to width
  if(resolution){

    if(winref.nativeWindowWidth<=800) {

    this.option.imgsrc = this.option.imgsrc.replace(resolution, this.resolutions[0]);

    }
    else if(800<winref.nativeWindowWidth && winref.nativeWindowWidth<=1024){

    this.option.imgsrc = this.option.imgsrc.replace(resolution, this.resolutions[1]);
    }
    else if(winref.nativeWindowWidth > 1024){
    this.option.imgsrc = this.option.imgsrc.replace(resolution, this.resolutions[2]);
    }

    console.log('changed to', this.option.imgsrc);
  }


}*/
