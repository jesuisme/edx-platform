/* Javascript for QuesRespModule6Sec3XBlock. */



$('#myCarousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
         
        /*  if(id == 0){
              $('.left1').hide();              
              $('.right1').show();
          }else if(id == 3){
            $('.left1').show();
            $('.right1').hide();
          } else {
            $('.left1').show();
            $('.right1').show();
          }*/
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
           $(".txtincrect1").html("While this is an extremely important part of the conversation (as we will discuss further below), it is not usually effective to lead with this part of the discussion. The foremost consideration should be why this medication is expected to be helpful. This information is required to appropriately frame the discussion about cost and necessity.");
        }
          else if(obj.innerText=="Directions for taking the medication")
        {
           $(".txtincrect1").html("Prior to discussing directions for taking the medication, the prescriber should explain the intended purpose of the medication and the expected benefits and potential risks. They also should likely then discuss the medication&#x2019;s cost and ability of patient to afford this medication, prior to discussing specific directions for usage.");
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




function QuesRespModule6Sec3XBlock(runtime, element) {


    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
