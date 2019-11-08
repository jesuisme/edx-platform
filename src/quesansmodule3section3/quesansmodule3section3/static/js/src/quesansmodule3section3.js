/* Javascript for QuesAnsModule3Section3XBlock. */

    
    function TryAB(obj) {
    $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }        
        
    function checkAnswerA(obj, f) {
           
            $(obj).closest('.row-eq-height').addClass('Dis');
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



function QuesAnsModule3Section3XBlock(runtime, element) {

    //         $(function () {
    //             setMsgBoxHeight1();
    //     });
    //     function setMsgBoxHeight1() {
    //     var f_height = 0;
    //         var msgboxHeight = $("#my-Carousel1 .carousel .active .row-eq-height").height();
    //          var l = $("#my-Carousel1 .carousel .active .ans").length;
    //           for(var i=1;i<=l;i++)
    //           {
    //           var h =  $("#my-Carousel1 .carousel .active .row-eq-height div:nth-child("+i+") .ans").css("height");
    //           var h1 = h.split('p');
    //          if(f_height < Number(h1[0]))
    //          {
    //             f_height = h1[0];
    //          }
    //         }
    //        $("#my-Carousel1 .carousel .active .ans").css("height",f_height+"px");      
    // }
  

$('#myCarousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       $('.item .ans').removeClass('DisB');
       var id = parseInt(e.relatedTarget.id);
       console.log("3.3 id--", id);
          if(id == 0){
              $('#myCarousel .left_a').hide();
              $('#myCarousel .right_a').show();
               // setMsgBoxHeight1();
          }else{
            $('#myCarousel .left_a').show();
            $('#myCarousel .right_a').hide();
            // setMsgBoxHeight1();
         }
      });


    

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}





