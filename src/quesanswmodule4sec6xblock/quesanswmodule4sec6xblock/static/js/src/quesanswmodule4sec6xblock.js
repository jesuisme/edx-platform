/* Javascript for QuesAnsModule4Sec6XBlock. */


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
    
  
//$('.carousel').on('slid.bs.carousel', function (e) {
// $('#myCarousel2').on('slid.bs.carousel', function (e) {
//        $('.item .ans').removeClass('Dis');
//        //var id = parseInt(e.relatedTarget.id); 
//           var id = e.relatedTarget.id; 
//           //alert(id);
//           if(id == 'a0'){
//               $('.left2').hide();              
//               $('.right2').show();
//           }else if(id == 'a4'){
//             $('.left2').show();
//             $('.right2').hide();
//           } else {
//             $('.left2').show();
//             $('.right2').show();
//           }
//          // setMsgBoxHeight();

//       });


 function TryA(obj) {
    $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
    }
    
    function checkAnswer(obj, f) {
        // var TempJson=JasonData;
        // TempJson.item_id="m4s6";
        // TempJson.test_name="Dell Med\\ Module 4\\ Section 6 Item";
        // TempJson.test_id="m4s6t001";
        // // TempJson.student_id=app.Decrypt(app.LoginEmail);
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
        // });
             if($(obj).hasClass("customansclass1"))
              {
                if(obj.innerText=="Enhanced Access")
                {
                   $(".txtincrect1").html("Enhanced access is one of the key tenants of a PCMH.");
                }
                else if(obj.innerText=="Data Dashboard")
                {
                   $(".txtincrect1").html("A data dashboard could be a way providers in a PCMH view quality and safety data.");
                }
                else if(obj.innerText=="Continuity of Care")
                {
                   $(".txtincrect1").html("Continuity of care is central to a PCMH.");
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
        




function QuesAnsModule4Sec6XBlock(runtime, element) {


  $('#myCarousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       //var id = parseInt(e.relatedTarget.id); 
          var id = e.relatedTarget.id; 
          //alert(id);
          if(id == '0'){
              $('.left1').hide();              
              $('.right1').show();
          }else if(id == '2'){
            $('.left1').show();
            $('.right1').hide();
          } else {
            $('.left1').show();
            $('.right1').show();
          }
         // setMsgBoxHeight();

      }); 

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
