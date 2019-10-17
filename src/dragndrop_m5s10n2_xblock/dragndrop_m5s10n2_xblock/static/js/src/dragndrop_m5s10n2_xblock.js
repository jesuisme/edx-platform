/* Javascript for Dragndropm5s10n2XBlock. */
function reSetA() {
    $(".dra").draggable({revert:true,zIndex:9999999, containment:".m5s3p1"});
    $(".droa").droppable({drop:dropfun});        
    $('.dra').draggable('enable');
    $(".droa").droppable('enable');
    $(".dra").removeClass('drgaN');
    $(".dra").addClass('drga');
    $(".dra").removeAttr('drow');
    $(".droa").attr('data-ids','-1');
    $('#m5s10s1b').hide();
    $(".dra").show();
    $(".dropTop .droa").text("");

    shuffle(sques);
    funSuf();              
}
function dropfun(event,ui){
    var drags = ui.draggable.attr('id');
    var drops = $(this).attr('id');	
    var cls0=$('#'+drags).attr('class').replace('draggable','').replace('drga','').replace('dra','').replace('ui-draggable','').replace('ui-draggable-dragging','').trim();
    var cls1=$('#'+drops).attr('class').replace('droppable','').replace('droa','').replace('ui-droppable','').trim();
    //$('#'+drags).effect('shake');	
    
        var Element=$('#'+drops).closest('.row.dropTop');
        var Drop_0=$($(Element).find('.droppable')[0]).attr('data-ids');
        var Drop_1=$($(Element).find('.droppable')[1]).attr('data-ids');
        
        if(cls0==cls1)
        {		
            ui.draggable.draggable('disable');
            $(this).droppable('disable');
            ui.draggable.draggable('option','revert',false);
            ui.draggable.position({of:$(this),my:"center center", at:"center center"});	
            $("#"+drags).removeClass('drga');
            $("#"+drags).addClass('drgaN');			
            $('#'+drops).attr('data-ids',$('#'+drags).attr('data-ids'));
            $('#'+drags).attr('drow','-2');
            
            $(this).html($("#" + drags).html());
            $("#" + drags).hide();
        }
        
        var cont =0;
    $.each($('.droa'), function(i, v) {
        if ($(v).attr('data-ids')==-1){
            cont++;
        }
    });
    if(cont == 0){
        $('#m5s10s1b').show();
    }
    
}
var isiPad = (navigator.userAgent.match(/iPad/i) != null);
var sques = [0,1,2,3,4,5,6,7];
    var dragL = ["-10%","24%","-8%","23%","-10%","24%","-8%","27%"];
    var dragT = ["18%","24%","35%","40%","47%","55%","63%","65%"];
    var AnsArr=['0,4','1,5','2,6','3,7','4,0','5,1','6,2','7,3'];
function Dragndropm5s10n2XBlock(runtime, element) {
        
    $(document).ready(function () {    
        $(".drga").draggable({revert:true,zIndex:9999999, containment:".m5s3p1"});
        $(".droa").droppable({drop:dropfun});
        funSuf();	
        
    });
    
    
    /* DnD 2nd  */
    shuffle(sques);
}
function funSuf(){
    //if ($("#drags0").hasClass("ui-draggable-disabled") === false)
       $("#drags0").css({'left': "" + dragL[sques[0]], 'top': "" + dragT[sques[0]]});
   //if ($("#drags1").hasClass("ui-draggable-disabled") === false)
       $("#drags1").css({'left': "" + dragL[sques[1]], 'top': "" + dragT[sques[1]]});
   //if ($("#drags2").hasClass("ui-draggable-disabled") === false)
       $("#drags2").css({'left': "" + dragL[sques[2]], 'top': "" + dragT[sques[2]]});
   //if ($("#drags3").hasClass("ui-draggable-disabled") === false)
       $("#drags3").css({'left': "" + dragL[sques[3]], 'top': "" + dragT[sques[3]]});
   //if ($("#drags4").hasClass("ui-draggable-disabled") === false)
       $("#drags4").css({'left': "" + dragL[sques[4]], 'top': "" + dragT[sques[4]]});
   //if ($("#drags5").hasClass("ui-draggable-disabled") === false)
       $("#drags5").css({'left': "" + dragL[sques[5]], 'top': "" + dragT[sques[5]]});
   //if ($("#drags6").hasClass("ui-draggable-disabled") === false)
       $("#drags6").css({'left': "" + dragL[sques[6]], 'top': "" + dragT[sques[6]]});
   //if ($("#drags7").hasClass("ui-draggable-disabled") === false)
       $("#drags7").css({'left': "" + dragL[sques[7]], 'top': "" + dragT[sques[7]]});
}
function shuffle(o) { 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
