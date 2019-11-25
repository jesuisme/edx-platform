/* Javascript for QuesRespModule10Sec4XBlock. */



function TryA(obj){
    $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }


    function checkAnswerA(obj, f) {
    
            //$('.item .ans').addClass('Dis');
            
            if($(obj).hasClass("customansclass1a"))
              {
                if(obj.innerText=="It isn&#x2019;t attainable")
                {
                   $("#incorrectmsg1").html("This decrease in readmission rates is likely attainable.");
                }
                else
                {
                   $("#incorrectmsg1").html('Because it specifies a percentage-decrease goal as well as the location, this is a measurable SMART goal.');
                }
                }
                if($(obj).hasClass("customansclass2a"))
               {
                if(obj.innerText=="Stakeholder mapping")
                {
                   $("#incorrectmsg2").html("Stakeholder mapping doesn't necessarily involve observing work being down where it physically occurs.");
                }
                 else 
                {
                   $("#incorrectmsg2").html("Creating project charters doesn't necessarily involve observing work being down where it physically occurs.");
                }               
              }
            
            
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





function QuesRespModule10Sec4XBlock(runtime, element) {

//   $(document).ready(function(){
//     setMsgBoxHeight();
// });

$('#myCarousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
       console.log("10.4 id--", id);
         
          if(id == 0){
              $('.left1').hide();              
              $('.right1').show();
          }else if(id == 2){
            $('.left1').show();
            $('.right1').hide();
          } else {
            $('.left1').show();
            $('.right1').show();
          }
          // setMsgBoxHeight();
      });
    
      
    //     function setMsgBoxHeight() {
    // var f_height = 0;
    //         var msgboxHeight = $(".carousel .active .row-eq-height").height();
    //    var l = $(".carousel .active .ans").length;
    //     for(var i=1;i<=l;i++)
    //     {
    //     var h =  $(".carousel .active .row-eq-height div:nth-child("+i+") .ans").css("height");
    //     var h1 = h.split('p');
    //    if(f_height < Number(h1[0]))
    //    {
    //       f_height = h1[0];
    //    }
    //   }
    //        $(".carousel .active .ans").css("height",f_height+"px"); 
    //     $(".carousel .active .ans").css("line-height","block-height !important");      
    // }
    
//   $("#my-Carousel1 .additem").on("swipeleft",function(){
//   if(app.isMobile){
//      var i = $(this).children("div.item.active").index()+1;
//    var l = $(this).children("div.item").length;
//    $("#my-Carousel1 .carousel-indicators li").removeClass("active");
//     $(this).children("div.item").removeClass("active");
//      if(i==l)
//    {
//       $("#my-Carousel1 .carousel-indicators li:nth-child(1)").addClass("active");
//       $("#my-Carousel1 .additem div.item:nth-child(1)").addClass("active");
//    }
//    else{
//        i++;
//      $("#my-Carousel1 .carousel-indicators li:nth-child("+i+")").addClass("active");
//       $("#my-Carousel1 .additem div.item:nth-child("+i+")").addClass("active");
//    }
//    // setMsgBoxHeight();
// }
//   });
//   $("#my-Carousel1 .additem").on("swiperight",function(){
//   if(app.isMobile){
//      var i = $(this).children("div.item.active").index()+1;
//    var l = $(this).children("div.item").length;
//    $("#my-Carousel1 .carousel-indicators li").removeClass("active");
//     $(this).children("div.item").removeClass("active");
//      if(i==1)
//    {
//       $("#my-Carousel1 .carousel-indicators li:nth-child("+l+")").addClass("active");
//       $("#my-Carousel1 .additem div.item:nth-child("+l+")").addClass("active");
//    }
//    else{
//        i--;
//      $("#my-Carousel1 .carousel-indicators li:nth-child("+i+")").addClass("active");
//       $("#my-Carousel1 .additem div.item:nth-child("+i+")").addClass("active");
//    }
//      // setMsgBoxHeight();
// }
//   });

   

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
