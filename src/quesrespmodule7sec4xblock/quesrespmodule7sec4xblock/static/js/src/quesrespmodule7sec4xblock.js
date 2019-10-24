/* Javascript for QuesRespModule7Sec4XBlock. */




function TryA(obj){
    $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }


    function checkAnswer(obj, f) {
    

        if($(obj).hasClass("customansclass1"))
        {
        if(obj.innerText=="The medication's cost and the patient's ability to afford it")
        {
           $(".txtincrect1").html("");
        }
          else if(obj.innerText=="")
        {
           $(".txtincrect1").html("");
        }        
        else
        {
        $(".txtincrect1").html("");
        }

          }

       
       
        
            //$('.item .ans').addClass('Dis');
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
                $(".5401, .2497").addClass("hide");
                $("." + f).removeClass("hide");
            }
        }







function QuesRespModule7Sec4XBlock(runtime, element) {

  $('#myCarousel').on('slid.bs.carousel', function (e) {
    console.log("ffffffff");
       $('.item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
       console.log("id----", id);
         
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
          setMsgBoxHeight();
      });
    
            $(function () {
                setMsgBoxHeight();
        });
        function setMsgBoxHeight() {
    var f_height = 0;
            var msgboxHeight = $(".carousel .active .row-eq-height").height();
       var l = $(".carousel .active .ans").length;
        for(var i=1;i<=l;i++)
        {
        var h =  $(".carousel .active .row-eq-height div:nth-child("+i+") .ans").css("height");
        var h1 = h.split('p');
       if(f_height < Number(h1[0]))
       {
          f_height = h1[0];
       }
      }
           $(".carousel .active .ans").css("height",f_height+"px"); 
        $(".carousel .active .ans").css("line-height","block-height !important");      
    }
  $(".additem").on("swipeleft",function(){
    if(app.isMobile){
     var i = $(this).children("div.item.active").index()+1;
     var l = $(this).children("div.item").length;
     $(".carousel-indicators li").removeClass("active");
      $(this).children("div.item").removeClass("active");
     if(i==l)
     {
        $(".carousel-indicators li:nth-child(1)").addClass("active");
        $(".additem div.item:nth-child(1)").addClass("active");
     }
     else{
         i++;
         $(".carousel-indicators li:nth-child("+i+")").addClass("active");
        $(".additem div.item:nth-child("+i+")").addClass("active");
     }
     setMsgBoxHeight();
     }
  });
  $(".additem").on("swiperight",function(){
  if(app.isMobile){
     var i = $(this).children("div.item.active").index()+1;
     var l = $(this).children("div.item").length;
     $(".carousel-indicators li").removeClass("active");
      $(this).children("div.item").removeClass("active");
     if(i==1)
     {
        $(".carousel-indicators li:nth-child("+l+")").addClass("active");
        $(".additem div.item:nth-child("+l+")").addClass("active");
     }
     else{
         i--;
         $(".carousel-indicators li:nth-child("+i+")").addClass("active");
        $(".additem div.item:nth-child("+i+")").addClass("active");
     }
      setMsgBoxHeight();
      }
  });



    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
