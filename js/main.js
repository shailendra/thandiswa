var traceDiv;
var MainDiv;
var AllMenu;
var Window=$(window);
var WindowWidth;
var WindowHeight;
var HomeDiv;
var socialDiv;
var AllImgPiece;
var AllImgPieceDiv;
var MainObject=new Object();
var ContinueInterval;
var MainObjectArray=new Array();
var ImgOneByOneSecId=0;
var LastHtmlLeft;
var LastHtmlTop;
var MoustObj = new Object();
var isSmartPhoneAndTablate = false;
var collageMinDisplayHeight = 750;
MoustObj.PageX=0;
MoustObj.PageY=0;
var intervalId;
var isiPad;
var isAndroid;
var isTouchedDrag = false;
//
var jj=0;
//
//
function OnDocumentLoad(){
	
	
	Window.resize();
}
//
function CreateMouseMove(){
	$(document).mousemove(function(e) {
		if(e.pageX){
			MoustObj.TempPageX = e.pageX;
			MoustObj.TempPageY = e.pageY;
		}else{
			MoustObj.TempPageX = MoustObj.TempPageX-($("html").position().left-LastHtmlLeft)
			MoustObj.TempPageY = MoustObj.TempPageY-($("html").position().top-LastHtmlTop)
		}
		LastHtmlLeft=$("html").position().left;
		LastHtmlTop=$("html").position().top;
		//traceDiv.text(LastHtmlLeft);
		
	});
	
	
	
}
function onWindowScroll(event){
	$(document).trigger("mousemove");
	adjustNavigation();
	controllBookingPopUp();
	controllLatestImgPopUp();
	controllDownloadPopUp();
}
$(window).scroll(onWindowScroll);


