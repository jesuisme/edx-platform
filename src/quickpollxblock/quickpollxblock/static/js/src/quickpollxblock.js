/* Javascript for QuickPollXBlock. */
function QuickPollXBlock(runtime, element) {

    function updateresponse(result) {
        $('.act2').hide();
        $('.carouselC').show();
        var html = `<div class="count1"><br><div class="pollbox"><span class="left1">Yes</span> <div class="pbox1" style="width:`+result.yes+`%; max-width:40%;"> </div><span class="span1 sp1">`+result.yes+` %</span></div></div>`;
        html +=`<div class="count2"><div class="pollbox"><span class="left1">No</span> <div class="pbox2" style="width:`+result.no+`%; max-width:40%;"> </div><span class="span2 sp2">`+result.no+` %</span></div></div>`;
        $("#poll_64").html(html);
    }

    var poll_url = runtime.handlerUrl(element, 'select_poll');

    // $('p', element).click(function(eventObject)user_check {
    //     $.ajax({
    //         type: "POST",
    //         url: handlerUrl,
    //         data: JSON.stringify({"hello": "world"}),
    //         success: updateCount
    //     });
    // });
    $('.checkmark', element).click(function(eventObject) {
        var selected_val = $(this).data('value');
        $.ajax({
            type: "POST",
            url: poll_url,
            data: JSON.stringify({"selected_val": selected_val}),
            success: updateresponse
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
        function updateuser(result) {
            if (result.yes != "usermatch"){
                $('.act2').hide();
                $('.carouselC').show();
                var html = `<div class="count1"><br><div class="pollbox"><span class="left1">Yes</span> <div class="pbox1" style="width:`+result.yes+`%; max-width:40%;"> </div><span class="span1 sp1">`+result.yes+` %</span></div></div>`;
                html +=`<div class="count2"><div class="pollbox"><span class="left1">No</span> <div class="pbox2" style="width:`+result.no+`%; max-width:40%;"> </div><span class="span2 sp2">`+result.no+` %</span></div></div>`;
                $("#poll_64").html(html);


            }
        }
        var user_confirm_url = runtime.handlerUrl(element, 'user_check');
        $.ajax({
            type: "POST",
            url: user_confirm_url,
            data: JSON.stringify({"selected_val": "user test"}),
            success: updateuser
        });
    });
}
