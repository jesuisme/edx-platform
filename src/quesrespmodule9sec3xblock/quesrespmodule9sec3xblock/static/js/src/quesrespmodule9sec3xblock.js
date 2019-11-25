/* Javascript for QuesRespModule9Sec3XBlock. */



                                  



function TryA(obj){
     $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');     
    }


    function checkAnswer(obj, f) {
            //console.log($(obj).parents(".row-eq-height"));
       
           $(obj).closest('.row-eq-height').addClass('Dis');
            $('#myCarousel_a .item.active div').removeClass("incorrect").removeClass("selectedAns");
            $(obj).parents(".eq-h").find(".ans")
            $(obj).parents(".white").removeClass("correct incorrect");
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

    
    
        
    





function QuesRespModule9Sec3XBlock(runtime, element) {


  $(function () {
                //setMsgBoxHeight2();
                //setQuestions();
                // setQuestions1();
        });

// function setMsgBoxHeight2() {
       
//     }
    

$('#myCarousel_a').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       
       var id = parseInt(e.relatedTarget.id);
     
       if(id == 0){
              $('.left_b').hide();  
              $('.right_b').show();
               //  setMsgBoxHeight2();
          } else if(id == 2) {
            $('.left_b').show();
            $('.right_b').hide();
            // setMsgBoxHeight2();
          } else if(id == 1) {
            $('.left_b').show();
            $('.right_b').show();
           //  setMsgBoxHeight2();
          }
           $('.yourClass').hide();
           
      });
      
      
                 



    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
