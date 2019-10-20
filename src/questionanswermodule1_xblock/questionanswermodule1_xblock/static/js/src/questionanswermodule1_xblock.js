/* Javascript for QuestionAnsXBlock. */

function checkAnswer(obj, f) {
    console.log('checkAnswer func---',obj);
    console.log('checkAnswer func-f--',f);


    $(obj).closest('.row-eq-height').addClass('Dis');
    $('.item.active div').removeClass("incorrect").removeClass("selectedAns");
    $(obj).parents(".eq-h").find(".ans")
    $(obj).parents(".white").removeClass("correct incorrect");
    console.log('obj here---',obj);
    console.log('obj f here---',f);
    console.log('obj f here--type-',typeof(f));
    if (f === 1) {
        console.log('f is 1');
        $(obj).addClass('selectedAns').parents('.white').addClass('correct');
    } else if (f === 0) {
        console.log('f is 0');
        $(obj).addClass('selectedAns').parents('.white').addClass('incorrect');
    } else {
        $(obj).addClass('selectedAns').parents('.white').addClass('correct bothCorrect');
        $(".5401, .2497").addClass("hide");
        $("." + f).removeClass("hide");
    }
}


function TryA(obj){
        console.log('try A');
        $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');

}






// function checkAnswer(obj, f) {
//             //console.log($(obj).parents(".row-eq-height"));
  
//         var options=$(obj).closest('.row-eq-height').find('.ans');
//         options = new Array();
//         $.each(options,function(i,v)
//         {
//             options.push({
//                 "letter" : i,
//                 "text"  : $(v).text().trim(),
//                 "selected":$(v).text().trim() == $(obj).text().trim() ? true : false,
//                 "correct":  $(v).attr('onclick').indexOf('1')!=-1 ? true : false,
//             });
//         })
//             $(obj).closest('.row-eq-height').addClass('Dis');
//             $('.item.active div').removeClass("incorrect").removeClass("selectedAns");
//             $(obj).parents(".eq-h").find(".ans")
//             $(obj).parents(".white").removeClass("correct incorrect");
//             if (Number(f) == 1) {
//                 $(obj).addClass('selectedAns').parents('.white').addClass('correct');
//             } else if (Number(f) == 0) {
//                 $(obj).addClass('selectedAns').parents('.white').addClass('incorrect');
//             } else {
//                 $(obj).addClass('selectedAns').parents('.white').addClass('correct bothCorrect');
//                 //alert(f);
//                 $(".5401, .2497").addClass("hide");
//                 $("." + f).removeClass("hide");
//             }
//             app.SaveJson(JSON.stringify(TempJson));
//     }


function QuestionAnsXBlock(runtime, element) {


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


    $('#second_slide').on('click', function () {
      console.log('second slide');  
      $('.additem .item').removeClass('active');
      $('.slide-indicator .dotslide').removeClass('active');
      $('#second_slide').addClass('active');
      $('.additem #1').addClass('active');
    });

    $('#first_slide').on('click', function () {
      console.log('first slide');  
      $('.additem .item').removeClass('active');
      $('.slide-indicator .dotslide').removeClass('active');
      $('#first_slide').addClass('active');
      $('.additem #0').addClass('active');
    });

    $('#third_slide').on('click', function () {
      console.log('third slide');  
      $('.additem .item').removeClass('active');
      $('.slide-indicator .dotslide').removeClass('active');
      $('#third_slide').addClass('active');
      $('.additem #2').addClass('active');
    });




    var p =1;
    var slide_num = 0;
       $('.carousel').on('slid.bs.carousel', function (e) {
           //$('.item .ans').removeClass('Dis');
            //$('.item').removeClass('Dis');
           var id = parseInt(e.relatedTarget.id);
           $('.slide-indicator .dotslide').removeClass('active');


              if(id == 0){
                  $('#first_slide').addClass('active');
                  $('.left').hide();
                  $('.right').show();
              }else if(id == 2){
                $('#third_slide').addClass('active');
                $('.left').show();
                $('.right').hide();
              }  else {
                $('#second_slide').addClass('active');
                $('.left').show();
                $('.right').show();
              }  
                    // setMsgBoxHeight();       
        });



    



    
        
    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
