/* Javascript for QuesRespModule3Sec4XBlock. */


      

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
        



function QuesRespModule3Sec4XBlock(runtime, element) {


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
    }
    
$('#myCarousel').on('slid.bs.carousel', function (e) {
   console.log("clider====");
       $('.item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
       console.log("id-----", id);
          
          if(id == 0){          
            //alert('a');
              $('.left1').hide();              
              $('.right1').show();
          }else if(id == 5) {
            $('.left1').show();
            $('.right1').hide();
          } else {
            $('.left1').show();
            $('.right1').show();
          }
          
         setMsgBoxHeight();
         
      });

    // function updateCount(result) {
    //     $('.count', element).text(result.count);
    // }

    // var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    // $('p', element).click(function(eventObject) {
    //     $.ajax({
    //         type: "POST",
    //         url: handlerUrl,
    //         data: JSON.stringify({"hello": "world"}),
    //         success: updateCount
    //     });
    // });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
