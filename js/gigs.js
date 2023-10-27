function onGigsDocumentLoad(){
}

function onGigsDocummentReady(){
	var gigsHolderDiv = $($("#GigsDiv").find("#gigsHolderDiv"));
	gigsHolderDiv.css({'width':'300px', 'height':'auto'});
	function onXmlLoad(mainXml){
		mainXml = $(mainXml);
		var gigsArray = mainXml.find("gigs");
		var gigsLength = gigsArray.length;
		var newTop = 0;
		var i = 0;
		function createButton(){
			var infoXml = $(gigsArray[i]);
			var url = infoXml.children("url").text();
			var title = infoXml.children("title").text();
			var date = infoXml.children("date").text();
			var info = infoXml.children("info").text();
			
			//var gigsDiv =  $("#body").add("<div></div>").appendTo(gigsHolderDiv);
			//gigsDiv.css({'position':'absolute', 'top':newTop+'px', 'left':'0px', 'cursor':'pointer'});
			var topMargin;
			if(i==0){
				topMargin = 0;	
			}else{
				topMargin = 7;	
			}
			
			if(date!=""){
				var dateDiv =  $("#body").add("<div>"+date+"</div>").appendTo(gigsHolderDiv);
				dateDiv.css({'left':'0px', 'white-space':'nowrap', 'font-family':'Gudea', 'font-size':'14px', 'margin-top':topMargin+'px'});
				topMargin = 0;
			}
			if(url!=""){
				var titleDiv =  $("#body").add("<div><a>"+title+"</a></div>").appendTo(gigsHolderDiv);
			}else{
				var titleDiv =  $("#body").add("<div>"+title+"</div>").appendTo(gigsHolderDiv);
			}
			titleDiv.css({'white-space':'normal', 'font-family':'Gudea', 'font-size':'14px', 'font-weight':'bold', 'TEXT-DECORATION':'underline', 'margin-top':topMargin+'px'});
			
			if(info!=""){
				var infoDiv =  $("#body").add("<div>"+info+"</div>").appendTo(gigsHolderDiv);
				infoDiv.css({'left':'0px', 'white-space':'normal', 'font-family':'Gudea', 'font-size':'14px'});
			}
			
			
			if(url!=""){
				titleDiv.bind("click", onGigsClick);
				titleDiv.css({'cursor':'pointer'});
			}
			function onGigsClick(){
				window.open(url);
			}
			
			i++;
			if(i>=gigsLength){
				var newTop = gigsHolderDiv.height();
				clearInterval(newid);
				if(newTop>120){
					SetDragScrollFun({ReferDiv:$("#GigsDiv").find(".ContentDiv"), MaskHeight:100, WheelDiv:$("#GigsDiv")});
					$("#GigsDiv").find(".ScrollPatchDiv").css({'display':'inline'});
				}
				
			}
			
		}
		var newid = setInterval(createButton, 500);
		
		
	}
	$.ajax({type: "GET", url: "xml/gigs.xml", dataType: "xml", success:onXmlLoad});
	
}


$(window).load(onGigsDocumentLoad);
$(document).ready(onGigsDocummentReady);