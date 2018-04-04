$(function(){
	var defaultPath;
	var className;

	$(".content span img")
    .mouseover(function () {
        //$(this).attr("src", "images/thermos2.png");
		defaultPath = $(this).attr("src").slice(0, -5);
		$(this).attr("src", defaultPath+"1.png");
    })
    .mouseout(function () {
        //$(this).attr("src", "images/thermos1.png");
		defaultPath = $(this).attr("src").slice(0, -5);
		$(this).attr("src", defaultPath+"0.png");
		//alert(defaultPath+".png");
    });

	
	$(".imgBlock span .mainImg")
    .click(function () {
		confirmIt = $(this).parent().parent().hasClass("correct");
		if(confirmIt)
		{
			$(this).closest(".imgBlock span").children(".tick_true").show();
			$('.ans').fadeIn(500);
		}
		else{
			$(this).closest(".imgBlock span").children(".tick_false").show();
		}
    });


	$(document.body).fadeIn(1000,quest);
	function quest(){
		$(".question").fadeIn(300).animate({left: '16%'}).animate({left: '15%'}, "fast",questIcon);
	};
	function questIcon(){
		$(".q_icon").fadeIn(100);
		$(".q_icon img").animate({width: '100%'}, "fast").animate({width: '97%'}, "fast", contentImg);
	};
	function contentImg(){
		$(".content div").fadeIn(500);
	};
});