// JavaScript Document

var PUBLIC,APP,ROOT;
var ie = $.browser.msie && $.browser.version <= 8.0,
ie6 = $.browser.msie && $.browser.version == 6.0;
function ClearContent(txt)
{
txt.value="";
}
function EnterPress(e){ 
  var e = e || window.event; 
   if(e.keyCode == 13){ 
   document.getElementById("button").click(); 
  } 
} 
//search
$('a').bind("focus", function(){
    $(this).blur();
})
//dashline

var aniHeight = $(".milestone-list").height();
console.log(aniHeight)
var aniNum = 0;
$(".milestone-list-down").mousedown(function(){
setM = setInterval(mouseD,1);
})
$(".milestone-list-down").mouseup(function(){
	clearInterval(setM);
})
$(".milestone-list-up").mousedown(function(){
setW = setInterval(mouseU,1);
})
$(".milestone-list-up").mouseup(function(){
	clearInterval(setW);
})
var mouseD = function(){
	if(aniNum > aniHeight - 200){return}
   $(".milestone-list").animate({top:-aniNum},0)
	aniNum++
}
var mouseU = function(){
	if(aniNum <= 1){return}
   $(".milestone-list").animate({top:-aniNum},0)
   aniNum--
}

$(".content-nav").find("li").mouseenter(function(){
	$(this).addClass("content-nav-at").siblings().removeClass("content-nav-at")
	var cnlindex = $(this).index();
	$(".content-sub-nav").eq(cnlindex).addClass("content-sub-nav-at").siblings().removeClass("content-sub-nav-at")
})
$(".content-sub-nav").find("a").mouseenter(function(){
	$(this).addClass("red").siblings().removeClass("red")
})

$(".nav").find("li").hover(function(){
	$(this).find(".menu-nav").slideDown(150)	
},function(){
	$(this).find(".menu-nav").slideUp(150)	
})

$("#content").css("margin-top",$(".sub-nav").height()+15)
$(".lx").css("margin-top","1px")


	$(function(){
		var d = document;
		//杩斿洖椤堕儴鎸夐挳鏄剧ず
		var scrollTimer;
		window.onscroll = function(){
			if($(d).scrollTop() >=300){
				$('#backTop').stop().animate({opacity:1},300);
			}else{
				$('#backTop').stop().animate({opacity:0},300);
			}
		};
		
		//缁戝畾鏀惧洖椤堕儴浜嬩欢
		$('#backTop').click(function(){
			$('html, body').animate({scrollTop:0}, 400);
		}).mouseover(function(){$('#hover').stop().animate({opacity:1},500)})
		.mouseout(function(){$('#hover').stop().animate({opacity:0},500)})
	})
	