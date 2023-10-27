function onPhotosDocumentLoad(){
}
function onPhotosDocummentReady(){
	function onXmlLoad(mainXml){
		mainXml = $(mainXml);
		var albumArray = mainXml.find("album");
		var albumLength = albumArray.length;
		
		var newTop = 0;
		var PhotosDiv = $("#PhotosDiv");
		var albumHolderDiv = $(PhotosDiv.find(".albumHolderDiv"));
		var upArrow = $(PhotosDiv.find(".upArrow"));
		var downArrow = $(PhotosDiv.find(".downArrow"));
		var photoLoaderDiv = $(PhotosDiv.find(".photoLoaderDiv"));
		var prevBtn = $(PhotosDiv.find(".prevBtn"));
		var nextBtn = $(PhotosDiv.find(".nextBtn"));
		var ContentDiv = $(PhotosDiv.find(".ContentDiv"));
		var captionDiv = $(ContentDiv.find(".captionDiv"));
		var blackPatchDiv = $(ContentDiv.find(".blackPatchDiv"));
		
		var scrollId = 0;
		var albumId;
		
		prevBtn.css({'cursor':'pointer'});
		nextBtn.css({'cursor':'pointer'});
		var i = 0;
		var lastAlbumDiv;
		function createAlbum(){
			var id = i;
			if(lastAlbumDiv){
				newTop += lastAlbumDiv.height()+5;
			}
			
			var infoXml = $(albumArray[i]);
			var title = infoXml.children("title").text()
			var albumDiv =  $("#body").add("<div class='albumId"+i+"' >"+title+"</div>").appendTo(albumHolderDiv);
			 
			albumDiv.css({'cursor':'pointer', 'position':'absolute', 'left':'0px', 'top':newTop+'px', 'font-family':'Patua One', 'letter-spacing':'0px',  'font-size':'15px', 'line-height':'17px', 'color':'#ffffff'});
			albumDiv.bind("click", onClick);
			albumDiv.bind("mouseover", onOver);
			albumDiv.bind("mouseout", onOut);
			function onClick(){
				loadAlbum(id);
				
			}
			function onOver(){
				changeToGreen(i);
			}
			function onOut(){
				changeToGreen(albumId);
			}
			lastAlbumDiv = albumDiv;
			i++;
			if(i>=albumLength){
				newTop += lastAlbumDiv.height()+5;
				clearInterval(newid);				
			}
			scrollToId();
		}
		createAlbum();
		var newid = setInterval(createAlbum, 200);
		/*for(var i = 0; i<albumLength; i++){
			createAlbum(i);
		}*/
		
		function changeToGreen(id){
			for(var i = 0; i<albumLength; i++){
				albumHolderDiv.find(".albumId"+i).css({'color':'#ffffff'});
			}
			albumHolderDiv.find(".albumId"+id).css({'color':'#0fb908'});
		}
		
		
		function loadAlbum(id){
			albumId = id;
			changeToGreen(albumId);
			setUpPhotoLoading(albumId);
		}
		function setUpPhotoLoading(albumId){
			
			var photoId = 0;
			var albumXml = $(albumArray[albumId]);
			var photoArray = albumXml.find("photos").find("photo");
			var photoLength = photoArray.length;
			var folder = albumXml.find("folder").text();
			prevBtn.unbind("click");
			nextBtn.unbind("click");
			prevBtn.bind("click", onPrevClick);
			nextBtn.bind("click", onNextClick);
			function onPrevClick(){
				photoId--;
				loadPhoto();
			}
			function onNextClick(){
				photoId++;
				loadPhoto();
			}
			function loadPhoto(){
				
				photoId = (photoId%photoLength+photoLength)%photoLength;
				
				photoLoaderDiv.empty();
				/*removeDiv = photoLoaderDiv.find("div");
				removeDiv.stop();
				removeDiv.animate({top:0, height:0},{duration:400, easing:'easeInOutCubic'});
				removeImg = photoLoaderDiv.find("img");
				removeImg.stop();
				removeImg.animate({top:-removeImg.height()/2},{duration:400, easing:'easeInOutCubic'});*/
				
				
				var photoXml = $(photoArray[photoId]);
				var caption = photoXml.find("caption").text();
				var imgUrl = photoXml.find("img").text();
				var imgPath = folder+"/"+imgUrl;
				
				
				captionDiv.text(caption);
				captionDiv.css({'position':'absolute', 'top':'4px', 'font-family':'Gudea', 'font-size':'15px', 'color':'#ffffff', 'white-space':'nowrap'});
				var captionWidth = captionDiv.width();
				captionDiv.css({'left':-captionWidth/2+'px'});
				captionWidth+=30;
				blackPatchDiv.css({'left':-captionWidth/2+'px', 'width':captionWidth+'px'});
				if(caption==""){
					blackPatchDiv.css({'display':'none'});
				}else{
					blackPatchDiv.css({'display':'inline'});
				}
				var imgDiv =  $("#body").add("<img src='"+imgPath+"' ></img>").appendTo(photoLoaderDiv);
				imgDiv.css({'position':'absolute', 'display':'none'});
				imgDiv.bind("load", OnImgLoad);
				function OnImgLoad(){
					var maxWidth = 420;
					var maxHeight = 310;
					var width = imgDiv.width();
					var height = imgDiv.height();
					var dimentionObj = CalPer(width, height, maxWidth, maxHeight);
					width = dimentionObj.width;
					height = dimentionObj.height;
					imgDiv.css({'position':'absolute', 'left':-width/2+'px', 'top':(-height/2)+'px', 'width':width+'px', 'height':height+'px', 'display':'inline'});
					
				}
			}
			loadPhoto();
		}
		
		
		
		
		upArrow.bind("click", onClickUpArrow);
		upArrow.css({'cursor':'pointer'});
		function onClickUpArrow(){
			scrollId--;
			scrollToId();
		}
		downArrow.bind("click", onClickDownArrow);
		downArrow.css({'cursor':'pointer'});
		function onClickDownArrow(){
			scrollId++;
			scrollToId();
		}
		function scrollToId(){
			if(scrollId<=0){
				scrollId = 0;
				upArrow.fadeTo('slow', 0.2);
			}else{
				upArrow.fadeTo('slow', 1);
			}
			
			
			if(scrollId>=albumLength-1){
				scrollId = albumLength-1;
			}else{
				
			}
			
			var albumDiv = $(albumHolderDiv.find(".albumId"+scrollId));
			var position = albumDiv.position();
			var top = position.top;
			albumHolderDiv.stop();
			albumHolderDiv.animate({top:-top+'px'},{duration:600, easing:'easeInOutCubic'});
			
			//alert(newTop);
			if((newTop-top)>138){
				downArrow.unbind("click");
				downArrow.bind("click", onClickDownArrow);
				downArrow.fadeTo('slow', 1);
			}else{
				downArrow.unbind("click");
				downArrow.fadeTo('slow', 0.2);
			}
			
		}
		scrollToId();
		loadAlbum(0);
		
		
		//alert("photos");
	}
	$.ajax({type: "GET", url: "xml/photos.xml", dataType: "xml", success:onXmlLoad});
}


$(window).load(onPhotosDocumentLoad);
$(document).ready(onPhotosDocummentReady);