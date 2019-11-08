/* Javascript for QuesRespModule3Sec7XBlock. */


 
function TryA(obj){
      $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }


    function checkAnswer(obj, f) {
        
              if($(obj).hasClass("customansclass1"))
              {
                if(obj.innerText=="$300 + $185 co-pay = $485")
                {
                   $(".txtincrect1").html("Grace must first meet her deductible before a coinsurance is applied.");
                }
                else if(obj.innerText=="$1200")
                {
                   $(".txtincrect1").html("Co-pays generally do NOT count towards a deductible and are paid for separately.");
                }
                else if(obj.innerText=="$185 co-pay")
                {
                   $(".txtincrect1").html("Grace also has to meet her deductible.");
                }
                else
                {
                $(".txtincrect1").html("");
                }
              }
              if($(obj).hasClass("customansclass2"))
              {
                if(obj.innerText=="$1000 + $185 co-pay = $1185")
                {
                   $(".txtincrect2").html("Grace must first meet her deductible before a coinsurance is applied.");
                }
                else if(obj.innerText=="$185 co-pay")
                {
                   $(".txtincrect2").html("Grace also has to meet her deductible.");
                }
                else if(obj.innerText=="$5000")
                {
                   $(".txtincrect2").html("Grace also has co-pays as part of her plan.");
                }
                else
                {
                $(".txtincrect2").html("");
                }
              }
              
             if($(obj).hasClass("customansclass3"))
              {
                if(obj.innerText=="$3000")
                {
                   $(".txtincrect3").html("This is the amount negotiated by commercial insurance company A; Ms. Chen does not have insurance.");
                }
                else if(obj.innerText=="$930")
                {
                   $(".txtincrect3").html("This is the total amount these services would cost the hospital under TDABC calculations only.");
                }
                else if(obj.innerText=="$0")
                {
                   $(".txtincrect3").html("Those without insurance must pay the entire amount.");
                }
                else
                {
                $(".txtincrect3").html("");
                }
             }
             
              if($(obj).hasClass("customansclass4"))
              {
                if(obj.innerText=="$1500")
                {
                   $(".txtincrect4").html("Grace only pays up to her deductible and then a coinsurance after this is met.");
                }
                else if(obj.innerText=="$0")
                {
                   $(".txtincrect4").html("Grace has copays and a deductible as part of her plan.");
                }
                else
                {
                $(".txtincrect4").html("");
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
        



function QuesRespModule3Sec7XBlock(runtime, element) {
    console.log('in ques res');
    $('#myCarousel').on('slid.bs.carousel', function (e) {
            console.log('TEDASSA');
           $('.item.active').removeClass('Dis');
           var id = parseInt(e.relatedTarget.id);
           console.log('id-3.7-',id);
             
              if(id == 0){
                  $('.left1').hide();              
                  $('.right1').show();
              }else if(id == 3){
                $('.left1').show();
                $('.right1').hide();
              } else {
                $('.left1').show();
                $('.right1').show();
                }
    });






    $(function ($) {
       
    });
}
