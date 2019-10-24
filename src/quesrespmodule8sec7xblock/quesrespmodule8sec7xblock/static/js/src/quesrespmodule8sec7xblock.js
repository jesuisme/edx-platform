/* Javascript for QuesRespModule8Sec7XBlock. */



       


function TryA(obj){
       $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');
    }
    function TryA1(obj){
        $(obj).closest('.item.active').find('div .ans').removeAttr('isclick');
       $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns1");      
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');
      TmpAns=[];
    }
    
    function checkAnswer(obj, f) {
            //console.log($(obj).parents(".row-eq-height"));
       
            $(obj).closest('.row-eq-height').addClass('Dis');
            $('.item.active div').removeClass("incorrect").removeClass("selectedAns");
            $(obj).parents(".eq-h").find(".ans")
            $(obj).parents(".white").removeClass("correct incorrect");
            if($(obj).html().trim()=='Priming')
            {
                $(obj).closest('.item').find('.incorrectMsg .MsgTxt').html('Priming occurs when you have individuals write out their intentions.')
            }
            if($(obj).html().trim()=='Nudging')
            {
                $(obj).closest('.item').find('.incorrectMsg .MsgTxt').html('&#x2018;Nudge&#x2019; is the umbrella term, while this specific concept is a principle of nudge.')
            }
            if (f === 1) {
                $(obj).addClass('selectedAns').parents('.white').addClass('correct');
            } else if (f === 0) {
                $(obj).addClass('selectedAns').parents('.white').addClass('incorrect');
            } else {
                $(obj).addClass('selectedAns').parents('.white').addClass('correct bothCorrect');
                //alert(f);
                $("." + f).removeClass("hide");
            }
        }
        var TmpAns=[];
        function checkAnswer_1(obj){
            var Ans=[
            'Justification requirements that force the prescriber to note the reason he or she is prescribing an opiate',
            'A peer comparison system that shows prescribers where they rank relative to one another and Top Performers who do not over-prescribe opiates'
            ];
            if(Ans.indexOf($(obj).html().trim())!=-1)
            {
                TmpAns.push('true');
                $(obj).addClass('incorrect2');
                $(obj).attr('isclick','true');
            }
            else{
                TmpAns.push('false');
                $(obj).addClass('incorrect2');
                $(obj).attr('isclick','true');
            }
            
            var numItems = $('.incorrect2').length;
            //alert(numItems);
            //if(TmpAns.length==2){
            if(numItems==2){
                
                $(obj).closest('.row-eq-height').addClass('Dis');
                $(obj).parents('.white').find('[isclick]').removeClass('incorrect2').addClass('selectedAns1');
                if(TmpAns[0]=='true' && TmpAns[1]=='true')
                {
                    $(obj).addClass('selectedAns1').parents('.white').addClass('correct');
                }
                else if(TmpAns[0]=='false' && TmpAns[1]=='false'){
                    $(obj).closest('.item').find('.incorrectMsg .MsgTxt').html('This intervention lacks a social component, and is less likely to be effective according to nudge theory.');
                    $(obj).addClass('selectedAns1').parents('.white').addClass('incorrect');
                }
                else{
                    $(obj).closest('.item').find('.incorrectMsg .MsgTxt').html('This is half right, but think about the social component of nudge theory. Which two options would most elicit peer-based behavioral change?');
                    $(obj).addClass('selectedAns1').parents('.white').addClass('incorrect');
                    //alert('correct or incorrect both');
                }
                
            }
            
        }
        



function QuesRespModule8Sec7XBlock(runtime, element) {

   $(function () {
              //  setMsgBoxHeight();
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
       $('.item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
      // alert(id);
          
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
         //setMsgBoxHeight();

      });



    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
