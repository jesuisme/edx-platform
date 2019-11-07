/* Javascript for Quesrespmodule3deep2XBlock. */


function TryA(){
      $('#myCarousel_a .item.active div').removeClass("incorrect").removeClass("selectedAns");
      $('#myCarousel_a .item .ans').removeClass('DisB');      
    }


        function checkAnswer(obj, f) {
            //console.log($(obj).parents(".row-eq-height"));
       
            $('#myCarousel_a .item .ans').addClass('DisB');
            $('#myCarousel_a .item.active div').removeClass("incorrect").removeClass("selectedAns");
            $(obj).parents(".eq-h").find(".ans")
            $(obj).parents("#myCarousel_a .white").removeClass("correct incorrect");
            if (f === 1) {
                $(obj).addClass('selectedAns').parents('#myCarousel_a .white').addClass('correct');
            } else if (f === 0) {
                $(obj).addClass('selectedAns').parents('#myCarousel_a .white').addClass('incorrect');
            } else {
                $(obj).addClass('selectedAns').parents('#myCarousel_a .white').addClass('correct bothCorrect');
                //alert(f);
                $(".5401, .2497").addClass("hide");
                $("." + f).removeClass("hide");
            }
        } 

    
    function TryAB() {
      $('#myCarousel .item.active div').removeClass("incorrect").removeClass("selectedAns");
      $('#myCarousel .item .ans').removeClass('DisB');
    }        
        
        function checkAnswerA(obj, f) {
            //console.log($(obj).parents(".row-eq-height"));          
            $('#myCarousel .item .ans').addClass('DisB');
            $('#myCarousel .item.active div').removeClass("incorrect").removeClass("selectedAns");
            $(obj).parents(".eq-h").find(".ans")
            $(obj).parents("#myCarousel .white").removeClass("correct incorrect");
            if (f === 1) {
                $(obj).addClass('selectedAns').parents('#myCarousel .white').addClass('correct');
            } else if (f === 0) {
                $(obj).addClass('selectedAns').parents('#myCarousel .white').addClass('incorrect');
            } else {
                $(obj).addClass('selectedAns').parents('#myCarousel .white').addClass('correct bothCorrect');
                //alert(f);
                $(".5401, .2497").addClass("hide");
                $("." + f).removeClass("hide");
            }
        }      




function Quesrespmodule3deep2XBlock(runtime, element) {
    $('.carousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       $('.item .ans').removeClass('DisB');
       var id = parseInt(e.relatedTarget.id);

      });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
