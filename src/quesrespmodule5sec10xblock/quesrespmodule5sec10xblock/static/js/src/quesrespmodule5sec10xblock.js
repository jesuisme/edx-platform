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
    // var TempJson=JasonData;
    // TempJson.item_id="m5s10";
    // TempJson.test_name="Dell Med\\ Module 5\\ Section 10 Item";
    // TempJson.test_id="m5s10t001";
    // TempJson.student_id=app.Decrypt(app.LoginEmail);
    // TempJson.item_stem="Dr. Barbara Malone, the Chief Hospital Administrator, has found that Scottsdale Memorial&#x2019;s costs of care have been higher than those of its competitors for some time, but isn&#x2019;t sure of the cause of this. She thinks it&#x2019;s possible that, due to its proximity to neighborhoods with higher levels of geriatric individuals, the hospital may receive higher-cost patients. However, she also believes that there is a lot of variation between the practices of the clinicians working at the hospital. You agree that identifying where this issue is coming from, will be an important first step. You suggest she use a:";
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
    // app.SaveJson(JSON.stringify(TempJson));
}



// function hideB() {
//     $('#mcq10_2a,#mcq10_2b,#mcq10_2c').hide();
// }
// function TryB() {
//     hideB();
//     $('.ansB').removeClass('pontNone');
//     $('.ansB').removeClass('selectedWro');
// }


// function checkAnswerB(obj, f) {
//     // var TempJson=JasonData;
//     // TempJson.item_id="m5s10";
//     // TempJson.test_name="Dell Med\\ Module 5\\ Section 10 Item";
//     // TempJson.test_id="m5s10t002";
//     // TempJson.student_id=app.Decrypt(app.LoginEmail);
//     // TempJson.item_stem="Through use of the opportunity index scatterplot, it was clear that one physician, Dr. Franks, had higher costs compared to other clinicians. This could mean many things, including that he simply has more complex patients or a higher caseload. After watching him on rounds, however, you notice that he often recommends to patients the most intensive and costly interventions. Although in some selected situations, these options may be most efficacious and clinically appropriate, you haven&#x2019;t seen him routinely have conversations with patients to explain potential treatment options, alternatives, and to identify goals with his patients. What tool might Dr. Franks use to have these conversations and collaboratively identify the most appropriate treatments based on his individual patients&#x2019; goals?";
//     // var options=$(obj).closest('.row-eq-height').find('.ansB');
//     // TempJson.options = new Array();
//     // $.each(options,function(i,v)
//     // {
//     //     TempJson.options.push({
//     //         "letter" : i,
//     //         "text"  : $(v).text().trim(),
//     //         "selected":$(v).text().trim() == $(obj).text().trim() ? true : false,
//     //         "correct":  $(v).attr('onclick').indexOf('1')!=-1 ? true : false,
//     //     });
//     // });
//     if ($(obj).text().trim() == 'Radar chart') {
//         hideB();
//         $('#mcq10_2a').show();
//         $(obj).addClass('selectedRigh');
//         $('.ansB').addClass('pontNone');
//     } else if ($(obj).text().trim() == 'TDABC calculation') {
//         hideB();
//         $('#mcq10_2b').show();
//         $(obj).addClass('selectedWro');
//         $('.ansB').addClass('pontNone');
//     } else {
//         hideB();
//         $('#mcq10_2c').show();
//         $(obj).addClass('selectedWro');
//         $('.ansB').addClass('pontNone');
//     }
//     // app.SaveJson(JSON.stringify(TempJson));

// }



// function hideC() {
//     $('#mcq10_3a,#mcq10_3b,#mcq10_3c').hide();
// }
// function TryC() {
//     hideC();
//     $('.ansC').removeClass('pontNone');
//     $('.ansC').removeClass('selectedWro');
// }

