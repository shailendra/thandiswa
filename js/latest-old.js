
function onLatestDocumentLoad(){
	
	
}
var numNewsLength;
function twitterCallback2(twitters) {
  var statusHTML = [];
  for (var i=0; i<2-numNewsLength; i++){
    var username = twitters[i].user.screen_name;
    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
    });
    
    if(i+numNewsLength>=1){
	    statusHTML.push('<p class="twitterClass">&ldquo;'+String(status).toUpperCase()+'&rdquo;<small><br/>'+String(relative_time(twitters[i].created_at)).toUpperCase()+'</small></p>');
    }else{
	    statusHTML.push('<p class="twitterClass">&ldquo;'+String(status).toUpperCase()+'&rdquo;<small><br/>'+String(relative_time(twitters[i].created_at)).toUpperCase()+'</small></p><hr/>');
    }
    
  }
 
  
	$("#body").add($(statusHTML.join(''))).appendTo($(".latestNewDiv"));
  
  //document.getElementById('latest_tweet').innerHTML = statusHTML.join('');
}

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if(delta < 120) {
    return 'about a minute ago';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if(delta < (120*60)) {
    return 'about an hour ago';
  } else if(delta < (24*60*60)) {
    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400)).toString() + ' days ago';
  }
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
			$.getScript('https://api.twitter.com/1/statuses/user_timeline/thandiswamazwai.json?callback=twitterCallback2&count=5');
		}else if(numNewsLength==0){
			$.getScript('https://api.twitter.com/1/statuses/user_timeline/thandiswamazwai.json?callback=twitterCallback2&count=5');
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