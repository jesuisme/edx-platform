/* Javascript for QuesRespModule10Sec7XBlock. */




 function TryA(obj) {
    $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }
    
    function checkAnswer(obj, f) {
       
             if($(obj).hasClass("customansclass1"))
              {
                if(obj.innerText=="Enhanced Access")
                {
                   $(".txtincrect1").html("Enhanced access is one of the key tenants of a PCMH.");
                }
                else if(obj.innerText=="Data Dashboard")
                {
                   $(".txtincrect1").html("A data dashboard could be a way providers in a PCMH view quality and safety data.");
                }
                else if(obj.innerText=="Continuity of Care")
                {
                   $(".txtincrect1").html("Continuity of care is central to a PCMH.");
                }
                else
                {
                $(".txtincrect1").html("");
                }
              }
    
    
            //console.log($(obj).parents(".row-eq-height"));
            $(obj).closest('.row-eq-height').addClass('Dis');
            $('.item.active div').removeClass("incorrect").removeClass("selectedAns");
            $(obj).parents(".eq-h").find(".ans")
            $(obj).parents(".white").removeClass("correct incorrect");
            if (f === 1) {
                $(obj).addClass('selectedAns').parents('.white').addClass('correct');
            } else if (f === 0) {
                $(obj).addClass('selectedAns').parents('.white').addClass('incorrect');
            } else {
                $(obj).addClass('selectedAns').parents('.white').addClass('correct bothCorrect');
                //alert(f);
                $(".5401, .2497").addClass("hide");
                $("." + f).removeClass("hide");
            }
        }
        



function QuesRespModule10Sec7XBlock(runtime, element) {

  $('#myCarousel_1').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       //var id = parseInt(e.relatedTarget.id); 
          var id = e.relatedTarget.id; 
          //alert(id);
          if(id == '0'){
              $('.left').hide();              
              $('.right').show();
          }else if(id == '5'){
            $('.left').show();
            $('.right').hide();
          } else {
            $('.left').show();
            $('.right').show();
          }
       //  setMsgBoxHeight();

      });   




    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
