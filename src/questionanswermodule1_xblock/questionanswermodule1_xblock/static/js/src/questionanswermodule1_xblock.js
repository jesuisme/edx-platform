/* Javascript for QuestionAnsXBlock. */

function checkAnswer(obj, f) {
    $(obj).closest('.row-eq-height').addClass('Dis');
    $('.item.active div').removeClass("incorrect").removeClass("selectedAns");
    $(obj).parents(".eq-h").find(".ans")
    $(obj).parents(".white").removeClass("correct incorrect");
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
        $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');

}









function QuestionAnsXBlock(runtime, element) {



    $('#second_slide').on('click', function () {
      $('.additem .item').removeClass('active');
      $('.slide-indicator .dotslide').removeClass('active');
      $('#second_slide').addClass('active');
      $('.additem #1').addClass('active');
    });

    $('#first_slide').on('click', function () {
      $('.additem .item').removeClass('active');
      $('.slide-indicator .dotslide').removeClass('active');
      $('#first_slide').addClass('active');
      $('.additem #0').addClass('active');
    });

    $('#third_slide').on('click', function () {
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
