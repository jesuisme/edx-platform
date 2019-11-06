/* Javascript for QuesAnsModule5Sec103XBlock. */




function hideC() {
    $('#mcq10_3a,#mcq10_3b,#mcq10_3c').hide();
}
function TryC() {
    hideC();
    $('.ansC').removeClass('pontNone');
    $('.ansC').removeClass('selectedWro');
}

function checkAnswerC(obj, f) {
    if ($(obj).text().trim() == 'Time-Driven Activity-Based Costing') {
        hideC();
        $('#mcq10_3a').show();
        $(obj).addClass('selectedRigh');
        $('.ansC').addClass('pontNone');
    } else if ($(obj).text().trim() == 'Fee-For-Service') {
        hideC();
        $('#mcq10_3b').show();
        $(obj).addClass('selectedWro');
        $('.ansC').addClass('pontNone');
    } else {
        hideC();
        $('#mcq10_3c').show();
        $(obj).addClass('selectedWro');
        $('.ansC').addClass('pontNone');
    }
    // app.SaveJson(JSON.stringify(TempJson));

}


function QuesAnsModule5Sec103XBlock(runtime, element) {


    $(function () {
// setMsgBoxHeight();
// setMsgBoxHeightB();
setMsgBoxHeightC();
});

function setMsgBoxHeightC() {
var f_height = 0;
var msgboxHeight = $(".carousel .active .row-eq-height").height();
var l = $(".carousel .active .ansC").length;
for(var i=1;i<=l;i++)
{
var h =  $(".carousel .active .row-eq-height div:nth-child("+i+") .ansC").css("height");
var h1 = h.split('p');
if(f_height < Number(h1[0]))
{
f_height = h1[0];
}
}
$(".carousel .active .ansC").css("height",f_height+"px");    
}



$('.carousel').on('slid.bs.carousel', function (e) {
    $('.item .ans').removeClass('Dis');
    $('.item .ans').removeClass('DisB');
    var id = parseInt(e.relatedTarget.id);

});


// function hideA() {
//     $('#mcq10_1a,#mcq10_1b,#mcq10_1c').hide();
// }












$(function ($) {
/* Here's where you'd do things on page load. */
});
}
