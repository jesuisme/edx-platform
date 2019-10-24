/* Javascript for QuesRespModule5Sec4XBlock. */



    //     $(function () {
    //             setMsgBoxHeight();
    //     });
    //     function setMsgBoxHeight() {
    //     var f_height = 0;
    //         var msgboxHeight = $(".carousel .active .row-eq-height").height();
    //          var l = $(".carousel .active .ans").length;
    //           for(var i=1;i<=l;i++)
    //           {
    //           var h =  $(".carousel .active .row-eq-height div:nth-child("+i+") .ans").css("height");
    //           var h1 = h.split('p');
    //          if(f_height < Number(h1[0]))
    //          {
    //             f_height = h1[0];
    //          }
    //         }
    //        $(".carousel .active .ans").css("height",f_height+"px");    
    // }
    

   



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
        



function QuesRespModule5Sec4XBlock(runtime, element) {

     $('.carousel').on('slid.bs.carousel', function (e) {
        console.log("slider----");
       $('.item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
       console.log("id=====", id);
          
          if(id == 0){
              $('.left').hide();              
              $('.right').show();
          }else if(id == 2){
            $('.left').show();
            $('.right').hide();
          } else {
            $('.left').show();
            $('.right').show();
          }

    });




    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
