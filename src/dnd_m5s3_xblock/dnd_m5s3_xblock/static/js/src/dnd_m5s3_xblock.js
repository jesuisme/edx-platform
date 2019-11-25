/* Javascript for DNDM5S3XBlock. */
function DNDM5S3XBlock(runtime, element) {

   

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
//var AnsArr = ['0,6', '1,7', '2,8', '3,9', '4,10', '5,11', '6,0', '7,1', '8,2', '9,3', '10,4', '11,5'];
var sques = [0, 1, 2, 3, 4, 5];

var dragL = ["-10%", "13%", "-10%", "13%", "-10%", "13%"];
var dragT = ["14%", "25%", "37%", "48%", "60%", "73%"];


$(document).ready(function () {
    $(".draggable").draggable({revert: true, zIndex: 9999999, containment: ".m5s3p1"});
    $(".droppable").droppable({drop: dropfun});
	
    funSuf();

});



function dropfun(event, ui) {
    var drags = ui.draggable.attr('id');
    var drops = $(this).attr('id');
	
	if(drags.substr(drags.length-1)==drops.substr(drops.length-1))
		{
			ui.draggable.draggable('disable');
			$(this).droppable('disable');
			ui.draggable.draggable('option','revert',false);
			ui.draggable.position({of:$(this),my:"center center", at:"center center"});
			
			$('#'+drops).attr('data-ids',$('#'+drags).attr('data-ids'));
			
			if (drags == 'drags0' && drops == 'drops0')
				{
					$("#" + drags).removeClass('drgb');
					$("#" + drags).addClass('drgbN');
					
					$(this).html($("#" + drags).html());
					$("#" + drags).hide();
				}
			if (drags == 'drags1' && drops == 'drops1')
				{
					$("#" + drags).removeClass('drgb');
					$("#" + drags).addClass('drgbN');
					
					$(this).html($("#" + drags).html());
					$("#" + drags).hide();
				}
			if (drags == 'drags2' && drops == 'drops2')
				{
					$("#" + drags).removeClass('drgb');
					$("#" + drags).addClass('drgbN');
					
					$(this).html($("#" + drags).html());
					$("#" + drags).hide();
				}	
			if (drags == 'drags2' && drops == 'drops2')
				{
					$("#" + drags).removeClass('drgb');
					$("#" + drags).addClass('drgbN');
					
					$(this).html($("#" + drags).html());
					$("#" + drags).hide();
				}
			if (drags == 'drags3' && drops == 'drops3')
				{
					$("#" + drags).removeClass('drgb');
					$("#" + drags).addClass('drgbN');
					
					$(this).html($("#" + drags).html());
					$("#" + drags).hide();
				}	
			if (drags == 'drags4' && drops == 'drops4')
				{
					$("#" + drags).removeClass('drgb');
					$("#" + drags).addClass('drgbN');
					
					$(this).html($("#" + drags).html());
					$("#" + drags).hide();
				}	
			if (drags == 'drags5' && drops == 'drops5')
				{
					$("#" + drags).removeClass('drgb');
					$("#" + drags).addClass('drgbN');
					
					$(this).html($("#" + drags).html());
					$("#" + drags).hide();
				}	
	}
		
				
           
			
			
			var cont =0;
			
			$.each($('.droppable'), function(i, v) {
			if ($(v).attr('data-ids')==-1){
			cont++;
			}
		});	
		if(cont == 0){
			//alert('A');
			$('.answerDnD').show();
		}
			
		
}


function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

shuffle(sques);
function funSuf() {	
    $("#drags0").css({'left': "" + dragL[sques[0]], 'top': "" + dragT[sques[0]]});
    $("#drags1").css({'left': "" + dragL[sques[1]], 'top': "" + dragT[sques[1]]});
    $("#drags2").css({'left': "" + dragL[sques[2]], 'top': "" + dragT[sques[2]]});
    $("#drags3").css({'left': "" + dragL[sques[3]], 'top': "" + dragT[sques[3]]});
    $("#drags4").css({'left': "" + dragL[sques[4]], 'top': "" + dragT[sques[4]]});
    $("#drags5").css({'left': "" + dragL[sques[5]], 'top': "" + dragT[sques[5]]});

}


function reset_fun() {
    $(".draggable").draggable({revert: true, zIndex: 999999, containment: ".m5s3p1"});
    $(".droppable").droppable({drop: dropfun});

    $('.draggable').draggable('enable');
    $(".droppable").droppable('enable');
    $(".draggable").removeClass('drgbN');
    $(".draggable").addClass('drgb');    
	//$(".draggable").removeAttr('drow');	
    $(".droppable").attr('data-ids', '-1');	
	
		$(".draggable").show();
		$(".dropTop .droppable").text("");
		
		$('.answerDnD').hide();
		
    shuffle(sques);
    funSuf();


}