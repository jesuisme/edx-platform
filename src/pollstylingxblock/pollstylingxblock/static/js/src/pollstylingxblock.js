/* Javascript for PollStylingXBlock. */
function PollStylingXBlock(runtime, element) {

    function updateresponse(result) {
        $('.act2').hide();
        $('.carouselC').show();
        var html = `<div class="count1"><br><div class="pollbox"><span class="left1">extremely likely</span> <div class="pbox1" style="width:`+result.extremely_likely+`%; max-width:40%;"> </div><span class="span1 sp1">`+result.extremely_likely+` %</span></div></div>`;
        html +=`<div class="count2"><div class="pollbox"><span class="left1">likely</span> <div class="pbox1" style="width:`+result.likely+`%; max-width:40%;"> </div><span class="span1 sp2">`+result.likely+` %</span></div></div>`;
        html +=`<div class="count3"><div class="pollbox"><span class="left1">neutral</span> <div class="pbox1" style="width:`+result.neutral+`%; max-width:40%;"> </div><span class="span1 sp3">`+result.neutral+` %</span></div></div>`;
        html +=`<div class="count3"><div class="pollbox"><span class="left1">unlikely</span> <div class="pbox1" style="width:`+result.unlikely+`%; max-width:40%;"> </div><span class="span1 sp3">`+result.unlikely+` %</span></div></div>`;
        html +=`<div class="count3"><div class="pollbox"><span class="left1">extremely unlikely</span> <div class="pbox1" style="width:`+result.extremely_unlikely+`%; max-width:40%;"> </div><span class="span1 sp3">`+result.extremely_unlikely+` %</span></div></div>`;
        $("#poll_67").html(html);
    }

    var poll_response_url = runtime.handlerUrl(element, 'pollstyling_response');

    
    $('.checkmark_pollatyle', element).click(function(eventObject) {
        var selected_val = $(this).data('value');
        $.ajax({
            type: "POST",
            url: poll_response_url,
            data: JSON.stringify({"selected_val": selected_val}),
            success: updateresponse
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
        function updatepercent(result) {
            if (result.extremely_likely != "usermatch"){
                $('.act2').hide();
                $('.carouselC').show();
                var html = `<div class="count1"><br><div class="pollbox"><span class="left1">extremely likely</span> <div class="pbox1" style="width:`+result.extremely_likely+`%; max-width:40%;"> </div><span class="span1 sp1">`+result.extremely_likely+` %</span></div></div>`;
                html +=`<div class="count2"><div class="pollbox"><span class="left1">likely</span> <div class="pbox1" style="width:`+result.likely+`%; max-width:40%;"> </div><span class="span1 sp2">`+result.likely+` %</span></div></div>`;
                html +=`<div class="count3"><div class="pollbox"><span class="left1">neutral</span> <div class="pbox1" style="width:`+result.neutral+`%; max-width:40%;"> </div><span class="span1 sp3">`+result.neutral+` %</span></div></div>`;
                html +=`<div class="count3"><div class="pollbox"><span class="left1">unlikely</span> <div class="pbox1" style="width:`+result.unlikely+`%; max-width:40%;"> </div><span class="span1 sp3">`+result.unlikely+` %</span></div></div>`;
                html +=`<div class="count3"><div class="pollbox"><span class="left1">extremely unlikely</span> <div class="pbox1" style="width:`+result.extremely_unlikely+`%; max-width:40%;"> </div><span class="span1 sp3">`+result.extremely_unlikely+` %</span></div></div>`;
                $("#poll_67").html(html);



            }
        }
        var check_user = runtime.handlerUrl(element, 'user_check_if_submited');
        
        $.ajax({
            type: "POST",
            url: check_user,
            data: JSON.stringify({"hello": "world"}),
            success: updatepercent
        });


    });
}