CreateMouseMove();
function adjustNavigation(){
	function ShowHoveDiv(){
		//HomeDiv.css({'display':'inline'});
	}
	if(isSmartPhoneAndTablate){
		var left = Math.abs($("html").position().left)-20;
		HomeDiv.css({'position':'absolute', 'left':left+'px'});
		traceDiv.css({'position':'absolute', 'left':left+'px'});
	}
}
//
function DefineTouchEvents(){
	//---- Smart Phone Detection
	//-- to check ipad version
	var startLeft;
	var curLeft;
	var ua = navigator.userAgent;
	isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
	
	//------  Android dectection  ------------------------------------------------------
	isAndroid =  (navigator.userAgent.indexOf('Android') != -1);
	
	//$("#traceDiv").text(isiPad);
	if(isiPad||isAndroid){
		isSmartPhoneAndTablate = true;
	}
	//----------------------------------------------------------------------------------
	function onTouch(event){
		adjustNavigation();
		traceDiv.text(event.target.className);
	}
	function onTouchMove(event){
		isTouchedDrag = true;
		adjustNavigation();
	}
	function onTouchEnd(event){
		adjustNavigation();
	}
	if(isSmartPhoneAndTablate){
		$(document).bind("touchstart", onTouch);
		$(document).bind('touchmove', onTouchMove);
		$(document).bind('touchend', onTouchEnd);
		//$(".inDragDiv").css({'position':'absolute', 'left':'-40px', 'top':'-40px', 'width':'90px', 'height':'130px',  'border':'solid #000000'});
		$(".inDragDiv").css({'position':'absolute', 'left':'-40px', 'top':'-40px', 'width':'90px', 'height':'130px'});
	}
	
}
function OnDocummentReady(){
	
	DefineTouchEvents();
	
	traceDiv = $("#traceDiv");
	MainDiv = $("#MainDiv");
	HomeDiv = $("#HomeDiv")
	socialDiv = HomeDiv.find("#socialDiv");
	AllMenu = $(".HomeMenu").find(".newMenu");
	//
	//
	InitializePieceImg({SectionName:"Latest", mouseX:8, mouseY:7, align:"middle"});
	InitializePieceImg({SectionName:"Music", mouseX:8, mouseY:7, align:"middle"});
	InitializePieceImg({SectionName:"Video", mouseX:8, mouseY:7, align:"base-middle"});
	InitializePieceImg({SectionName:"KillerBees", mouseX:12, mouseY:12, align:"base-middle"});
	InitializePieceImg({SectionName:"Bio", mouseX:12, mouseY:12, align:"base-middle"});
	InitializePieceImg({SectionName:"LastDupper", mouseX:11, mouseY:9, align:"base-middle"});
	InitializePieceImg({SectionName:"Fanon", mouseX:8, mouseY:7, align:"base-middle"});
	InitializePieceImg({SectionName:"Photos", mouseX:30, mouseY:9, align:"base-middle"});
	InitializePieceImg({SectionName:"Govern", mouseX:20, mouseY:9, align:"base-middle"});
	InitializePieceImg({SectionName:"Bottles", mouseX:12, mouseY:12, align:"base-middle"});
	InitializePieceImg({SectionName:"Gigs", mouseX:12, mouseY:10, align:"base-middle"});
	InitializePieceImg({SectionName:"Future", mouseX:15, mouseY:20, align:"middle"});
	//
	function OnMenuClick(){
		MainDiv.stop();
		//MainDiv.animate({left:-700},{duration:1000, easing:'easeInOutExpo'});
		var Id=$(this).attr("id");
		if(Id){
			ShowSectionDiv(Id);
		}
	}
	AllMenu.bind("click", OnMenuClick);
	//
	
	Window.resize(MainWindowResize);
	MainWindowResize();
	//
	$(AllMenu[0]).trigger('click');
	MainObjectArray[ImgOneByOneSecId].StartBgLoading();
	//
	SetUpOtherAnimation();
	
	setBookingAndContactBtn();
	setDownload();
	//setSocialButtonFun();
	//
	//
	
	onWindowScroll();
}
//
//
function setSocialButtonFun(){
	var allSocialBtnImg = $("#HomeDiv").find("img");
	var facebookBtn = $("#HomeDiv").find("#facebookBtn");
	var twitterBtn = $("#HomeDiv").find("#twitterBtn");
	var youtubeBtn = $("#HomeDiv").find("#youtubeBtn");
	var myspaceBtn = $("#HomeDiv").find("#myspaceBtn");
	var antiBtn = $("#HomeDiv").find("#antiBtn");
	
	allSocialBtnImg.css({'cursor':'pointer'});
	
	facebookBtn.click(function (){
						   window.open("https://www.facebook.com/pages/thandiswa-red-mazwai/142738035837","_blank")
						   })
	
	twitterBtn.click(function (){
						   window.open("https://twitter.com/#!/thandiswamazwai","_blank")
						   })
	
	youtubeBtn.click(function (){
						   window.open("https://www.youtube.com/user/thandiswa2","_blank")
						   })
	
	myspaceBtn.click(function (){
						   window.open("http://www.myspace.com/thandiswaofficial","_blank")
						   })
	
	antiBtn.click(function (){
						   window.open("http://www.antiflutter.com","_blank")
						   })
	
	
}
//

