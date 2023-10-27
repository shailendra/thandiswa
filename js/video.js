function onVideoDocumentLoad(){
}

function onVideoDocummentReady(){
	var videoHolderDiv = $($("#VideoDiv").find("#videoHolderDiv"));
	var thumbWidth = 130;
	var thumbHeight = 71;
	var topGap = 13;
	var newVideoTop = 0;
	function onXmlLoad(mainXml){
		mainXml = $(mainXml);
		var videoArray = mainXml.find("video");
		var videoLength = videoArray.length;
		
		function createAlbum(i){
			var infoXml = $(videoArray[i]);
			var youtubUrl = $(infoXml).children("url").text();
			var title = $(infoXml).children("title").text();
			var info = $(infoXml).children("info").text();
			var videoDiv =  $("#body").add("<div class='videoId"+i+"' ></div>").appendTo(videoHolderDiv);
			videoDiv.css({'border':'solid 1px red', 'position':'absolute', 'top':newVideoTop+'px'});
			
			//----  T H U M B   I M A G E
			var img =  $("#body").add("<img src='http://img.youtube.com/vi/"+youtubUrl+"/1.jpg' width='"+thumbWidth+"px', height='"+thumbHeight+"px'></img>").appendTo(videoDiv);
			img.css({'position':'absolute', 'top':'0px', 'left':'0px', 'cursor':'pointer'});
			
			
			//----  V I D E O   C O N T E N T 
			var videoContent =  $("#body").add("<div></div>").appendTo(videoDiv);
			videoContent.css({'position':'absolute', 'top':'0px', 'left':(thumbWidth+10)+'px'});
			var titleDiv =  $("#body").add("<a>"+title+"</a>").appendTo(videoContent);
			titleDiv.css({'width':'305px', 'font-family':'Gudea', 'font-weight':'bold', 'font-size':'15px', 'cursor':'pointer'});
			var infoDiv =  $("#body").add("<div>"+info+"</div>").appendTo(videoContent);
			infoDiv.css({'width':'305px', 'font-family':'Gudea', 'font-size':'15px'});
			
			img.bind("click", onVideoClick);
			titleDiv.bind("click", onVideoClick);
			titleDiv.bind("mouseover", onOver);
			titleDiv.bind("mouseout", onOut);
			function onOver(){
				$($("#VideoDiv").find(".videoId"+i)).css({'text-decoration':'underline'});
				//alert($("#VideoDiv").find(".videoId"+i).attr("class"))
			}
			function onOut(){
				$($("#VideoDiv").find(".videoId"+i)).css({'text-decoration':'none'});
			}
			function onVideoClick(){
				stopAudioOfMusicSection();
				var obj = new Object();
				obj.youtubeId = youtubUrl;
				obj.title = title;
				showVideoPopup(obj);
			}
			
			videoContentHeight = videoContent.height();
			
			if(videoContentHeight>thumbHeight){
				newVideoTop += (videoContentHeight+topGap);
			}else{
				newVideoTop += (thumbHeight+topGap);
			}
		}
		for(var i = 0; i<videoLength; i++){
			createAlbum(i);
		}
		SetDragScrollFun({ReferDiv:$("#VideoDiv"), MaskHeight:225, ScrollDivHeight:newVideoTop, WheelDiv:$("#VideoDiv")});
		
		
	}
	$.ajax({type: "GET", url: "xml/video.xml", dataType: "xml", success:onXmlLoad});
	
}


$(window).load(onVideoDocumentLoad);
$(document).ready(onVideoDocummentReady);