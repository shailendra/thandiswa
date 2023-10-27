function onDownDocumentLoad(){
}

function onDownDocummentReady(){
	var thumbHolder = $($("#downloadHolder").find(".thumbHolder"));
	var thumbWidth = 57;
	var thumbHeight = 78;
	var gap = 65;
	
	
	function onXmlLoad(mainXml){
		mainXml = $(mainXml);
		var downArray = mainXml.find("img");
		var downLength = downArray.length;
		
		function createAlbum(i){
			var infoXml = $(downArray[i]);
			var thumb = $(infoXml).children("thumb").text();
			var bigImg = $(infoXml).children("bigImg").text();
			var downDiv =  $("#body").add("<div></div>").appendTo(thumbHolder);
			downDiv.css({'position':'absolute', 'left':(gap*i)+'px'});
			
			
			//----  Thumb Frame
			var loaderDiv =  $("#body").add("<div'></div>").appendTo(downDiv);
			loaderDiv.css({'position':'absolute', 'top':'0px', 'left':'0px', 'width':thumbWidth+'px', 'height':thumbHeight+'px', 'overflow':'hidden'});
			var imgThumb =  $("#body").add("<img src='"+thumb+"'></img>").appendTo(loaderDiv);
			
			
			//----  Thumb Frame
			var frameImg =  $("#body").add("<img src='images/donwload-thumb.png'></img>").appendTo(downDiv);
			frameImg.css({'position':'absolute', 'top':'0px', 'left':'0px', 'cursor':'pointer'});
			
			
			
			
			frameImg.bind("click", onDownClick);
			function onDownClick(){
				window.open(bigImg);
			}
		}
		for(var i = 0; i<downLength; i++){
			createAlbum(i);
		}
		
	}
	$.ajax({type: "GET", url: "xml/download.xml", dataType: "xml", success:onXmlLoad});
	
}


$(window).load(onDownDocumentLoad);
$(document).ready(onDownDocummentReady);