function setDownload(){
	var downloadHolder = $("#downloadHolder");
	var closeBtn = downloadHolder.find(".closeBtn");
	var blackPatch = downloadHolder.find(".blackPatch");
	
	var downLoadBtn = $("#DownloadBtn");
	downLoadBtn.bind("click", onClick);
	downLoadBtn.css({'cursor':'pointer'});
	function onClick(){
		downloadHolder.css({'display':'inline'});
	}
	closeBtn.bind("click", onClickCloseBtn);
	closeBtn.css({'cursor':'pointer'});
	function onClickCloseBtn(){
		downloadHolder.css({'display':'none'});
	}
}
function controllDownloadPopUp(){
	var downloadHolder = $("#downloadHolder");
	var blackPatch = downloadHolder.find(".blackPatch");
	var left = Math.abs($("html").position().left);
	var top = Math.abs($("html").position().top);
	WindowWidth=Window.width();
	WindowHeight=Window.height();
	downloadHolder.css({'left':left+WindowWidth/2+'px','top':top+WindowHeight/2+'px'});
	blackPatch.css({'width':WindowWidth+'px', 'height':WindowHeight+'px', 'left':-WindowWidth/2+'px','top':-WindowHeight/2+'px'});
}
//
//
//
function setBookingAndContactBtn(){
	var bookingHolder = $("#bookingHolder");
	var closeBtn = bookingHolder.find(".closeBtn");
	var blackPatch = bookingHolder.find(".blackPatch");
	var contactbtn = $("#ContactBtn");
	var bookingBtn = $("#bookingBtn");
	var contactDownloadBtn = $("#contactDownloadBtn");
	
	contactDownloadBtn.bind("click", onContactDownload);
	function onContactDownload(){
		bookingHolder.css({'display':'none'});
		$("#downloadHolder").css({'display':'inline'});
	}
	
	
	contactbtn.bind("click", onClick);
	bookingBtn.bind("click", onClick);
	bookingBtn.css({'cursor':'pointer'});
	function onClick(){
		bookingHolder.css({'display':'inline'});
	}
	closeBtn.bind("click", onClickCloseBtn);
	closeBtn.css({'cursor':'pointer'});
	function onClickCloseBtn(){
		bookingHolder.css({'display':'none'});
	}
}
function controllBookingPopUp(){
	var bookingHolder = $("#bookingHolder");
	var blackPatch = bookingHolder.find(".blackPatch");
	var left = Math.abs($("html").position().left);
	var top = Math.abs($("html").position().top);
	WindowWidth=Window.width();
	WindowHeight=Window.height();
	bookingHolder.css({'left':left+WindowWidth/2+'px','top':top+WindowHeight/2+'px'});
	blackPatch.css({'width':WindowWidth+'px', 'height':WindowHeight+'px', 'left':-WindowWidth/2+'px','top':-WindowHeight/2+'px'});
}
function controllLatestImgPopUp(){
	var latestNewHolder = $("#latestNewHolder");
	var blackPatch = latestNewHolder.find(".blackPatch");
	var left = Math.abs($("html").position().left);
	var top = Math.abs($("html").position().top);
	WindowWidth=Window.width();
	WindowHeight=Window.height();
	latestNewHolder.css({'left':left+WindowWidth/2+'px','top':top+WindowHeight/2+'px'});
	blackPatch.css({'width':WindowWidth+'px', 'height':WindowHeight+'px', 'left':-WindowWidth/2+'px','top':-WindowHeight/2+'px'});
}
//
//
function SetUpOtherAnimation(){
	//---   LatestMouth -----------------------------
	var LatestMouth = $(".LatestMouth");
	function MoveUpLatestMouth(){
		LatestMouth.animate({top:10+'px'},{duration:1500, easing:'easeInExpo', complete:MoveDownLatestMouth});
	}
	function MoveDownLatestMouth(){
		LatestMouth.animate({top:18+'px'},{duration:1500, easing:'easeOutExpo', complete:MoveUpLatestMouth});
	}
	MoveUpLatestMouth();
	//------------------------------------------------
	//
}
//
//
function FadeOutAllSection(FadeTime){
	function OnEach(index){
		this.FadeOutSection(FadeTime);
	}
	$.each(MainObject, OnEach);
}

