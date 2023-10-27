function SetDragScrollFun(paramObj){
	var ScrollObj = new Object();
	var ReferDiv = $(paramObj.ReferDiv);
	var PatchDiv = ReferDiv.find('.ScrollPatchDiv');
	var MaskDiv = ReferDiv.find('.MaskDiv');
	var ScrollDiv = ReferDiv.find('.ScrollDiv');
	var DragBtn = ReferDiv.find('.DragBtn');
	
	var MaskHeight = paramObj.MaskHeight?paramObj.MaskHeight:MaskDiv.height();
	var ScrollDivHeight = paramObj.ScrollDivHeight?paramObj.ScrollDivHeight:ScrollDiv.height();
	var WheelDiv = paramObj.WheelDiv?paramObj.WheelDiv:ReferDiv;
	
	var ScrollArea = ScrollDivHeight-MaskHeight;
	var PatchHeight = PatchDiv.innerHeight();
	var DragBtnHeight = DragBtn.height();
	var DargArea = PatchHeight-DragBtnHeight
	var IntClickY;
	var IntDragY;
	var DragY=0;
	//
	DragBtn.css({'cursor':'pointer', 'top':'0px'});
	//
	$('.userAgent').html(navigator.userAgent);
	WheelDiv.bind('mousewheel',OnMouseWheel);
	function OnMouseWheel(event, delta) {
		var Val=DragY-(delta*6);
		ScrollByVal(Val)
	}
				
	function returnPagaY(E){
		var pageY;
		var event = E.originalEvent;
		if(String(event.targetTouches)=="undefined"){
			pageY = E.pageY;
		}else{
			pageY = event.targetTouches[0].pageY;
		}
		return pageY;
	}
	function OnUp(){
		$(document).unbind('mouseup touchend', OnUp);
		$(document).unbind('mousemove touchmove', OnMouseMove);
		$(document).removeClass('CusUnselectable');
		document.onselectstart=new Function ("return true")
	}
	function OnMouseMove(E){
		var pageY = returnPagaY(E);
		var Val=pageY-IntMouseY+IntDragY;
		ScrollByVal(Val);
		E.preventDefault(); 
	}
	function ScrollByVal(Val){
		DragY=Val;
		if(DragY<=0){
			DragY=0;
		}
		if(DragY>=DargArea){
			DragY=DargArea;
		}
		DragBtn.css({'top':DragY+'px'});
		
		var ScrollY = -Math.round(ScrollArea*DragY/DargArea);
		ScrollDiv.css({'top':ScrollY+'px'});
	}
	function OnDragPress(E){
		$(document).addClass('CusUnselectable');
		document.onselectstart=new Function ("return false")
		IntMouseY = returnPagaY(E);
		IntDragY = DragBtn.position().top;
		$(document).bind('mouseup touchend', OnUp);
		$(document).bind('mousemove touchmove', OnMouseMove);
		E.preventDefault(); 
	}
	DragBtn.bind("touchstart mousedown", OnDragPress);
	
	function MoveDragerToBottom(){
		DragY=DargArea;
		if(DragY<=0){
			DragY=0;
		}
		if(DragY>=DargArea){
			DragY=DargArea;
		}
		//DragBtn.css({'top':DragY+'px'});
		DragBtn.clearQueue();
		DragBtn.stop();
		DragBtn.animate({top:DragY+'px'},{duration:900, easing:'easeInOutExpo'});
		
		var ScrollY = -Math.round(ScrollArea*DragY/DargArea);
		//ScrollDiv.css({'top':ScrollY+'px'});
		ScrollDiv.clearQueue();
		ScrollDiv.stop();
		ScrollDiv.animate({top:ScrollY+'px'},{duration:900, easing:'easeInOutExpo'});
	}
	ScrollObj.MoveDragerToBottom = MoveDragerToBottom
	return ScrollObj;
}