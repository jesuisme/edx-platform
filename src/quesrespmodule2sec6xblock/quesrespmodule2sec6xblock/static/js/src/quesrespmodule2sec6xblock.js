/* Javascript for QuesRespModule2Sec6XBlock. */






function TryA(obj){
      $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');

    }


    function checkAnswer(obj, f) {
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
        


function QuesRespModule2Sec6XBlock(runtime, element) {
$('.carousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
          if(id == 0){
              $('.left').hide();
              $('.right').show();
          }else if(id == 1){
            $('.left').show();
            $('.right').hide();
          } 
      });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
