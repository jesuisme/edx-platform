/* Javascript for QuesAnsModule3Section3XBlock. */
function TryA(obj){
     $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');     
    }


    function checkAnswer(obj, f) {
            //console.log($(obj).parents(".row-eq-height"));
        // var TempJson=JasonData;
        // TempJson.item_id="m3s3";
        // TempJson.test_name="Dell Med\\ Module 3\\ Section 3 Item";
        // TempJson.test_id="m3s3t002";
        // TempJson.student_id=app.Decrypt(app.LoginEmail);
        // TempJson.item_stem=$(obj).closest('.item').find('.ques').text();
        // var options=$(obj).closest('.row-eq-height').find('.ans');
        // TempJson.options = new Array();
        // $.each(options,function(i,v)
        // {
        //     TempJson.options.push({
        //         "letter" : i,
        //         "text"  : $(v).text().trim(),
        //         "selected":$(v).text().trim() == $(obj).text().trim() ? true : false,
        //         "correct":  $(v).attr('onclick').indexOf('1')!=-1 ? true : false,
        //     });
        // })
           $(obj).closest('.row-eq-height').addClass('Dis');
            $('#myCarousel_a .item.active div').removeClass("incorrect").removeClass("selectedAns");
            $(obj).parents(".eq-h").find(".ans")
            $(obj).parents(".white").removeClass("correct incorrect");
            if (f === 1) {
                $(obj).addClass('selectedAns').parents('#myCarousel_a .white').addClass('correct');
            } else if (f === 0) {
                $(obj).addClass('selectedAns').parents('#myCarousel_a .white').addClass('incorrect');
            } else {
                $(obj).addClass('selectedAns').parents('#myCarousel_a .white').addClass('correct bothCorrect');
                //alert(f);
                $(".5401, .2497").addClass("hide");
                $("." + f).removeClass("hide");
            }
            // app.SaveJson(JSON.stringify(TempJson));
        }

    
    function TryAB(obj) {
    $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }        
        
    function checkAnswerA(obj, f) {
            //console.log($(obj).parents(".row-eq-height"));
        // var TempJson=JasonData;
        // TempJson.item_id="m3s3";
        // TempJson.test_name="Dell Med\\ Module 3\\ Section 3 Item";
        // TempJson.test_id="m3s3t001";
        // TempJson.student_id=app.Decrypt(app.LoginEmail);
        // TempJson.item_stem=$(obj).closest('.item').find('.ques').text();
        // var options=$(obj).closest('.row-eq-height').find('.ans');
        // TempJson.options = new Array();
        // $.each(options,function(i,v)
        // {
        //     TempJson.options.push({
        //         "letter" : i,
        //         "text"  : $(v).text().trim(),
        //         "selected":$(v).text().trim() == $(obj).text().trim() ? true : false,
        //         "correct":  $(v).attr('onclick').indexOf('1')!=-1 ? true : false,
        //     });
        // })
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
            // app.SaveJson(JSON.stringify(TempJson));
    }



function QuesAnsModule3Section3XBlock(runtime, element) {

            $(function () {
                setMsgBoxHeight1();
                setMsgBoxHeight2();
        });
        function setMsgBoxHeight1() {
        var f_height = 0;
            var msgboxHeight = $("#my-Carousel1 .carousel .active .row-eq-height").height();
             var l = $("#my-Carousel1 .carousel .active .ans").length;
              for(var i=1;i<=l;i++)
              {
              var h =  $("#my-Carousel1 .carousel .active .row-eq-height div:nth-child("+i+") .ans").css("height");
              var h1 = h.split('p');
             if(f_height < Number(h1[0]))
             {
                f_height = h1[0];
             }
            }
           $("#my-Carousel1 .carousel .active .ans").css("height",f_height+"px");      
    }
    function setMsgBoxHeight2() {
        var f_height = 0;
            var msgboxHeight = $("#my-Carousel2 .carousel .active .row-eq-height").height();
             var l = $("#my-Carousel2 .carousel .active .ans").length;
              for(var i=1;i<=l;i++)
              {
              var h =  $("#my-Carousel2  .carousel .active .row-eq-height div:nth-child("+i+") .ans").css("height");
              var h1 = h.split('p');
             if(f_height < Number(h1[0]))
             {
                f_height = h1[0];
             }
            }
           $("#my-Carousel2 .carousel .active .ans").css("height",f_height+"px");      
    }

$('.carousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       $('.item .ans').removeClass('DisB');
       var id = parseInt(e.relatedTarget.id);
          if(id == 0){
              $('.left_a').hide();
              $('.right_a').show();
               setMsgBoxHeight1();
          }else if(id == 1){
            $('.left_a').show();
            $('.right_a').hide();
            setMsgBoxHeight1();
         }else if(id == 2){
              $('.left_b').hide();  
              $('.right_b').show();
                 setMsgBoxHeight2();
          }else if(id == 11){
            $('.left_b').show();
            $('.right_b').hide();
             setMsgBoxHeight2();
          } else {
            $('.left_b').show();
            $('.right_b').show();
             setMsgBoxHeight2();
          }
           
      });


    

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}





