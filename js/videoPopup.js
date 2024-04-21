function showVideoPopup(obj){
	var OrgImgW = 600;
	var OrgImgH = 450;
	var whiteGap = 30;
	var topWhiteExtra = 25;
	var ExtraFromImg = 20;
	var YouTubeURL=String(obj.youtubeId);
	var title =String(obj.title);
	
	var videoPopHolder = $("#videoPopHolder");
	var blackPatch = videoPopHolder.find(".blackPatch");
	var whitePatch = videoPopHolder.find(".whitePatch");
	var youtubeHolder = videoPopHolder.find(".youtubeHolder");
	var titleDiv = videoPopHolder.find(".titleDiv");
	var closeImg = videoPopHolder.find(".closeImg");
	var preloader = videoPopHolder.find(".preloader");
	
	
	
	var TempMaxW=(OrgImgW+whiteGap+ExtraFromImg)>WindowWidth?(WindowWidth-whiteGap):(OrgImgW);
	var TempMaxH=(OrgImgH+ExtraFromImg+whiteGap+topWhiteExtra)>WindowHeight?(WindowHeight-whiteGap-topWhiteExtra):(OrgImgH);
	TempMaxW-=ExtraFromImg;
	TempMaxH-=ExtraFromImg
	//
	var WHObj=CalPer(OrgImgW, OrgImgH, TempMaxW, TempMaxH);
	
	//PopImgMaskDiv.css({overflow:'visible'});
	var NewElementCode='<div class="PopImgLoaderTag" style="position:absolute; left:'+(-WHObj.width/2)+'px; top:'+(-WHObj.height/2+topWhiteExtra/2)+'px; height:'+WHObj.height+'px; width:'+WHObj.width+'px"><object style="position:absolute; height:'+WHObj.height+'px; width:'+WHObj.width+'px"><param name="movie"  value="https://www.youtube.com/v/'+YouTubeURL+'?version=3&feature=player_embedded"> <param name="allowFullScreen" value="true"> <param name="allowScriptAccess" value="always"> <embed src="https://www.youtube.com/v/'+YouTubeURL+'?version=3&feature=player_embedded" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="'+WHObj.width+'" height="'+WHObj.height+'"></object></div>';
	//var PopImgLoaderTag=$("#body").add(NewElementCode);
	
	
	
	//---  W H I T E   P A T C H  C S S
	var whiteWidth = WHObj.width+whiteGap/2;
	var whiteHeight = WHObj.height+topWhiteExtra+whiteGap/2;
	whitePatch.css({'width':whiteWidth+'px', 'height':whiteHeight+'px', 'left':-whiteWidth/2+'px','top':-whiteHeight/2+'px'});
	
	//---  T I T L E   O N   W H I T E   P A T C H 
 	titleDiv.text(title);
	titleDiv.css({'left':-whiteWidth/2+5+'px','top':-whiteHeight/2+3+'px', 'font-family':'Gudea', 'font-size':'18px', 'font-weight':'bold', 'color':'#fffc00'});
	
	//---  C L O S E   B U T T T O N   S E T I N G  
	closeImg.css({'left':whiteWidth/2-33+'px','top':-whiteHeight/2+'px', 'cursor':'pointer'});
	closeImg.bind("click", onClose);
	function onClose(){
		youtubeHolder.empty();
		videoPopHolder.css({'display':'none'});
		Window.unbind("resize", onResize);
	}
	
	
	var PopImgLoaderTag=$("#body").add(NewElementCode).appendTo(youtubeHolder);
	
	videoPopHolder.css({'display':'inline'});
	
	
	Window.bind("resize", onResize);
	$(window).scroll(onResize);
	function onResize(){
		var left = Math.abs($("html").position().left);
		var top = Math.abs($("html").position().top);
		WindowWidth=Window.width();
		WindowHeight=Window.height();
		videoPopHolder.css({'left':left+WindowWidth/2+'px','top':top+WindowHeight/2+'px'});
		blackPatch.css({'width':WindowWidth+'px', 'height':WindowHeight+'px', 'left':-WindowWidth/2+'px','top':-WindowHeight/2+'px'});
	}
	onResize();
	
}