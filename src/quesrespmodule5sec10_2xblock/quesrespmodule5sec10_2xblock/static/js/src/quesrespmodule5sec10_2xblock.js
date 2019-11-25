/* Javascript for QuesRespModule5Sec102XBlock. */




function hideB() {
    $('#mcq10_2a,#mcq10_2b,#mcq10_2c').hide();
}
function TryB() {
    hideB();
    $('.ansB').removeClass('pontNone');
    $('.ansB').removeClass('selectedWro');
}


function checkAnswerB(obj, f) {
   
    
    if ($(obj).text().trim() == 'Radar chart') {
        hideB();
        $('#mcq10_2a').show();
        $(obj).addClass('selectedRigh');
        $('.ansB').addClass('pontNone');
    } else if ($(obj).text().trim() == 'TDABC calculation') {
        hideB();
        $('#mcq10_2b').show();
        $(obj).addClass('selectedWro');
        $('.ansB').addClass('pontNone');
    } else {
        hideB();
        $('#mcq10_2c').show();
        $(obj).addClass('selectedWro');
        $('.ansB').addClass('pontNone');
    }

}







function QuesRespModule5Sec102XBlock(runtime, element) {


    // $(function () {
    // setMsgBoxHeightB();
    // });
    
    // function setMsgBoxHeightB() {
    // var f_height = 0;
    // var msgboxHeight = $(".carousel .active .row-eq-height").height();
    // var l = $(".carousel .active .ansB").length;
    // for(var i=1;i<=l;i++)
    // {
    // var h =  $(".carousel .active .row-eq-height div:nth-child("+i+") .ansB").css("height");
    // var h1 = h.split('p');
    // if(f_height < Number(h1[0]))
    // {
    // f_height = h1[0];
    // }
    // }
    // $(".carousel .active .ansB").css("height",f_height+"px");    
    // }

    // function setMsgBoxHeightC() {
    // var f_height = 0;
    // var msgboxHeight = $(".carousel .active .row-eq-height").height();
    // var l = $(".carousel .active .ansC").length;
    // for(var i=1;i<=l;i++)
    // {
    // var h =  $(".carousel .active .row-eq-height div:nth-child("+i+") .ansC").css("height");
    // var h1 = h.split('p');
    // if(f_height < Number(h1[0]))
    // {
    // f_height = h1[0];
    // }
    // }
    // $(".carousel .active .ansC").css("height",f_height+"px");    
    // }



    $('.carousel').on('slid.bs.carousel', function (e) {
        $('.item .ans').removeClass('Dis');
        $('.item .ans').removeClass('DisB');
        var id = parseInt(e.relatedTarget.id);

    });



$(function ($) {
/* Here's where you'd do things on page load. */
});
}
