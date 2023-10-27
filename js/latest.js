
function onLatestDocumentLoad(){
	
	
}
var numNewsLength;
function initialiseTweeter(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)){js=d.createElement(s);
	js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
	fjs.parentNode.insertBefore(js,fjs);
	}
};
function loadTweeter(count) {
  var htmlTex = '<a class="twitter-timeline" width="300" height="250" data-show-replies="false" data-list-slug="platform-products" data-theme="light" data-chrome="nofooter noheader noscrollbar transparent" data-border-color="#d1d1d1" data-tweet-limit="'+count+'" data-screen-name="thandiswamazwai" href="https://twitter.com/thandiswamazwai" data-widget-id="360809524447297536"> </a>'
	$(".latestNewDiv").append(htmlTex);
	initialiseTweeter(document,"script","twitter-wjs");
  
}
function onLatestDocummentReady(){
	var latestNewDiv = $(".latestNewDiv")
	var latestNewHolder = $("#latestNewHolder")
	
	function onXmlLoad(mainXml){
		mainXml = $(mainXml);
		var newsArray = mainXml.find("news");
		numNewsLength = newsArray.length;
		
		function showNews(i){
			//alert(numNewsLength);
			//alert($(newsArray[id]).find("text").text());
			//alert($(newsArray[id]).find("date").text());
			var infoObj = $(newsArray[i]);
			var text = infoObj.find("info").text();
			var url = infoObj.find("url").text();
			var image = infoObj.find("image").text();
			
			var newsDiv =  $("#body").add("<div ></div>").appendTo(latestNewDiv);
			var newsDivA =  $("#body").add("<a></a>").appendTo(newsDiv);
			
			newsDivA.text(text);
			
			if(image!=""){
				newsDivA.css({'cursor':'pointer'});
				newsDivA.bind('click', forImgClick);
				
			}else if(url!=""){
				newsDivA.css({'cursor':'pointer'});
				newsDivA.bind('click', forOpenUrl);
				
			}
			function forImgClick(){
				showImgInPopup(image);
				
			}
			function forOpenUrl(){
				window.open(url);
			}
			if(i==0){
				var Line =  $("#body").add("<hr/>").appendTo(latestNewDiv);
			}
		}
		for( var i=0; i<numNewsLength; i++){
			showNews(i);
		}
		
		if(numNewsLength==1){
			loadTweeter(1);
		}else if(numNewsLength==0){
			loadTweeter(2);
		}
	}
	$.ajax({type: "GET", url: "xml/latest.xml", dataType: "xml", success:onXmlLoad});
	
	var more = $($("#LatestDiv").find(".more"));
	more.css({'cursor':'pointer'});
	more.bind('click', onClickMore);
	function onClickMore(){
		window.open("http://twitter.com/#!/thandiswamazwai");
	}
	
	function showImgInPopup(imgUrl){
		var inWidth = 300;
		var inHeight = 400;
		var margin = 65;
		var bgDiv = latestNewHolder.find(".bgDiv");
		var blackDiv = latestNewHolder.find(".blackDiv");
		var imgHolder = latestNewHolder.find(".imgHolder");
		var closeBtn = latestNewHolder.find(".closeBtn");
		
		closeBtn.click(onClose);
		closeBtn.css({'cursor':'pointer'});
		function onClose(){
			imgHolder.empty();
			latestNewHolder.css({'display':'none'});
		}
		
		imgHolder.empty();
		blackDiv.css({'width':inWidth+'px', 'height':inHeight+'px', 'left':-inWidth/2+'px', 'top':-inHeight/2+'px'});
		bgDiv.css({'width':(inWidth+margin)+'px', 'height':(inHeight+margin)+'px', 'left':-(inWidth+margin)/2+'px', 'top':-(inHeight+margin)/2+'px'});
		latestNewHolder.css({'display':'inline'});
		imgHolder.css({'display':'none'});
		
		var imgLoader=$("#body").add("<img src='"+imgUrl+"'></img>").appendTo(imgHolder);
		imgLoader.bind("load", onLoad);
		function onLoad(){
			imgHolder.css({'display':'inline'});
			var width = imgLoader.width();
			var height = imgLoader.height();
			if((width+margin)>WindowWidth || (height+margin)>WindowHeight ){
				var obj = CalPer(width, height, (WindowWidth-margin), (WindowHeight-margin*2));
				width = obj.width;
				height = obj.height;
			}
			//
			blackDiv.css({'width':width+'px', 'height':height+'px', 'left':-width/2+'px', 'top':-height/2+'px'});
			imgHolder.css({'width':width+'px', 'height':height+'px', 'left':-width/2+'px', 'top':-height/2+'px'});
			imgLoader.css({'width':width+'px', 'height':height+'px'});
			bgDiv.css({'width':(width+margin)+'px', 'height':(height+margin)+'px', 'left':-(width+margin)/2+'px', 'top':-(height+margin)/2+'px'});
			
		}
		
	}
	
}


$(window).load(onLatestDocumentLoad);
$(document).ready(onLatestDocummentReady);