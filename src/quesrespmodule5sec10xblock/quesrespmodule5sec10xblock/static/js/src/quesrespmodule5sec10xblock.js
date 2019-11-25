/* Javascript for QuesRespModule5Sec10XBlock. */




function hideA() {
    $('#mcq10_1a,#mcq10_1b,#mcq10_1c').hide();
}
function TryA() {
    hideA();
    $('.ans').removeClass('pontNone');
    $('.ans').removeClass('selectedWro');
}

function checkAnswerA(obj, f) {
   
    console.log("obj===", obj);
    if ($(obj).text().trim() == 'Opportunity-index scatterplot') {
        hideA();
        $('#mcq10_1a').show();
        $(obj).addClass('selectedRigh');
        $('.ans').addClass('pontNone');
    } else if ($(obj).text().trim() == 'TDABC calculation') {
        hideA();
        $('#mcq10_1b').show();
        $(obj).addClass('selectedWro');
        $('.ans').addClass('pontNone');
    } else {
        hideA();
        $('#mcq10_1c').show();
        $(obj).addClass('selectedWro');
        $('.ans').addClass('pontNone');
    }
}











function QuesRespModule5Sec10XBlock(runtime, element) {


//     $(function () {
// setMsgBoxHeight();
// });
// function setMsgBoxHeight() {
// var f_height = 0;
// var msgboxHeight = $(".carousel .active .row-eq-height").height();
// var l = $(".carousel .active .ans").length;
// for(var i=1;i<=l;i++)
// {
// var h =  $(".carousel .active .row-eq-height div:nth-child("+i+") .ans").css("height");
// var h1 = h.split('p');
// if(f_height < Number(h1[0]))
// {
// f_height = h1[0];
// }
// }
// $(".carousel .active .ans").css("height",f_height+"px");    
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
