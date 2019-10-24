function TryA(obj){
          $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
          //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
          $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');

        }

 
    function checkAnswer(obj, f) {
    
            //console.log($(obj).parents(".row-eq-height"));
        var TempJson=JasonData;
        // TempJson.item_id="m2s5";
        // TempJson.test_name="Dell Med\\ Module 2\\ Section 5 Item";
        // TempJson.test_id="m2s5t001";
        // TempJson.student_id=app.Decrypt(app.LoginEmail);
        TempJson.item_stem=$(obj).closest('.item').find('.ques').text();
        var options=$(obj).closest('.row-eq-height').find('.ans');
        TempJson.options = new Array();
        $.each(options,function(i,v)
        {
            TempJson.options.push({
                "letter" : i,
                "text"  : $(v).text().trim(),
                "selected":$(v).text().trim() == $(obj).text().trim() ? true : false,
                "correct":  $(v).attr('onclick').indexOf('1')!=-1 ? true : false,
            });
        })
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
                //alert(f);
                $(".5401, .2497").addClass("hide");
                $("." + f).removeClass("hide");
            }
            app.SaveJson(JSON.stringify(TempJson));
        }
/* Javascript for MultichoiceM2S5XBlock. */
function MultichoiceM2S5XBlock(runtime, element) {
   var n = 0;
   $('.carousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
          if(id == 0){
              $('.left').hide();
              $('.right').show();
          }else if(id == 9){
            $('.left').show();
            $('.right').hide();
          }  else {
            $('.left').show();
            $('.right').show();
          }
                setMsgBoxHeight();        
      });

        /*$(document).ready(function(){
             $('.video-js').inview({
                'onEnter': function($object) {
                    $('video').trigger('play');
                  },
                  'onLeave': function($object) {
                    $('video').trigger('pause');
                  }
              });

             //shufMCQ();

          });*/


        //var arrayS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

        /*function shuffle(o){ 
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }*/

        // shuffle(arrayS);
        // function shufMCQ(){
        //     $('#s_'+arrayS[0]).show();
        //     $('#s_'+arrayS[1]).hide();
        //     $('#s_'+arrayS[2]).hide();
        //     $('#s_'+arrayS[3]).hide();
        //     $('#s_'+arrayS[4]).hide();
        //     $('#s_'+arrayS[5]).hide();
        //     $('#s_'+arrayS[6]).hide();
        //     $('#s_'+arrayS[7]).hide();
        //     $('#s_'+arrayS[8]).hide();
        //     $('#s_'+arrayS[9]).hide();
        //     $('#s_'+arrayS[10]).hide();
        //     $('#s_'+arrayS[11]).hide();
        //     $('#s_'+arrayS[12]).hide();
        //     $('#s_'+arrayS[13]).hide();
        //     $('#s_'+arrayS[14]).hide();
        //     $('#s_'+arrayS[15]).hide();
        // }

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
        $(".additem div.item:nth-child(1) .ans").removeClass('Dis');
     }
     else{
         i++;
         $(".carousel-indicators li:nth-child("+i+")").addClass("active");
        $(".additem div.item:nth-child("+i+")").addClass("active");
         $(".additem div.item:nth-child("+i+") .ans").removeClass('Dis');
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
         $(".additem div.item:nth-child("+i+") .ans").removeClass('Dis');
     }
     else{
         i--;
         $(".carousel-indicators li:nth-child("+i+")").addClass("active");
        $(".additem div.item:nth-child("+i+")").addClass("active");
         $(".additem div.item:nth-child("+i+") .ans").removeClass('Dis');
     }
     setMsgBoxHeight();
     }
  });
}
