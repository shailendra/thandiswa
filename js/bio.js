function onBioDocumentLoad(){
}

function onBioDocummentReady(){
	function onXmlLoad(lyricHtml){
		var contentDiv = $($("#BioDiv").find(".ContentDiv"));
		var bioContent = $(contentDiv.find("#bioContent"));
		bioContent.html(lyricHtml);
		bioContent.css({'font-family':'Gudea', 'font-size':'15px', 'color':'#000000'});
		
		
		var ScrollDiv = $(contentDiv.find(".ScrollDiv"));
		var MaskDiv = $(contentDiv.find(".MaskDiv"));
		//alert(ScrollDiv.height()+" , "+MaskDiv.height());
		if(ScrollDiv.height()>MaskDiv.height()-150){
			SetDragScrollFun({ReferDiv:contentDiv, MaskHeight:MaskDiv.height()-150, WheelDiv:$("#BioDiv")});
		}
	}
	$.ajax({type: "GET", url: "assest/bio/bio.html", dataType: "html", success:onXmlLoad});
}


$(window).load(onBioDocumentLoad);
$(document).ready(onBioDocummentReady);