// function checkAnswerC(obj, f) {
//     // var TempJson=JasonData;
//     // TempJson.item_id="m5s10";
//     // TempJson.test_name="Dell Med\\ Module 5\\ Section 10 Item";
//     // TempJson.test_id="m5s10t003";
//     // TempJson.student_id=app.Decrypt(app.LoginEmail);
//     // TempJson.item_stem="A common refrain is that patients get frustrated by everything from aspirin to chemotherapy costing more than they believe it should. Some of the clinicians express that everything would make a lot more sense if they could better understand what actual costs are. A method of costing that accurately measures costs of the clinicians, equipment, space, and overhead used on a minute-to-minute basis in all processes of care for each specific care episode is:";
//     // var options=$(obj).closest('.row-eq-height').find('.ansC');
//     // TempJson.options = new Array();
//     // $.each(options,function(i,v)
//     // {
//     //     TempJson.options.push({
//     //         "letter" : i,
//     //         "text"  : $(v).text().trim(),
//     //         "selected":$(v).text().trim() == $(obj).text().trim() ? true : false,
//     //         "correct":  $(v).attr('onclick').indexOf('1')!=-1 ? true : false,
//     //     });
//     // });
//     if ($(obj).text().trim() == 'Time-Driven Activity-Based Costing') {
//         hideC();
//         $('#mcq10_3a').show();
//         $(obj).addClass('selectedRigh');
//         $('.ansC').addClass('pontNone');
//     } else if ($(obj).text().trim() == 'Fee-For-Service') {
//         hideC();
//         $('#mcq10_3b').show();
//         $(obj).addClass('selectedWro');
//         $('.ansC').addClass('pontNone');
//     } else {
//         hideC();
//         $('#mcq10_3c').show();
//         $(obj).addClass('selectedWro');
//         $('.ansC').addClass('pontNone');
//     }
//     // app.SaveJson(JSON.stringify(TempJson));

// }








