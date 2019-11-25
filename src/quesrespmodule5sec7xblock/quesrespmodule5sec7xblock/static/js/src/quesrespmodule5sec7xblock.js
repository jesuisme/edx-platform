/* Javascript for QuesRespModule5Sec7XBlock. */


        
    



function TryAC(obj){
       $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }

 
    function checkAnswerAC(obj, f) {
             if($(obj).hasClass("customansclass1"))
                                                  {
                if(obj.innerText=="fee-for-service")
               {
              $(".txtincrect1").html("In the fee-for-service model, health care services are paid for separately, with a specific price set for each service. This can incentivize more costly care service.");
                  }
             else if(obj.innerText=="condition-specific bundled payments")
              {
              $(".txtincrect1").html("In the condition-specific bundled payments model, a single predetermined payment covers the full cost of treating a patient over a care cycle for a given condition. This does not address nor re ally encourage preventative care.");
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






function QuesRespModule5Sec7XBlock(runtime, element) {


  // $(function () {
  //               setMsgBoxHeight();
  //       });
  //       function setMsgBoxHeight() {
  //       var f_height = 0;
  //           var msgboxHeight = $(".carousel .active .row-eq-height").height();
  //            var l = $(".carousel .active .ans").length;
  //             for(var i=1;i<=l;i++)
  //             {
  //             var h =  $(".carousel .active .row-eq-height div:nth-child("+i+") .ans").css("height");
  //             var h1 = h.split('p');
  //            if(f_height < Number(h1[0]))
  //            {
  //               f_height = h1[0];
  //            }
  //           }
  //          $(".carousel .active .ans").css("height",f_height+"px");    
  //   }

  //     $(".additem").on("swipeleft",function(){
  //   if(app.isMobile){
  //    var i = $(this).children("div.item.active").index()+1;
  //    var l = $(this).children("div.item").length;
  //    $(".carousel-indicators li").removeClass("active");
  //     $(this).children("div.item").removeClass("active");
  //    if(i==l)
  //    {
  //       $(".carousel-indicators li:nth-child(1)").addClass("active");
  //       $(".additem div.item:nth-child(1)").addClass("active");
  //       $(".additem div.item:nth-child(1) .ans").removeClass('Dis');
  //    }
  //    else{
  //        i++;
  //        $(".carousel-indicators li:nth-child("+i+")").addClass("active");
  //       $(".additem div.item:nth-child("+i+")").addClass("active");
  //        $(".additem div.item:nth-child("+i+") .ans").removeClass('Dis');
  //    }
  //    setMsgBoxHeight();
  //    }
  // });
  // $(".additem").on("swiperight",function(){
  //   if(app.isMobile){
  //    var i = $(this).children("div.item.active").index()+1;
  //    var l = $(this).children("div.item").length;
  //    $(".carousel-indicators li").removeClass("active");
  //     $(this).children("div.item").removeClass("active");
  //    if(i==1)
  //    {
  //       $(".carousel-indicators li:nth-child("+l+")").addClass("active");
  //       $(".additem div.item:nth-child("+l+")").addClass("active");
  //        $(".additem div.item:nth-child("+i+") .ans").removeClass('Dis');
  //    }
  //    else{
  //        i--;
  //        $(".carousel-indicators li:nth-child("+i+")").addClass("active");
  //       $(".additem div.item:nth-child("+i+")").addClass("active");
  //        $(".additem div.item:nth-child("+i+") .ans").removeClass('Dis');
  //    }
  //    setMsgBoxHeight();
  //    }
  // });



// var n = 0;

   $('.carousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       console.log("slider indicator");
       var id = parseInt(e.relatedTarget.id);
       console.log("id--5.7-", id);
          if(id == 0){
              $('.left').hide();
              $('.right').show();
          }else if(id == 1){
            $('.left').show();
            $('.right').hide();
          }  /*else {
            $('.left').show();
            $('.right').show();
          }*/
          // setMsgBoxHeight();
      });



    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
