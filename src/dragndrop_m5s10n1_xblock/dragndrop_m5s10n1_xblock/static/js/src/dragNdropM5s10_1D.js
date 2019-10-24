var isiPad = (navigator.userAgent.match(/iPad/i) != null);

var squesB = [0,1,2,3,4];
var dragLB = ['3%','36.3%','69.6%','20%','53.3%'];
var dragTB = ['7%','7%','7%','59%','59%'];



$(document).ready(function(){	
		
	$(".drgb").draggable({revert:true,zIndex:999999999, containment:".m5s3p1"});
	$(".drob,.drob1").droppable({drop:dropfunA});
	
	funSufB();		
	
});

function shuffle(o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}



/* DnD 1st  */

var flag1 = false;
var flag2 = false;

function dropfunA(event,ui) {
		
    var drags = ui.draggable.attr('id');
    var drops = $(this).attr('id');
    if (ui.draggable.element !== undefined) {
    ui.draggable.element.droppable('enable');
    }
    ui.draggable.position({of: $(this),my: "center center",at:"center center"});
    ui.draggable.draggable('option', 'revert', "invalid");
    
    var data_id = ui.draggable.attr('data-idsb');
    var data_ids = $(this).attr('data-idsb');
    var num = $(this).attr('num');
    var drag_status = ui.draggable.attr('drag');
    var dro = ui.draggable.attr('dro');
    if(drops != "DragBox1"){
        if(data_ids == -1 && drag_status == 'false'){
            $("#"+drops).attr('data-idsb',data_id);
            $("#dragsb"+data_id).attr('drag','true');
            $("#dragsb"+data_id).attr('dro', num);
			
        }else if(data_ids != -1 && drag_status == 'false'){
            $("#"+drops).attr('data-idsb',data_id);
            $("#dragsb"+data_id).attr('drag','true');
            $("#dragsb"+data_ids).animate({left:dragLB[squesB[data_ids]],top:dragTB[squesB[data_ids]]});
			$("#dragsb"+data_ids).css('background-color','#535B72');
            $("#dragsb"+data_ids).attr('drag','false');
            $("#dragsb"+data_id).attr('dro', num);
			$("#dragsb"+data_ids).attr('dro', '');			
			 
        }
    }
	else{
        //$("#"+drags).attr('data-ids',"-1");
        $("#"+drags).attr('drag','false');
        $("#"+drags).css({left:dragLB[squesB[data_id]],top:dragTB[squesB[data_id]]});
		$('#'+drags).css('background-color','#535B72');
		if(drag_status=='true')
		{
		 $('#m5s10s4_b').hide();
		 $('#m5s10s4_a').hide();		 
		 $('#dropsb0,#dropsb1').attr('data-idsb','-1');
		 }
        //$("#drags"+data_id).attr('dro', "");
    }
	if(drops != "DragBox1"){
		if(drags == 'dragsb0' && drops == 'dropsb0')
		{
			$('#'+drags).css('background-color','#28ae95');
			$("#"+drops).droppable('disable');
			$("#"+drags).draggable('disable');
			flag1=true;
			$('#m5s10s4_b').hide();
		}
		else if(drags == 'dragsb1' && drops == 'dropsb1')
		{
			$('#'+drags).css('background-color','#28ae95');
			$("#"+drops).droppable('disable');
			$("#"+drags).draggable('disable');
			flag2=true;
			$('#m5s10s4_b').hide();
		}	
		else
		{
			$('#'+drags).css('background-color','#f06858');
			$('#m5s10s4_b').show();
		}
		if(flag1 && flag2) {
			$('#m5s10s4_a').show();
		}
	}
	/* var Counter=0
      for(var i=0;i<app.Sequence.length;i++)
        {	    
		    if($('#drops'+i).attr('data-ids')!="-1")
			{
				Counter++;
			}
		}
		if(Counter==5)
		{
			app.BtnAD('check_ans', 'enabled');    
			app.BtnAD('reset', 'disabled');
		} */
   }

shuffle(squesB);
function funSufB(){	 
        $("#dragsb0").css({'left': "" + dragLB[squesB[0]], 'top': "" + dragTB[squesB[0]]});    
        $("#dragsb1").css({'left': "" + dragLB[squesB[1]], 'top': "" + dragTB[squesB[1]]});    
        $("#dragsb2").css({'left': "" + dragLB[squesB[2]], 'top': "" + dragTB[squesB[2]]});    
        $("#dragsb3").css({'left': "" + dragLB[squesB[3]], 'top': "" + dragTB[squesB[3]]});    
        $("#dragsb4").css({'left': "" + dragLB[squesB[4]], 'top': "" + dragTB[squesB[4]]});   	
}

function reSetB() {
	flag1 = false;
	flag2 = false;
	$(".drgb").draggable({revert:true,zIndex:9999999, containment:".m5s3p1"});
	$(".drob,.drob1").droppable({drop:dropfunA});	
	
	$('.drgb').draggable('enable');
	$(".drob").droppable('enable');
	$(".drgb").removeClass('drgaN');
	/* $(".draggable").addClass('drga');
	$(".draggable").removeAttr('drow'); */
	$(".drob").attr('data-idsb','-1');
	$('#m5s10s4_a,#m5s10s4_b').hide();
	shuffle(squesB);
	funSufB();
}