function QuesRespModule5Sec10XBlock(runtime, element) {


    $(function () {
setMsgBoxHeight();
// setMsgBoxHeightB();
// setMsgBoxHeightC();
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


// $(document).on("click", ".m5s10p1 .circleMcq.circleMcqY", function () {
//     if ($(this).text() == 'The patient must be at the center of care' || $(this).text() == 'The unit must determine a mechanism for routinely measuring and analyzing outcomes and costs' || $(this).text() == 'The team should include all those involved in the complete care cycle, including support services')
//     {
//         $(this).addClass('circleMcqGr');//.css("background-color", "#2cb69d;");
//         var element = $(this).closest('.col-sm-10');
//         if ($(element).find('.circleMcqGr').length == 1)
//         {
//             $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
//             $("#mcq10_4a").show();
//         }
//         if ($(element).find('.circleMcqGr').length == 2)
//         {
//             $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
//             $("#mcq10_4b").show();
//         }
//         if ($(element).find('.circleMcqGr').length == 3)
//         {
//             $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
//             $("#mcq10_4c").show();
//             $('.circleMcqY').addClass('pontNone');
//         }
//     }
//     else
//     {
//         $(this).addClass('circleMcqRed');
//         var element = $(this).closest('.col-sm-10');
//         if ($(element).find('.circleMcqRed').length == 3)
//         {
//             $('.circleMcqY').addClass('pontNone');
//             $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
//             $('#mcq10_4d .msgBtn').show();
//             $("#mcq10_4d").show();
//         }
//         else
//         {
//             $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
//             $('#mcq10_4d .msgBtn').hide();
//             $("#mcq10_4d").show();
//         }


//     }
// });

// $(document).on("click", ".m5s10p1 .circleMcq.circleMcqG", function () {
//     if ($(this).text() == 'Accurately measure true costs to patients' || $(this).text() == 'Robustly measure outcomes')
//     {
//         $(this).addClass('circleMcqGr');//.css("background-color", "#2cb69d;");
//         var element = $(this).closest('.col-sm-10');
//         if ($(element).find('.circleMcqGr').length == 1)
//         {
//             $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
//             $("#mcq10_5a").show();
//         }
//         if ($(element).find('.circleMcqGr').length == 2)
//         {
//             $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
//             $("#mcq10_5b").show();
//             $('.circleMcqG').addClass('pontNone');
//         }
//     }
//     else
//     {
//         $(this).addClass('circleMcqRed');
//         var element = $(this).closest('.col-sm-10');
//         if ($(element).find('.circleMcqRed').length == 3)
//         {
//             $('.circleMcqG').addClass('pontNone');
//             $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
//             $("#mcq10_5c .msgBtn").show();
//             $("#mcq10_5c").show();
//         }
//         else
//         {
//             $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
//             $("#mcq10_5c .msgBtn").hide();
//             $("#mcq10_5c").show();
//         }
//     }
// });

// function reserA(id) {
//     //$('.circleMcqY').addClass('default');

//     if (id == 'Mmc1')
//     {
//         $('#mmc1 .col-sm-10').html('');
//         $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
//         var Array = [0, 1, 2, 3, 4, 5];
//         var Mmc1 = [
//             'The patient must be at the center of care',
//             'Dr. Brady, the best breast cancer oncologist in the unit, needs to be the leader',
//             'A fee-for-service reimbursement model is ideal for the IPU structure',
//             'Those on the IPU team will not need a significant portion of their time for IPU care delivery.',
//             'The unit must determine a mechanism for routinely measuring and analyzing outcomes and costs',
//             'The team should include all those involved in the complete care cycle, including support services',
//         ];
//         Array = app.shuffle(Array);
//         var TempText = '';
//         $.each(Array, function (i, v) {
//             if (i == 0 || i == 3)
//             {
//                 TempText += '<div class="row">';
//             }
//             TempText += '<div class="col-sm-4 cTop" style="padding-left:0px; padding-right:0px;"><center><div class="circleMcq circleMcqY"><f>' + Mmc1[v];
//             TempText += '</f></div></center></div>';
//             if (i == 2 || i == 5)
//             {
//                 TempText += '</div>';
//             }
//         });
//         $('#mmc1 .col-sm-10').append(TempText);
//     }
//     ///For MMC2
//     if (id == 'Mmc2')
//     {
//         $('#mmc2 .col-sm-10').html('');
//         $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
//         var Array = [0, 1, 2, 3, 4];
//         var Mmc2 = [
//             'Provide billing information',
//             'Accurately measure true costs to patients',
//             'Record clinical documentation',
//             'Robustly measure outcomes',
//             'Order panels of tests at the same time',
//         ];
//         Array = app.shuffle(Array);
//         TempText = '';
//         $.each(Array, function (i, v) {
//             if (i == 0 || i == 3)
//             {
//                 TempText += '<div class="row">';
//                 if (i == 3)
//                 {
//                     TempText += '<div class="col-sm-2"></div>';
//                 }
//             }
//             TempText += '<div class="col-sm-4 cTop" style="padding-left:0px; padding-right:0px;"><center><div class="circleMcq circleMcqG"><f>' + Mmc2[v];
//             TempText += '</f></div></center></div>';
//             if (i == 2 || i == 4)
//             {
//                 TempText += '</div >';
//                 if (i == 4)
//                 {
//                     TempText += '<div class="col-sm-2"></div>';
//                 }
//             }
//         });
//         $('#mmc2 .col-sm-10').append(TempText);
//     }


// }

// $(document).ready(function () {
//     var Array = [0, 1, 2, 3, 4, 5];
//     var Mmc1 = [
//         'The patient must be at the center of care',
//         'Dr. Brady, the best breast cancer oncologist in the unit, needs to be the leader',
//         'A fee-for-service reimbursement model is ideal for the IPU structure',
//         'Those on the IPU team will not need a significant portion of their time for IPU care delivery',
//         'The unit must determine a mechanism for routinely measuring and analyzing outcomes and costs',
//         'The team should include all those involved in the complete care cycle, including support services',
//     ];
//     Array = app.shuffle(Array);
//     var TempText = '';
//     $.each(Array, function (i, v) {
//         if (i == 0 || i == 3)
//         {
//             TempText += '<div class="row">';
//         }
//         TempText += '<div class="col-sm-4 cTop" style="padding-left:0px; padding-right:0px;"><center><div class="circleMcq circleMcqY"><f>' + Mmc1[v];
//         TempText += '</f></div></center></div>';
//         if (i == 2 || i == 5)
//         {
//             TempText += '</div>';
//         }
//     });
//     $('#mmc1 .col-sm-10').append(TempText);
//     ///For MMC2
//     Array = [0, 1, 2, 3, 4];
//     var Mmc2 = [
//         'Provide billing information',
//         'Accurately measure true costs to patients',
//         'Record clinical documentation',
//         'Robustly measure outcomes',
//         'Order panels of tests at the same time',
//     ];
//     Array = app.shuffle(Array);
//     TempText = '';
//     $.each(Array, function (i, v) {
//         if (i == 0 || i == 3)
//         {
//             TempText += '<div class="row">';
//             if (i == 3)
//             {
//                 TempText += '<div class="col-sm-2"></div>';
//             }
//         }
//         TempText += '<div class="col-sm-4 cTop" style="padding-left:0px; padding-right:0px;"><center><div class="circleMcq circleMcqG"><f>' + Mmc2[v];
//         TempText += '</f></div></center></div>';
//         if (i == 2 || i == 4)
//         {
//             TempText += '</div >';
//             if (i == 4)
//             {
//                 TempText += '<div class="col-sm-2"></div>';
//             }
//         }
//     });
//     $('#mmc2 .col-sm-10').append(TempText);
// });






$(function ($) {
/* Here's where you'd do things on page load. */
});
}
