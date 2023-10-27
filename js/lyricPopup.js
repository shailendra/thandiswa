function showLyricPopup(obj, path){
	obj = $(obj);
	var OrgImgW = 550;
	var OrgImgH = 700;
	var whiteGap = 20;
	var topWhiteGap = 40;
	var sideBlackGap = 20;
	var Url=path+"/"+String(obj.find("url").text());
	var title =String(obj.find("title").text());
	
	var lyricPopHolder = $("#lyricPopHolder");
	var blackPatch = lyricPopHolder.find(".blackPatch");
	var whitePatch = lyricPopHolder.find(".whitePatch");
	var titleDiv = lyricPopHolder.find(".titleDiv");
	var closeImg = lyricPopHolder.find(".closeImg");
	var MaskDiv = lyricPopHolder.find(".MaskDiv");
	var ScrollPatchDiv = lyricPopHolder.find(".ScrollPatchDiv");
	var ScrollDiv = lyricPopHolder.find(".ScrollDiv");
	var preloader = lyricPopHolder.find(".preloader");
	
	var whiteWidth = (OrgImgW)>WindowWidth?(WindowWidth):(OrgImgW);
	var whiteHeight = (OrgImgH)>WindowHeight?(WindowHeight):(OrgImgH);
	whiteWidth-=(sideBlackGap*2);
	whiteHeight-=(sideBlackGap*2);
	
	var maskWidth = whiteWidth-20-40;
	var maskHeight = whiteHeight-70-15;
	var maskLeft = -whiteWidth/2+20;
	var maskTop = -whiteHeight/2+70;
	
	var scrollerLeft = whiteWidth/2-28;
	var scrollerTop = maskTop;
	//
	
	
	
	
	
	
	//---  W H I T E   P A T C H  C S S
	whitePatch.css({'width':whiteWidth+'px', 'height':whiteHeight+'px', 'left':-whiteWidth/2+'px','top':-whiteHeight/2+'px'});
	
	//---  T I T L E   O N   W H I T E   P A T C H 
 	titleDiv.text(title);
	titleDiv.css({'left':-whiteWidth/2+20+'px','top':-whiteHeight/2+30+'px', 'font-family':'Gudea', 'font-size':'18px', 'color':'#000000',  'font-weight':'bold'});
	
	//---  C L O S E   B U T T T O N   S E T I N G  
	closeImg.css({'left':whiteWidth/2-41+'px','top':-whiteHeight/2+19+'px', 'cursor':'pointer'});
	closeImg.bind("click", onClose);
	function onClose(){
		lyricPopHolder.css({'display':'none'});
		Window.unbind("resize", onResize);
		lyricPopHolder.unbind('mousewheel');
	}
	
	
	
	
	MaskDiv.css({'width':maskWidth+'px', 'height':maskHeight+'px', 'left':maskLeft+'px','top':maskTop+'px'});
	//, 'border':'2px solid #1c7c22'
	ScrollPatchDiv.css({'height':maskHeight+'px', 'left':scrollerLeft+'px','top':scrollerTop+'px'});
	
	
	lyricPopHolder.css({'display':'inline'});
	ScrollPatchDiv.css({'display':'none'});
	
	
	Window.bind("resize", onResize);
	$(window).scroll(onResize);
	function onResize(){
		var left = Math.abs($("html").position().left);
		var top = Math.abs($("html").position().top);
		WindowWidth=Window.width();
		WindowHeight=Window.height();
		lyricPopHolder.css({'left':left+WindowWidth/2+'px','top':top+WindowHeight/2+'px'});
		blackPatch.css({'width':WindowWidth+'px', 'height':WindowHeight+'px', 'left':(-WindowWidth/2)+'px','top':(-WindowHeight/2)+'px'});
	}
	onResize();
	
	
	
	ScrollDiv.empty();
	function onXmlLoad(lyricHtml){
		preloader.css({'display':'none'});
		ScrollDiv.html(lyricHtml);
		ScrollDiv.css({'top':'0px', 'font-family':'Gudea', 'font-size':'14px', 'color':'#000000'});
		if(ScrollDiv.height()>maskHeight){
			ScrollPatchDiv.css({'display':'inline'});
			SetDragScrollFun(lyricPopHolder);
			onResize();
		}
	}
	preloader.css({'display':'inline'});
	$.ajax({type: "GET", url: Url, dataType: "html", success:onXmlLoad});
}