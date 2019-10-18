/* Javascript for M5s10choose1XBlock. */
function M5s10choose1XBlock(runtime, element) {

    $(function ($) {
        /* Here's where you'd do things on page load. */

        $(document).on("click", ".m5s10p1 .circleMcq.circleMcqY", function () {
            if ($(this).text() == 'The patient must be at the center of care' || $(this).text() == 'The unit must determine a mechanism for routinely measuring and analyzing outcomes and costs' || $(this).text() == 'The team should include all those involved in the complete care cycle, including support services')
            {
                $(this).addClass('circleMcqGr');//.css("background-color", "#2cb69d;");
                var element = $(this).closest('.col-sm-10');
                if ($(element).find('.circleMcqGr').length == 1)
                {
                    $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
                    $("#mcq10_4a").show();
                }
                if ($(element).find('.circleMcqGr').length == 2)
                {
                    $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
                    $("#mcq10_4b").show();
                }
                if ($(element).find('.circleMcqGr').length == 3)
                {
                    $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
                    $("#mcq10_4c").show();
                    $('.circleMcqY').addClass('pontNone');
                }
            }
            else
            {
                $(this).addClass('circleMcqRed');
                var element = $(this).closest('.col-sm-10');
                if ($(element).find('.circleMcqRed').length == 3)
                {
                    $('.circleMcqY').addClass('pontNone');
                    $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
                    $('#mcq10_4d .msgBtn').show();
                    $("#mcq10_4d").show();
                }
                else
                {
                    $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
                    $('#mcq10_4d .msgBtn').hide();
                    $("#mcq10_4d").show();
                }


            }
        });

        $(document).on("click", ".m5s10p1 .circleMcq.circleMcqG", function () {
            if ($(this).text() == 'Accurately measure true costs to patients' || $(this).text() == 'Robustly measure outcomes')
            {
                $(this).addClass('circleMcqGr');//.css("background-color", "#2cb69d;");
                var element = $(this).closest('.col-sm-10');
                if ($(element).find('.circleMcqGr').length == 1)
                {
                    $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
                    $("#mcq10_5a").show();
                }
                if ($(element).find('.circleMcqGr').length == 2)
                {
                    $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
                    $("#mcq10_5b").show();
                    $('.circleMcqG').addClass('pontNone');
                }
            }
            else
            {
                $(this).addClass('circleMcqRed');
                var element = $(this).closest('.col-sm-10');
                if ($(element).find('.circleMcqRed').length == 3)
                {
                    $('.circleMcqG').addClass('pontNone');
                    $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
                    $("#mcq10_5c .msgBtn").show();
                    $("#mcq10_5c").show();
                }
                else
                {
                    $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
                    $("#mcq10_5c .msgBtn").hide();
                    $("#mcq10_5c").show();
                }
            }
        });

       

    });
}
function reserA(id) {
    //$('.circleMcqY').addClass('default');

    if (id == 'Mmc1')
    {
        $('#mmc1 .col-sm-10').html('');
        $("#mcq10_4a,#mcq10_4b,#mcq10_4c,#mcq10_4d").hide();
        var Array = [0, 1, 2, 3, 4, 5];
        var Mmc1 = [
            'The patient must be at the center of care',
            'Dr. Brady, the best breast cancer oncologist in the unit, needs to be the leader',
            'A fee-for-service reimbursement model is ideal for the IPU structure',
            'Those on the IPU team will not need a significant portion of their time for IPU care delivery.',
            'The unit must determine a mechanism for routinely measuring and analyzing outcomes and costs',
            'The team should include all those involved in the complete care cycle, including support services',
        ];
        //Array = app.shuffle(Array);
        var TempText = '';
        $.each(Array, function (i, v) {
            if (i == 0 || i == 3)
            {
                TempText += '<div class="row">';
            }
            TempText += '<div class="col-sm-4 cTop" style="padding-left:0px; padding-right:0px;"><center><div class="circleMcq circleMcqY"><f>' + Mmc1[v];
            TempText += '</f></div></center></div>';
            if (i == 2 || i == 5)
            {
                TempText += '</div>';
            }
        });
        $('#mmc1 .col-sm-10').append(TempText);
    }
    ///For MMC2
    if (id == 'Mmc2')
    {
        $('#mmc2 .col-sm-10').html('');
        $("#mcq10_5a,#mcq10_5b,#mcq10_5c").hide();
        var Array = [0, 1, 2, 3, 4];
        var Mmc2 = [
            'Provide billing information',
            'Accurately measure true costs to patients',
            'Record clinical documentation',
            'Robustly measure outcomes',
            'Order panels of tests at the same time',
        ];
        //Array = app.shuffle(Array);
        TempText = '';
        $.each(Array, function (i, v) {
            if (i == 0 || i == 3)
            {
                TempText += '<div class="row">';
                if (i == 3)
                {
                    TempText += '<div class="col-sm-2"></div>';
                }
            }
            TempText += '<div class="col-sm-4 cTop" style="padding-left:0px; padding-right:0px;"><center><div class="circleMcq circleMcqG"><f>' + Mmc2[v];
            TempText += '</f></div></center></div>';
            if (i == 2 || i == 4)
            {
                TempText += '</div >';
                if (i == 4)
                {
                    TempText += '<div class="col-sm-2"></div>';
                }
            }
        });
        $('#mmc2 .col-sm-10').append(TempText);
    }
}