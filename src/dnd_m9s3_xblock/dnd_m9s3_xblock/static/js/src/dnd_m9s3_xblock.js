/* Javascript for DnDm9s3XBlock. */
function DnDm9s3XBlock(runtime, element) {

    var isiPad = (navigator.userAgent.match(/iPad/i) != null);

var squesC = [0,1,2,3,4,5];
//var dragLC = [150,150,150,150,150];
//var dragTC = [75,75,75,75,75];



$(document).ready(function(){		
	$(".drgc").draggable({revert:true,zIndex:9999999, containment:"body"});
	$(".droc").droppable({drop:dropfunB});			
	optNone();
	dragNoneC();	
	funSufC();	
	
	$(".droppable").click(function(){
	//if(count==6)
	//{
	$('.droppable.droc').show();
    optNone();
	var id=$(this)[0].id.replace('dropsc','');
	//$('.drb'+id).hide();	
	$("#opt"+id).show();
	//}	
	
});
	//dragHeight($('#feedBox'));	
});

function dragHeight($id) {
	var height = $id.height();	
	var width = $id.width();	
	//console.log($id);
	$id.css({'top': ($('.customContainer').height() - height)/2 - 10});
	//, 'left': ($('.customContainer').width() - width)/2 -25
}

function shuffle(o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function dragNoneC() {
	$("#dragsc0").hide();
	$("#dragsc1").hide();
	$("#dragsc2").hide();
	$("#dragsc3").hide();
	$("#dragsc4").hide();
	$("#dragsc5").hide();
}
function optNone() {
	$("#opt0").hide();
	$("#opt1").hide();
	$("#opt2").hide();
	$("#opt3").hide();
	$("#opt4").hide();
	$("#opt5").hide();
}



var count = 0;
function dropfunB(event,ui){
	var drags = ui.draggable.attr('id');
	var drops = $(this).attr('id');
	
			
		if(drags.substr(drags.length-1)==drops.substr(drops.length-1))
		{		
			ui.draggable.position({of:$(this),my:"center center", at:"center center"});
			ui.draggable.draggable('option','revert',false);
			ui.draggable.draggable('disable');
			$(this).droppable('disable');
			
			$('#'+drops).attr('data-idsc',$('#'+drags).attr('data-idsc'));
						
			if(drops == 'dropsc0' && drags == 'dragsc0') {			
				$("#"+drops).addClass('drb0');
				$("#"+drags).css('display','none');
			}
			if(drops == 'dropsc1' && drags == 'dragsc1') {			
				$("#"+drops).addClass('drb1');
				$("#"+drags).css('display','none');
			}
			if(drops == 'dropsc2' && drags == 'dragsc2') {			
				$("#"+drops).addClass('drb2');
				$("#"+drags).css('display','none');
			}
			if(drops == 'dropsc3' && drags == 'dragsc3') {			
				$("#"+drops).addClass('drb3');
				$("#"+drags).css('display','none');
			}
			if(drops == 'dropsc4' && drags == 'dragsc4') {			
				$("#"+drops).addClass('drb4');
				$("#"+drags).css('display','none');
			}
			if(drops == 'dropsc5' && drags == 'dragsc5') {			
				$("#"+drops).addClass('drb5');
				$("#"+drags).css('display','none');
			}
			
			count++;
			$("#dragsc"+squesC[count]).show();	
			dragHeight($("#dragsc"+squesC[count]));			
		}	
		
		
	var cont =0;
		$.each($('.droc'), function(i, v) {
			if ($(v).attr('data-idsc')==-1){
			cont++;
			}
		});	
		 if(cont == 0){
			//alert('A');
			$('#feedBox').show();
		} 
		
	//dragHeight($("#dragsc"+squesC[count]));
}


shuffle(squesC);
//alert(squesC);
function funSufC(){
		//$("#dragsc0").css({'left': ""+dragLC[squesC[0]]+"px",'top': ""+dragTC[squesC[0]]+"px"});
		//$("#dragsc1").css({'left': ""+dragLC[squesC[1]]+"px",'top': ""+dragTC[squesC[1]]+"px"});
		//$("#dragsc2").css({'left': ""+dragLC[squesC[2]]+"px",'top': ""+dragTC[squesC[2]]+"px"});
		//$("#dragsc3").css({'left': ""+dragLC[squesC[3]]+"px",'top': ""+dragTC[squesC[3]]+"px"});
		//$("#dragsc4").css({'left': ""+dragLC[squesC[4]]+"px",'top': ""+dragTC[squesC[4]]+"px"});
		//$("#dragsc5").css({'left': ""+dragLC[squesC[5]]+"px",'top': ""+dragTC[squesC[5]]+"px"});	
		$("#dragsc"+squesC[0]).show();
		dragHeight($("#dragsc"+squesC[0]));
}

function optionClick() {	

 
}
    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
