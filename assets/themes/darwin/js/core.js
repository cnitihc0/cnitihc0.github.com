$(document).ready(function(){
	$(document).bind("keydown",keypressed); 
	//$(document).bind("keyup",keyreleased); 
	menuExpanded = false;
	ctrlTimer = false;
	
	$("#arrowUp").click(function() { 
		$("#menuContent").stop().scrollTo('-=200px', {duration: 200});
	});
	$("#arrowDown").click(function() { 
		$("#menuContent").stop().scrollTo('+=200px', {duration: 200});
	});
	
	$("#arrowUp").hover(
		function () {
			$("#arrowUp img").attr("src","/assets/themes/darwin/images/arrowUp.jpg")
		}, 
		function () {
			$("#arrowUp img").attr("src","/assets/themes/darwin/images/arrowUp.jpg")
		}
	);
	
	$("#arrowDown").hover(
		function () {
			$("#arrowDown img").attr("src","/assets/themes/darwin/images/arrowDown.jpg")
		}, 
		function () {
			$("#arrowDown img").attr("src","/assets/themes/darwin/images/arrowDown.jpg")
		}
	);
	
	$("#block").bind("mousedown", function(event){
		//only open the menu on click if it's not anywhere on the #menu
		var clickedOnMenu = false;
		
		ancestorarray = $(event.target).parents();
		ancestorarray.push($(event.target));
		
		for ( var i=0, len=ancestorarray.length; i<len; ++i ){
			if ($(ancestorarray[i]).attr("id") == "menu") {
				clickedOnMenu = true;
				break;
			}
		}	
		
		//if (clickedOnMenu != true) {
	//		closeMenu();
	//	}
    });
    
	//animate All Posts
    $("#b_allposts").animate({opacity: "1"},2000).animate({opacity: "0.1"},400).animate({opacity: "1"},400).animate({opacity: "0.1"},400).animate({opacity: "1"},400);
	
	//animate Ads only once per session
	if (getCookie('animatedads') != 'true') {
    	$(".adbox").animate({opacity: "1"},5000).animate({opacity: "0.1"},400).animate({opacity: "1"},400).animate({opacity: "0.1"},400).animate({opacity: "1"},400);
    	setCookie('animatedads','true');
    }	
    
    
    if (typeof sectionCurrent != 'undefined') {
    	//hide pagenavi
    	if((sectionCurrent != "b_tools") && (sectionCurrent != "b_samples") && (sectionCurrent != "b_temp") && (sectionCurrent != "b_insp")) {
    		$(".wp-pagenavi").remove();
    	}
    	
    	//turn on nav
    	currentstate = $("#" + sectionCurrent).attr("src");
			newstate = currentstate.replace("_off","_over");
			$("#" + sectionCurrent).attr("src",newstate);
    }
	
	
	//possibly open the menu if it was left opened & scroll to the selected item
	//if (getCookie('openedMenu') == 'true') {
	//	openMenu();
	//};


	//force open the menu on larger screens:
	if($(window).width() > 1000) {
		openMenu();
	}

});



function rollOver(what) {
	currentstate = $(what).children().attr("src");
	newstate = currentstate.replace("_off","_over");
	$(what).children().attr("src",newstate);
}

function rollOut(what) {
	currentstate = $(what).children().attr("src");
	newstate = currentstate.replace("_over","_off");
	
	 if (typeof sectionCurrent != 'undefined') {
	 	if (sectionCurrent != $(what).children().attr("id")) {
	 		$(what).children().attr("src",newstate);
		}
	}
	else {
		$(what).children().attr("src",newstate);
	}
	
}



function keypressed(event) {
	//whichkey is set to the keycode number
	if (event.keyCode != 0) { whichkey = event.keyCode;}
	if (event.which != 0) { whichkey = event.which;}
	
	//alert(whichkey);
	
	//ctrl
	//if (whichkey == "17") {
	//	window.setTimeout('ctrlTimer = false', 1000);
	//	if(ctrlTimer == true) {
	//		openMenu();
	//	}
	//	else if((menuExpanded == false) && ($("#sb-container").css("display") == "none") && (document.activeElement.tagName != "INPUT") && (document.activeElement.tagName != "TEXTAREA")) {
	//		openMenu();
	//	}
	//	else {
	//		 closeMenu();
	//	}
		
	//	ctrlTimer = true;
	//}
	
	//esc
	if (whichkey == "27") {
		if(menuExpanded == true) {
			 closeMenu();
		}
	}
	
}

function openMenu() {
	$("#menu").css("z-index","1000000");
	//$("#menu").stop().animate({opacity :"1"},{duration:150, complete: menuExpanded = true});
	$("#menu").stop().animate({opacity :"1"},10).fadeIn(50, function(){menuExpanded = true; $("#menuContent").scrollTo($('.menuSel'), 1); });
	setCookie('openedMenu','true');
	
}

function closeMenu() {
	if(menuExpanded != false) {
		//$("#menu").stop().animate({opacity :"0"},{duration: 150, complete: function() {$("#menu").css("z-index","1");menuExpanded = false;}});
		$("#menu").stop().fadeOut(50, function(){menuExpanded = false;});
		setCookie('openedMenu','false');
	}
}


function keyreleased(event) {
	//whichkey is set to the keycode number
	if (event.keyCode != 0) { whichkey = event.keyCode;}
	if (event.which != 0) { whichkey = event.which;}
	
	//ctrl released
	//if (whichkey == "17") {
	//	$("#menu").stop().animate({opacity :"0"},"150");
	//}
}


function setCookie(name, value) {
  var curCookie = name + "=" + escape(value) + ";path=/";
  document.cookie = curCookie;
  //alert('damn 23');
}


function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}
