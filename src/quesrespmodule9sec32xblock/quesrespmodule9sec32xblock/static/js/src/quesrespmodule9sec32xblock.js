
    
    function TryAB(obj) {
    $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }        
        
    function checkAnswerA(obj, f) {
            //console.log($(obj).parents(".row-eq-height"));
        
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



function QUesRespModule9Sec32XBlock(runtime, element) {

   $(function () {
          //     setMsgBoxHeight1();
        });



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
    

    $('#my-Carousel1 .carousel').on('slid.bs.carousel', function (e) {
        $('.item .ans').removeClass('Dis');
        //console.log(parseInt(e.relatedTarget.id));
        var id = parseInt(e.relatedTarget.id);
        
        if(id == 3){
                   $('.left_a').hide();
                   $('.right_a').show();
                   // setMsgBoxHeight1();             
               } else if(id == 5){
                 $('.left_a').show();
                 $('.right_a').hide();
                 //setMsgBoxHeight1();         
               } else {
                 $('.left_a').show();
                 $('.right_a').show();
               }
                
                
                $('.yourClass').hide();
          
            
       });                          




    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
