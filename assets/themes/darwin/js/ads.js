$(document).ready(function(){
	$(".ad, .ad2").hover(
		function () {
			$(this).find(".adOver").stop().animate({opacity: 1}, 300 );

		}, 
		function () {
			$(this).find(".adOver").stop().animate({opacity: 0}, 300 );
		}
	);

});


