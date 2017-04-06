// JavaScript Document
/*! Copyright (c) 2014 Chiukingho.*/

var homePage;

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
	    homePage = function(){
			var $this = this;
			$this.banner();
			$this.scrollFunction();
			$this.tab();
			if (ie6) functions.ieCompatibleFuction();
	    }
		$.extend({
			author: function() {
				return "chiukingho"
			},
			direction: function() {
				return "none"
			}
		}); 
		$.addClass = function(elem, newClass){
			if(!elem) 
				return false;
			else if(!elem.className) {
				elem.className = newClass;
				return false; 
			}
			else {
				var ownClass = elem.className.split(" "), had = false;
				for(var i = 0; i < ownClass.length; i++){
					if(ownClass[i] === newClass){
						had = true;
						break;
					}
				}
				if(!had){
					elem.className += " " + newClass;
				}
				return had;
			}
		};
		$.removeClass = function(elem, oneClass){
			if(!elem || !elem.className) return false;
			var ownClass = elem.className.split(" "),
				had = false;
			for(var i = 0; i < ownClass.length; i++){
				if(ownClass[i] === oneClass){
					ownClass.splice(i, 1);
					had = true;
					break;
				}
			}
			if(had){
				elem.className = "";
				if(ownClass.length < 1){
					return had;
				}else if(ownClass.length == 1){
					elem.className = ownClass[0];
				}else if(ownClass.length >1){
					for(var i = 0; i < ownClass.length; i++){
						if(i == ownClass.length - 1){
							elem.className += ownClass[i];
						}else{
							elem.className += ownClass[i] + " ";
						}
					}
				}
			}	
			return had;	
		};
		
		$.addEvent = function(elem, eventName, handler){
			if(elem){
				if(elem.addEventListener){
					return elem.addEventListener(eventName, handler, false);
				}else if(elem.attachEvent){
					return elem.attachEvent("on" + eventName, handler);
				}else {
					elem["on" + eventName] = handler;
				}
			}
		};
		
		$.removeEvent = function(elem, eventName, handler){
			if(elem){
				if(elem.removeEventListener){
					return elem.removeEventListener(eventName, handler, false);
				}else if(elem.detachEvent){
					return elem.detachEvent("on" + eventName, handler);
				}else {
					elem["on" + eventName] = null;
				}
			}	
		};
		
		$.getEvent = function(event){
			return event ? event : window.event;
		};
		
		$.getTarget = function(event){
			return event.target || event.srcElement;
		};
		
		$.getRelatedTarget = function(event){
			return event.relatedTarget || event.toElement || event.fromElement || null;
		};
		
		$.contains = function(parent, cur){
			while(cur.parentNode){
				if(cur.parentNode === parent){
					return true;
				}
				cur = cur.parentNode;
			}
			return false;
		};
		
		$.preventDefault = function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		};
		
		$.stopPropagation = function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancleBubble = true;
			}
		};
		
		$.get_pos = function(elem){
			if(!elem) return false;
			var left = elem.offsetLeft,
				top = elem.offsetTop,
				current = elem.offsetParent;
			while(current !== null){
				left += current.offsetLeft;
				top += current.offsetTop;
				current = current.offsetParent;
			}
			return {"left": left, "top": top};
		};
		
		$.get_dir = function(elem, mouse_pos){
			if(!elem) return false;
			var pos = $.get_pos(elem),
				size = {"width": elem.offsetWidth, "height": elem.offsetHeight},
				dx = mouse_pos.x - pos.left - size.width/2,
				dy = (mouse_pos.y - pos.top - size.height/2)*-1,
				eve_tan = dy/dx,
				tan = size.height/size.width;
			if(dx != 0){
				if(eve_tan > tan*-1 && eve_tan < tan && dx < 0){
					return "left";
				}else if(eve_tan > tan*-1 && eve_tan < tan && dx > 0){
					return "right";
				}else if((eve_tan > tan || eve_tan < tan*-1) && dy > 0){
					return "top";
				}else if((eve_tan > tan || eve_tan < tan*-1) && dy <= 0){
					return "bottom";
				}
			}else if(dy > 0){
				return "top";
			}else {
				return "bottom";
			}
		};
		
		function params(o){ //将要传给后台的参数转化为字符串，以加入到url中
			var arr = [];
			for(var i in o){
				arr.push(i + "=" + encodeURIComponent(o[i]));
			}
			return arr.join("&");
		}
		
		$.ajaxp = function(args){ //创建script节点，向后台请求js，src节点携带我的参数信息
			var script = document.createElement("script");
			script.type="text/javascript";
			script.src = args.url + "?" + params(args.params);
			document.body.appendChild(script);
			var time = setTimeout(args.params.callback + "()", 6000); //设置超时时间，觉得不妥可以更改
			script.onload = function(){
				clearTimeout(time);
			};
		};
		
		$.show_tips = function(words, timeout) {
			var tips = $('.tips')[0] || (function() {
				var tips = document.createElement('div');
				tips.className = 'tips animated';
				return document.body.insertBefore(tips, document.body.firstChild);
			})();
			tips.innerHTML = words;
			$.removeClass(tips, 'hide');
			$.addClass(tips, 'show');
			setTimeout($.hide_tips, timeout + 1000);
		};
		
		$.hide_tips = function() {
			var tips = $('.tips')[0];
			$.removeClass(tips, 'show');
			$.addClass(tips, 'hide');
			setTimeout('$.removeClass($(".tips")[0], "hide")', 1000);
		};
	    homePage.prototype = {
		banner  :  function() {
		var Focus,banner,bannerImg,li,windowWidth,windowHeigth,html,footer;
			footer = $("#index-footer"),html = $('html,body'),Focus = $('.focus'),
			banner = $(".banner,.banner ul li a img"),bannerImg =  $(".banner ul li a img"),
			bannerDesc = $('#banner').find(".desc"),li = $('.banner .carousel ul li'),
			windowWidth = $(window).width(),windowHeigth = $(window).height();
			li.eq(0).css({"opacity":"1","z-index":999999});
			var n = li.length;
			for (var i = 0; i < n; i++) 
			Focus.append("<a href='javascript:;' class='focus" + i + "'></a>");
			Focus.find("a").eq(0).addClass("on");
			var b = 5000,iNum = 0,fadeSpeed = 500,delayTime = 0;
			Focus.find("a").bind('click',function() {
			var a = Focus.find("a").index(this);
			Focus.find("a").removeClass('on');
			$(this).addClass('on');
			li.animate({opacity: 0,zIndex:-1},{duration: fadeSpeed,queue: false})
			li.eq(a).animate({opacity: 1,zIndex:1},{duration: fadeSpeed})
			iNum = a;
			bannerDesc.animate({opacity: 0,zIndex:-1},{duration: fadeSpeed,queue: false});
			bannerDesc.eq(iNum).animate({opacity: 1,zIndex:999999},{duration: fadeSpeed,queue: false})
		})
		 var c = function() {
			iNum++;
			if (iNum == li.length) iNum = 0
			Focus.find("a").removeClass('on');
			Focus.find("a").eq(iNum).addClass('on');
			li.animate({opacity: 0,zIndex:-1},{duration: fadeSpeed,queue: false});
			li.eq(iNum).animate({opacity: 1,zIndex:1},{duration: fadeSpeed,queue: false});
			bannerDesc.animate({opacity: 0,zIndex:-1},{duration: fadeSpeed,queue: false});
			bannerDesc.eq(iNum).animate({opacity: 1,zIndex:999999},{duration: fadeSpeed,queue: false})
		};
		function delayBanner() {
			var d = setInterval(c, b);
			Focus.find("a").hover(function() {
				clearInterval(d)
			},
			function() {
				d = setInterval(c, b)
			});
		}
		setTimeout(delayBanner, delayTime);
		var e = function() {
			iNum++;
			if (iNum == li.length) iNum = 0
			Focus.find("a").removeClass('on');
			Focus.find("a").eq(iNum).addClass('on');
			li.animate({opacity: 0,zIndex:-1},{duration: fadeSpeed,queue: false});
			li.eq(iNum).animate({opacity: 1,zIndex:1},{duration: fadeSpeed,queue: false});
			bannerDesc.animate({opacity: 0,zIndex:-1},{duration: fadeSpeed,queue: false});
			bannerDesc.eq(iNum).animate({opacity: 1,zIndex:999999},{duration: fadeSpeed,queue: false})
		};
		$("#banner .next").click(e);
		var f = function() {
			iNum--;
			if (iNum == li.length) iNum = 0
			Focus.find("a").removeClass('on');
			Focus.find("a").eq(iNum).addClass('on');
			li.animate({opacity: 0,zIndex:-1},{duration: fadeSpeed,queue: false});
			li.eq(iNum).animate({opacity: 1,zIndex:1},{duration: fadeSpeed,queue: false});
			bannerDesc.animate({opacity: 0,zIndex:-1},{duration: fadeSpeed,queue: false});
			bannerDesc.eq(iNum).animate({opacity: 1,zIndex:999999},{duration: fadeSpeed,queue: false})
		};
		$("#banner .prev").click(f);
			bannerDesc.eq(0).css({"opacity":"1","z-index":1});
			
		$(".menu-nav").find("ul").hover(function(){
		$(".nav-banner").show();
				
		},function(){
				$(".nav-banner").fadeOut();
		})
		
		$(".menu-nav").find("li").hover(function(){
				$(".nav-banner").find("li").eq($(this).index()).addClass("nav-banner-show")
		},function(){
				$(".nav-banner").find("li").eq($(this).index()).removeClass()
		})
		},
		
		scrollFunction : function(){
			var next_page = 2;
			var already_rquery = '';
			$(window).bind("scroll",function(){
				if(next_page != 0 && (already_rquery != next_page)){
					if( $(window).scrollTop() + $(window).height() > $(window).height() - 460 ){
						already_rquery = next_page;
						$.ajax({
							type: "post",
							url: window.location.href,
							data: {ajax:1,paged:next_page,cat_slug:""},
							beforeSend: function(XMLHttpRequest){
								$(".loading").show();
								//ShowLoading();
							},
							success: function(data, textStatus){
								if(data.li != ''){
									$(".product-list").append(data.li);
								}
								next_page = data.next_page;
							},
							complete: function(XMLHttpRequest, textStatus){
								$(".loading").hide();
								//HideLoading();
							},
							error: function(){
								//请求出错处理
							},
							dataType:"json"
						});
					}
				}
				if($(window).scrollTop() > $("#content").offset().top) {
					$(".content-menu").css({
						"opacity":"1",
						"visibility":"visible"	
					})
				} 
				if($(window).scrollTop() < $("#content").offset().top || $(window).scrollTop() > $("#footer").offset().top - $(".content-menu").height() - 100 ) {
					$(".content-menu").css({
						"opacity":"0"	
					})
				}
			});
		},
		tab : function(){
			/*var bgCode = [];
			$(".back-face").each(function(){
				for(var l = 0;l < 3; l++) {
						bgCode[l] = Math.floor(Math.random() * 255);
				}
				$(this).attr("style","background-color: rgb("+bgCode[0]+","+bgCode[1]+","+bgCode[2]+")")
			})*/
			var hover_dir = {
				wrapper: $(".major-list")[0],
				box: $(".major-item"),
				target: $(".back-face"),
				bindEvent: function(){
					var mouse_pos, x, y, stop_bubble;
					for(var i = 0; i < hover_dir.box.length; i++){
						(function(n){
							$.addEvent(hover_dir.box[n], "mouseover", function(event){
								event = $.getEvent(event);
								var relatedT = $.getRelatedTarget(event);
								if(!$.contains(hover_dir.box[n], relatedT)){
									var child = hover_dir.box[n].childNodes[0];
									$.stopPropagation(event);
									$.removeClass(hover_dir.target[n], "to-left") ||
									$.removeClass(hover_dir.target[n], "to-right") ||
									$.removeClass(hover_dir.target[n], "to-top") ||
									$.removeClass(hover_dir.target[n], "to-bottom");
									x = event.pageX;
									y = event.pageY;
									mouse_pos = {"x": x, "y": y};
									var dir = $.get_dir(hover_dir.box[n], mouse_pos);
									switch(dir){
										case "left": 
											$.addClass(hover_dir.target[n], "from-left");
											break;
										case "right": 
											$.addClass(hover_dir.target[n], "from-right");
											break;
										case "top": 
											$.addClass(hover_dir.target[n], "from-top");
											break;
										case "bottom":
											$.addClass(hover_dir.target[n], "from-bottom");
											break;
										default: break;
									}
								}
							});
							$.addEvent(hover_dir.box[n], "mouseout", function(event){
								event = $.getEvent(event);
								var relatedT = $.getRelatedTarget(event);
								if(!$.contains(hover_dir.box[n], relatedT)){
									$.removeClass(hover_dir.target[n], "from-left") ||
									$.removeClass(hover_dir.target[n], "from-right") ||
									$.removeClass(hover_dir.target[n], "from-top") ||
									$.removeClass(hover_dir.target[n], "from-bottom");
									x = event.pageX;
									y = event.pageY;
									mouse_pos = {"x": x, "y": y};
									var dir = $.get_dir(hover_dir.box[n], mouse_pos);
									switch(dir){
										case "left": 
											$.addClass(hover_dir.target[n], "to-left");
											break;
										case "right": 
											$.addClass(hover_dir.target[n], "to-right");
											break;
										case "top": 
											$.addClass(hover_dir.target[n], "to-top");
											break;
										case "bottom":
											$.addClass(hover_dir.target[n], "to-bottom");
											break;
										default: break;
									}
								}	
							});
						})(i);
					}},
				init: function(){
					hover_dir.bindEvent();
				}
			};
			hover_dir.init();
			$(".tab-radio label:last").css("margin-right","0")
			$(".tab-radio").find("label").eq(0).click(function(){
				if($(this).hasClass("tab-radio-at")) {
					$(".tab-radio").find("label").addClass("tab-radio-at");
					$(".tab-radio").find("input").attr("checked","checked");
				}
			})
			$(".tab-radio").find("label").not(":first").click(function(){
				if(!$(this).hasClass("tab-radio-at")) {
					$(".tab-radio").find("label").eq(0).removeClass("tab-radio-at");
					$(".tab-radio").find("label").eq(0).find("input").removeAttr("checked");
				}
			})
			$(".tab-radio").find("label").find("div").click(function(){
						$(this).parents("label").toggleClass("tab-radio-at")
			})
			
			var cll = $(".case-list").find("li");
			for( var clll = 0;clll <= cll.length; clll++) {
				if(clll % 4 == 1) $(".case-list").find("li").eq(clll+2).css("margin-right","0")
			}
		},
		ieCompatibleFuction : function(){
			alert("为了展现本站最佳效果，请升级您的浏览器。")
		}
	}
}));

$(function() {
    var functions = new homePage();
    $(".nav").find(".menu-nav").addClass("show");
}) 