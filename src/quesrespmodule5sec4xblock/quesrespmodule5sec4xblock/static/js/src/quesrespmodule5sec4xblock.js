/* Javascript for QuesRespModule5Sec4XBlock. */







function TryAB(obj){
       $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }
    
    function checkAnswerAB(obj, f) {
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
        



function QuesRespModule5Sec4XBlock(runtime, element) {

     $('.carousel').on('slid.bs.carousel', function (e) {
        console.log("slider----");
       $('.item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
       console.log("id===5.4==", id);
          
          if(id == 0){
              $('.left_aa').hide();              
              $('.right_aa').show();
          }else if(id == 2){
            $('.left_aa').show();
            $('.right_aa').hide();
          } else {
            $('.left_aa').show();
            $('.right_aa').show();
          }

    });




    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
