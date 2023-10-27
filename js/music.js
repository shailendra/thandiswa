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
				var songDiv =  $("#body").add("<div></div>").appendTo(audioContent);
				songDiv.css({'height':'15px', 'margin-top':'5px', 'width':'400px'});
				if(youtubeAudio==""){
					var nameDiv =  $("#body").add("<div>"+name+"</div>").appendTo(songDiv);
					var noPlayBtn =  $("#body").add("<img class='noPlayBtn' src='images/noplay.gif'></img>").appendTo(songDiv);
					noPlayBtn.css({'position':'absolute', 'margin-top':'0px'});
					nameDiv.css({'position':'absolute', 'left':'25px', 'font-family':'Gudea', 'font-size':'15px', 'font-weight':'bold'});
				}else{
					var nameDiv =  $("#body").add("<a>"+name+"</a>").appendTo(songDiv);
					var pauseBtn =  $("#body").add("<img class='musicPauseBtn' src='images/pauseBtn.gif'></img>").appendTo(songDiv);
					var playBtn =  $("#body").add("<img class='musicPlayBtn' src='images/playBtn.gif'></img>").appendTo(songDiv);
					playBtn.css({'position':'absolute', 'cursor':'pointer', 'margin-top':'0px'});
					pauseBtn.css({'position':'absolute', 'cursor':'pointer', 'margin-top':'0px', 'display':'none'});
					nameDiv.css({'position':'absolute', 'left':'25px', 'font-family':'Gudea', 'font-size':'15px', 'font-weight':'bold', 'cursor':'pointer'});
					playBtn.bind("click", onPlayBtnClick);
					nameDiv.bind("click", onPlayBtnClick);
					pauseBtn.bind("click", onPauseBtnClick);
				}
				
				
				
				
				var newLeft = 150;
				
				//if(true){
					//alert(lyrics.text());
				if(lyrics.find("url").text()!=""){
					var lyricDiv =  $("#body").add("<div>Lyrics</div>").appendTo(songDiv);
					lyricDiv.css({'position':'absolute', 'left':newLeft+'px', 'font-family':'Gudea', 'font-size':'15px', 'color':'#000000'});
					if(lyrics.text()!=""){
						lyricDiv.bind("click", onLyricClick);
						lyricDiv.css({'cursor':'pointer'});
					}
					newLeft+=47;
				}
				
				//if(true){
				if(video.text()!=""){
					var videoDiv =  $("#body").add("<div>Video</div>").appendTo(songDiv);
					videoDiv.css({'position':'absolute', 'left':newLeft+'px', 'font-family':'Gudea', 'font-size':'15px', 'color':'#000000'});
					if(video.text()!=""){
						videoDiv.bind("click", onVideoClick);
						videoDiv.css({'cursor':'pointer'});
					}
					newLeft+=47;
				}
				if(download.text()!=""){
					var downloadDiv =  $("#body").add("<div>Download</div>").appendTo(songDiv);
					downloadDiv.css({'position':'absolute', 'left':newLeft+'px', 'font-family':'Gudea', 'font-size':'15px', 'color':'#000000', 'cursor':'pointer'});
					downloadDiv.bind("click", onDownloadClick);
				}
				songObj.onPlayBtnClick = onPlayBtnClick;
				function onPlayBtnClick(){
					//alert(audio.text());
					stopAudioOfMusicSection();
					if(isSmartPhoneAndTablate){
						var obj = new Object();
						obj.youtubeId = youtubeAudio;
						obj.title = $(video).find("title").text();
						showVideoPopup(obj);
						return;
					}
					
					
					var width = 250;
					var height = 250;
					var left = -1000;
					var top = -1000;
					//var left = 0;
					//var top = -0;
					//var NewElementCode='<object style="position:absolute; height:'+height+'px; width:'+width+'px"><param name="movie"  value="http://www.youtube.com/v/'+youtubeAudio+'?version=3&feature=player_embedded&autoplay=1"> <param name="allowFullScreen" value="true"> <param name="allowScriptAccess" value="always"> <embed src="http://www.youtube.com/v/'+youtubeAudio+'?version=3&feature=player_embedded&autoplay=1" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="'+width+'" height="'+height+'"></object>';
					//var hideVideoHolderNode=$("#body").add(NewElementCode).appendTo($(hideVideoHolder)); 
					//hideVideoHolder.css({'position':'fixed', 'left':left+'px', 'top':top+'px' });
					ytAudioPlayer.loadVideoById(youtubeAudio);
					function autoPlayNextSong(id){
						id++;
						id = id%allSongObjeArray.length;
						var songObj = allSongObjeArray[id];
						//alert("audio = "+songObj.audio + " = "+id);
						if(songObj.audio=="" || songObj.audio == undefined || songObj.audio == "undefined"){
							autoPlayNextSong(id);
							return;
						}
						allSongObjeArray[id].onPlayBtnClick();
					}
					onAudioFinished = function(){
						//alert("next");
						autoPlayNextSong(songObj.idSong);
					}
					//
					playBtn.css({'display':'none'});
					pauseBtn.css({'display':'inline'});
					//PopImgLoaderTag.hide();
				}
				function onPauseBtnClick(){
					stopAudioOfMusicSection();
				}
				
				function onVideoClick(){
					stopAudioOfMusicSection();
					var obj = new Object();
					obj.youtubeId = $(video).find("url").text();
					obj.title = $(video).find("title").text();
					showVideoPopup(obj);
				}
				function onLyricClick(){
					//stopAudioOfMusicSection();
					showLyricPopup(lyrics, path);
				}
				function onDownloadClick(){
					var url = path+"/"+download.text();
					window.open(url,"_blank")
				}
				
				allSongObjeArray.push(songObj);
				
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