//
//
function ShowSectionDiv(SectionName){
	var Obj = MainObject[SectionName];	
	var SectionDiv = Obj.SectionDiv;
	clearInterval(ContinueInterval);
	//Obj.StartBgLoading();
	//
	var position = SectionDiv.position();
	var alignFromLeft = Number(SectionDiv.attr("alignFromLeft"));
	//var SectionDivleft = position.left-Math.round(WindowWidth/2);
	var winAlignObj = c_GetScrollXY();
	var SectionDivleft = alignFromLeft-Math.round(WindowWidth/2);
	var WinLeft = -winAlignObj.left;
	
	
	var Speed = Math.round(Math.abs(SectionDivleft+WinLeft)*1.2);
	var easeType = 'easeInOutCubic'
	if(Speed>5000){
		easeType = 'easeInOutSine';
		Speed = Math.round(Speed*0.7);
	}
	//alert(WinLeft+", "+alignFromLeft+", "+Speed);
	if(isSmartPhoneAndTablate){
		HomeDiv.css({'display':'none'});
	}
	$('html, body').stop();
	$('html, body').animate({scrollLeft:SectionDivleft}, {duration:Speed, easing:easeType,step:onScaleUpdate, complete:onComplete});
	function onComplete(){
		//$(document).trigger("mousemove");
		if(isSmartPhoneAndTablate){
			HomeDiv.css({'display':'inline'});
		}
	}
	function onScaleUpdate(now, fx){
		//$(document).trigger("mousemove");
	}
	
	
	Obj.SetImgMouseMove();	
}
//
//
function InitializePieceImg(Obj){
	
	
	//AllImgPiece = $(".ImgPieceHolderDiv").find("img");
	
	var ContinueInterval;
	SectionName = Obj.SectionName;
	var mouseX = Obj.mouseX;
	var mouseY = Obj.mouseY;
	MainObject[SectionName] = Obj;
	MainObjectArray.push(Obj);
	var SectionDiv = $("#"+SectionName+"Div");
	Obj.SectionDiv=SectionDiv;
	var ImgPieceHolderDiv = SectionDiv.find(".ImgPieceHolderDiv");
	Obj.ImgPieceHolderDiv=ImgPieceHolderDiv;
	var AllImgPieceDiv = ImgPieceHolderDiv.find(".NewDiv");
	Obj.AllImgPieceDiv=AllImgPieceDiv;
	
	var ContentDiv = SectionDiv.find(".ContentDiv");
	Obj.ContentDiv=ContentDiv;
	var ContentPosition = ContentDiv.position();
	var ContentDivOTop = ContentPosition.top;
	var ContentDivOLeft = ContentPosition.left;
	var contentDivObj = new Object();
	contentDivObj.EaseLeft = ContentDivOLeft;
	contentDivObj.EaseTop = ContentDivOTop;
	
	var backContentDiv = SectionDiv.find(".backContentDiv");
	var backContentPosition = backContentDiv.position();
	if(backContentPosition){
		var backContentDivOTop = backContentPosition.top;
		var backContentDivOLeft = backContentPosition.left;
		var backContentDivObj = new Object();
		backContentDivObj.EaseLeft = backContentDivOLeft;
		backContentDivObj.EaseTop = backContentDivOTop;
		
	}
	
	
	var AllImgPieceObjArray = new Array();
	Obj.AllImgPieceObjArray=AllImgPieceObjArray;
	//
	var AllImgPieceObjArrayLength;
	var SectionDivLeft = SectionDiv.position().left;
	var SectionDivTop = SectionDiv.position().top;
	Obj.SectionDivLeft = SectionDivLeft;
	Obj.SectionDivTop = SectionDivTop;
	var ImageLoadTimer;
	//
	//
	//
	Obj.StartBgLoading = StartBgLoading;
	function StartBgLoading(){
		clearInterval(ImageLoadTimer);		
		var i = AllImgPieceObjArray.length;
		function OnInterval(){
			clearInterval(ImageLoadTimer);
			if(i>=0){
				AllImgPieceObjArray[i].LoadImg(LoadOneByOnBg);
			}else{
				ImgOneByOneSecId++;
				if(ImgOneByOneSecId<MainObjectArray.length){
					MainObjectArray[ImgOneByOneSecId].StartBgLoading();
				}
			}
		}
		function LoadOneByOnBg(){
			i--;
			ImageLoadTimer = setInterval(OnInterval, 100);
		}
		LoadOneByOnBg();
	}
	//
	//
	//
	//----  BG Image Mouse Move -----------------------------------
	var MouseLeft;
	var MouseTop;
	//
	function SetImgMouseMove(){
		clearInterval(ContinueInterval);
		ContinueInterval = setInterval(OnContinueMove, 30);
	}
	SetImgMouseMove();
	function OnContinueMove(){
		
		if(MoustObj.TempPageX){
			MoustObj.PageX=+MoustObj.TempPageX;
			MoustObj.PageY=+MoustObj.TempPageY;
		}		
		$.each(AllImgPieceObjArray, OnEachMove);
		MoveAccIndex({Index:AllImgPieceObjArrayLength+2, Div:ContentDiv, OLeft:ContentDivOLeft, OTop:ContentDivOTop, Ran:0.5, NewObj:contentDivObj});
		
		
		//--- if extra back div added
		if(backContentPosition){
			if(Obj.SectionName=="Latest"){
				MoveAccIndex({Index:6, Div:backContentDiv, OLeft:backContentDivOLeft, OTop:backContentDivOTop, Ran:0.5, NewObj:backContentDivObj});
			}else{
				MoveAccIndex({Index:1, Div:backContentDiv, OLeft:backContentDivOLeft, OTop:backContentDivOTop, Ran:0.5, NewObj:backContentDivObj});
			}
		}
		
		
	}
	Obj.SetImgMouseMove=SetImgMouseMove;
	function MoveAccIndex(Obj){
		MouseLeft = MoustObj.PageX-SectionDivLeft;
		MouseTop = MoustObj.PageY-SectionDivTop;
		var MouseDivideX=Obj.Index*mouseX;
		var MouseDivideY=Obj.Index*mouseY;
		//var RanX = Math.random()*Obj.Ran;
		//var RanY = Math.random()*Obj.Ran;
		var RanX = 0;
		var RanY = 0;
		var NewLeft = -(MouseLeft/MouseDivideX)+Obj.OLeft+RanX;
		var NewTop = -(MouseTop/MouseDivideY)+Obj.OTop+RanY;
		//var NewLeft = Obj.OLeft+RanX;
		//var NewTop =  Obj.OTop+RanY;
		//
		Obj.NewObj.EaseLeft+=(NewLeft-Obj.NewObj.EaseLeft)/10;
		Obj.NewObj.EaseTop+=(NewTop-Obj.NewObj.EaseTop)/10;
		Obj.Div.css({'left':Obj.NewObj.EaseLeft+'px', 'top':Obj.NewObj.EaseTop+'px'});
	}
	function OnEachMove(i){
		var NewObj = this;
		MoveAccIndex({Index:i+2, Div:NewObj.NewDiv, OLeft:NewObj.NewDivOLeft, OTop:NewObj.NewDivOTop, Ran:1, NewObj:NewObj});
	}
	//-----------------------------------------------
	//
	//
	//
	function OnDivEach(index){
		var NewObj = new Object();
		var NewDiv = $(this);
		NewObj.NewDiv=NewDiv;
		var PieceImg = $(NewDiv.find(".PieceImg"));
		var MaskDiv = NewDiv.find(".MaskDiv");
		//var ImgSrc = PieceImg.attr("src");
		var ImgSrc = PieceImg.attr("imgUrl");
		var NewDivPosition = NewDiv.position();
		var NewDivOLeft = NewDivPosition.left;
		var NewDivOTop = NewDivPosition.top;
		var OPosition = MaskDiv.position();
		var OImgWidth = PieceImg.width();
		var OImgHeight = PieceImg.height();
		var MaskDivCenLeft = OPosition.left+OImgWidth/2;
		var MaskDivCenTop = OPosition.top+OImgHeight/2;
		var OnLoadFinish;
		//		
		//NewObj.IsImgStartToLoading=false;
		//NewObj.IsImgLoaded=false;
		NewObj.NewDivOLeft=NewDivOLeft;
		NewObj.NewDivOTop=NewDivOTop;
		NewObj.EaseLeft=NewDivOLeft;
		NewObj.EaseTop=NewDivOTop;
		//
		MaskDiv.css({'overflow':'hidden'});
		//MaskDiv.css({'border':'solid thin', 'overflow':'hidden'});
		PieceImg.css({'position':'absolute', 'left':(-OImgWidth/2)+'px', 'top':(-OImgHeight/2)+'px'})
		
		//
		//NewObj.NewDivOLeft=3000;
		NewDiv.css({'top':1500+'px'});
		NewObj.NewDivOTop=1500;
		NewObj.EaseTop = NewObj.NewDivOTop;
		//
		function OnImgLoad(){
			//alert(NewDivOTop)
			MaskDiv.stop();
			NewObj.NewDiv.stop();
			MaskDiv.animate({left:OPosition.left+'px', top:OPosition.top+'px', width:OImgWidth+'px', height:OImgHeight+'px'},{duration:0, easing:'easeOutCubic'});
			$(NewObj).animate({NewDivOLeft:NewDivOLeft, NewDivOTop:NewDivOTop},{duration:2000, easing:'easeOutCubic', complete:onUpMove});
			function onUpMove(){
				
			}
			function OnScale(){
				if(OnLoadFinish){
					OnLoadFinish();
				}
			}
			/*if(index!=0){
				MaskDiv.hide();
			}*/
			OnScale();
		}
		PieceImg.bind("load", OnImgLoad);
		NewObj.UnloadAndCloseDiv = function(){	
			PieceImg.attr("src"," ");
			MaskDiv.css({'left':MaskDivCenLeft+'px', 'top':MaskDivCenTop+'px', 'width':'0px', 'height':'0px'});
		} 
		NewObj.UnloadAndCloseDiv();
		NewObj.LoadImg = function(OnFinished){
			OnLoadFinish = OnFinished;
			PieceImg.attr("src", ImgSrc);
		}
		AllImgPieceObjArray.push(NewObj);
	}
	AllImgPieceDiv.each(OnDivEach);
	AllImgPieceObjArrayLength = AllImgPieceObjArray.length;
}
//
//
function ControlHomeDivPosition(){
	var HomeHeight = HomeDiv.height();
	var Ypos = ((WindowHeight/2)-HomeHeight/2)-50;
	var SocialY = (WindowHeight/2)+(HomeHeight/2)-50;
	//alert(Ypos);
	HomeDiv.css({'top':Ypos+'px'});
	socialDiv.css({'top':SocialY+'px'});
}
function collageYPosition(){
	var obj;
	function setMiddle(obj){
		obj.SectionDiv.css({'top':(WindowHeight/2)+'px'});
	}
	function setBaseMiddle(obj){
		if(WindowHeight>collageMinDisplayHeight){
			obj.SectionDiv.css({'top':(WindowHeight-(collageMinDisplayHeight/2))+'px'});
		}else{
			obj.SectionDiv.css({'top':(WindowHeight/2)+'px'});
		}
	}
	for(var i = 0; i<MainObjectArray.length; i++){
		obj = MainObjectArray[i];
		if(obj.align=="middle"){
			setMiddle(obj);
		}else if(obj.align=="base-middle"){
			setBaseMiddle(obj);
		}
	}
}
function MainWindowResize(){
	WindowWidth=Window.width();
	WindowHeight=Window.height();
	ControlHomeDivPosition();
	collageYPosition();
	controllBookingPopUp();
	controllDownloadPopUp();
	controllLatestImgPopUp();
}


function CalPer(OWW, OHH, AWW, AHH) {
	var Per = AWW*100/OWW;
	var RH  = Per*OHH/100;
	var reWidth;
	var reHeight;
	if (RH>AHH) {
		Per = AHH*100/OHH;
		var RW = Per*OWW/100;
		reWidth = RW;
		reHeight = AHH;
	} else {
		reWidth = AWW;
		reHeight = RH;
	}
	var Obj={width:reWidth, height:reHeight};
	return Obj;
}
//
//
$(window).load(OnDocumentLoad);
$(document).ready(OnDocummentReady);
//
//$(window).load(OnDocummentReady);
//$(document).ready(OnDocummentReady);
