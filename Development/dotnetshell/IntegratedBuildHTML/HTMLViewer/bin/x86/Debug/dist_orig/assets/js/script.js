$(function(){
	var defaultPath;
	var className;

	$(".content span img")
    .mouseover(function () {

		defaultPath = $(this).attr("src").slice(0, -5);
		$(this).attr("src", defaultPath+"1.png");
    })
    .mouseout(function () {

		defaultPath = $(this).attr("src").slice(0, -5);
		$(this).attr("src", defaultPath+"0.png");

    });


	$(".options-block span .opt-img,.options-block span .option")
    .click(function () {
		confirmIt = $(this).parent().parent().hasClass("correct");
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
});
