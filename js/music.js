var stopAudioOfMusicSection;
var onAudioFinished;
function onMusicDocumentLoad(){
}

function onMusicDocummentReady(){
	var albumHolderDiv = $($("#MusicDiv").find("#albumHolderDiv"));
	var hideVideoHolder = $("#hideVideoHolder");
	var jumpToCol = $($("#MusicDiv").find("#jumpToCol"));
	var coverWidth = 250;
	var coverHeight = 250;
	var topGap = 30;
	var coverTop = 50;
	var newAudioTop = 0;
	var scrollObj;
	function onXmlLoad(mainXml){
		var allSongObjeArray = new Array();
		var idSong = 0;
		mainXml = $(mainXml);
		var albumArray = mainXml.find("album");
		var albumLength = albumArray.length;
		
		function createAlbum(i){
			var audioContentHeight = 0;
			var infoHeight = 0;
			var infoXml = $(albumArray[i]);
			var songInfoArray = $(infoXml.find('songsInfo')).children('song');;
			var songLength = songInfoArray.length;
			var path = $(infoXml).children("path").text();
			var cover = $(infoXml).children("cover").text();
			var info = $(infoXml).children("info").text();
			var albumDiv =  $("#body").add("<div ></div>").appendTo(albumHolderDiv);
			albumDiv.css({'border':'solid 1px red', 'position':'absolute', 'top':newAudioTop+'px'});
			
			var title = $(infoXml).children("title").text();
			var titleDiv =  $("#body").add("<div >"+title+"</div>").appendTo(albumDiv);
			titleDiv.css({'font-family':'Patua One', 'font-size':'37px', 'letter-spacing':'0px', 'position':'absolute', 'width':'600px'});
			
			//----  C O V E R   I M A G E
			if(cover){
				var img =  $("#body").add("<img src='"+path+"/"+cover+"' width='"+coverWidth+"px', height='"+coverHeight+"px'></img>").appendTo(albumDiv);
				img.css({'position':'absolute', 'top':coverTop+'px'});
			}
			
			
			//----  A U D I O   C O N T E N T 
			var audioContent =  $("#body").add("<div></div>").appendTo(albumDiv);
			var infoDiv =  $("#body").add("<div>"+info+"</div>").appendTo(audioContent);
			if(cover){
				audioContent.css({'position':'absolute', 'top':coverTop+'px', 'left':(coverWidth+10)+'px'});
				infoDiv.css({'width':'305px', 'font-family':'Gudea', 'font-size':'15px'});
			}else{
				audioContent.css({'position':'absolute', 'top':coverTop+'px', 'left':0+'px'});
				infoDiv.css({'width':'555px', 'font-family':'Gudea', 'font-size':'15px'});
			}
			
			function addAdioInfo(j){
				var songObj = new Object();
				songObj.idSong = idSong;
				idSong++;
				
				var songInfo = $(songInfoArray[j]);
				var name = songInfo.children('name').text();
				var lyrics = songInfo.children('lyrics');
				var video = songInfo.children('video');
				var download = songInfo.children('download');
				var audio = songInfo.children('audio');
				var youtubeAudio = audio.text();
				songObj.audio = youtubeAudio;
				
				
			}
			for(var j = 0; j<songLength; j++){
				addAdioInfo(j);
			}
			
			
			audioContentHeight = audioContent.height();
			
			if(audioContentHeight>coverHeight){
				newAudioTop += (audioContentHeight+coverTop+topGap);
			}else{
				newAudioTop += (coverHeight+coverTop+topGap);
			}
			//alert(i+" infoXml = "+songLength);
		}
		for(var i = 0; i<albumLength; i++){
			createAlbum(i);
		}
		//
		stopAudioOfMusicSection = function(){
			$(".musicPlayBtn").css({'display':'inline'});
			$(".musicPauseBtn").css({'display':'none'});
			ytAudioPlayer.stopVideo();
		}
		
		
		function MainWindowResize(){
			var WindowWidth=Window.width();
			var WindowHeight=Window.height();
			var MaskHeight = WindowHeight/2+200;
			scrollObj = SetDragScrollFun({ReferDiv:$("#MusicDiv"), MaskHeight:MaskHeight, ScrollDivHeight:newAudioTop, WheelDiv:$("#MusicDiv")});
		}
		Window.resize(MainWindowResize);
		MainWindowResize();
		
		
		//----- jump To
		jumpToCol.bind("click", onJumpToCol);
		jumpToCol.css({'cursor':'pointer'});
		function onJumpToCol(){
			scrollObj.MoveDragerToBottom();
		}
		
		
		
	}
	$.ajax({type: "GET", url: "xml/music.xml", dataType: "xml", success:onXmlLoad});
	
}


$(window).load(onMusicDocumentLoad);
$(document).ready(onMusicDocummentReady);