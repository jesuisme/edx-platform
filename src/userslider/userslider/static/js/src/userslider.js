
/* Javascript for UserSliderXBlock. */
function UserSliderXBlock(runtime, element) {

function createBox(displayVal){
                console.log("create================================");
		if($('.col').length >= 20) return;
		var inpuBoxVal = $('.editDiv').val();
		var trimLen = $.trim(inpuBoxVal).length;
                trimLen = 3;
		if(trimLen > 0){
			console.log("if create box===");
			$('#fcol').append('<div class="col" >'+displayVal+'</div>');
			$('.footer').append('<span class="footerDiv"></span>');
			var columnLen = $('.col').length-1;
			if(oneTimeBool){
				$('.navi').css('display','flex');
				$('.footerDiv').css('background','#fff');
			}
			if(!oneTimeBool){
				var setW = columnLen * defW;
				var setPad  = columnLen * defPad;
				var movePos = parseInt($('#fcol').attr('percent'));
				$('.col').eq(columnLen).css('text-shadow',' 0 0 4px rgba(0,0,0,0.5)').css('color','transparent').css('margin-left', (setW+setPad)+'%').css('left', movePos+'%');
			} 
			$('.col').eq(columnLen).stop().fadeOut(0).fadeIn(200);
			$('.footerDiv').off('click').on('click', enableIcon);			
			oneTimeBool = false;
		}	
	}
	
	function enableIcon(){
		var getIndex = -($(this).index()-1)*moveVal;		
		$('#fcol').attr('percent', getIndex);
		$('#right').trigger('click');
	}

    var addResponseUrl = runtime.handlerUrl(element, 'add_response');
    $('.subBtn', element).click(function (eventObject) {
        var response = document.getElementById("studentresponse").value;
        console.log("click button-------------");
        if (response.length == 0){
            alert("Please write the response.");
        } else{
            var slide = "";
        $.ajax({
            type: "POST",
            url: addResponseUrl,
            data: JSON.stringify({
                "response_text": response
            }),
            success: function (data) {
                location.reload();
                data.response_text.reverse();
                
                var count = 0;
                var slider_div = document.getElementById("fcol");
                var adddiv;
                var j = 0;
                 for (var i = 0; i < data.response_text.length;i++){
                  createBox(data.response_text[i].response);
                }
                }
        });
        }
    });

var moveVal = 36, defW = 28, defPad = 8;
var oneTimeBool = true;
var totalLength = 10;
$(document).ready(function(){

	$('.navi').off('click').on('click', sliderMove);
	
	
	function sliderMove(){		
		var getId = $(event.target).attr('id');		
		if(getId == "right"){
			if($('.col').length < 2) return;
			var totalLeft = ($('.col').length * moveVal)/moveVal;
			var getModVal1 = parseInt($('#fcol').attr('percent')-36)/moveVal;
			getModVal1 = Math.abs(getModVal1);
			if(totalLeft == getModVal1) return;			
		}
		if(getId == "left"){
			var lstop = Math.abs($('#fcol').attr('percent'));
			if(lstop <= 0) return;
		}	
		var moveValueSet = (getId == 'left')?(parseInt($('#fcol').attr('percent'))+moveVal):(parseInt($('#fcol').attr('percent'))-moveVal);
		console.log(moveValueSet)
		$('.col').stop().animate({left:moveValueSet+"%"},500);
		$('#fcol').attr('percent', moveValueSet);
		$('.footerDiv').css('background','none');
		$('.col').css('text-shadow',' 0 0 4px rgba(0,0,0,0.5)').css('color','transparent');	
		var getModVal = parseInt($('#fcol').attr('percent'))/moveVal;
		getModVal = Math.abs(getModVal);
		$('.footerDiv').eq(getModVal).css('background','#fff');
		$('.col').eq(getModVal).css('text-shadow','none').css('color','#000');		
	}
	
});



$(function ($) {
       
        /* Here's where you'd do things on page load. */
      var check_addResponseUrl = runtime.handlerUrl(element, 'check_add_response');
        console.log("click button------sssssssssssss-------");
        $.ajax({
            type: "POST",
            url: check_addResponseUrl,
            data: JSON.stringify({ "response_text": "checksubmit"}),
            success: function (data) {
                 console.log("successsssssssssss");
                 if (data.response_text != "already_submit"){
                    data.response_text.reverse();
                    console.log(data);   
                    console.log(data.response_text.length); 
                    for (var i = 0; i < data.response_text.length;i++){
                     createBox(data.response_text[i].response);
                    } 
                 }
            
                }
              }); 
              
     
    });
}
