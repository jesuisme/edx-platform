/* Javascript for PollXBlock. */
function PollXBlock(runtime, element) {

    function updateresponse(result) {
        $('.act2').hide();
        $('.carouselC').show();
        var html = `<div class="count1"><br><div class="pollbox"><span class="left1">60 seconds</span> <div class="pbox1" style="width:`+result.count_60s+`%; max-width:40%;"> </div><span class="span1 sp1">`+result.count_60s+` %</span></div></div>`;
        html +=`<div class="count2"><div class="pollbox"><span class="left1">2 minutes or less</span> <div class="pbox1" style="width:`+result.count_2m+`%; max-width:40%;"> </div><span class="span1 sp2">`+result.count_2m+` %</span></div></div>`;
        html +=`<div class="count3"><div class="pollbox"><span class="left1">5 minutes</span> <div class="pbox1" style="width:`+result.count_5m+`%; max-width:40%;"> </div><span class="span1 sp3">`+result.count_5m+` %</span></div></div>`;
        html +=`<div class="count4"><div class="pollbox"><span class="left1">10 minutes or more</span> <div class="pbox1" style="width:`+result.count_10m+`%; max-width:40%;"> </div><span class="span1 sp4">`+result.count_10m+` %</span></div></div>`;
        $("#poll_73").html(html);
    } 


    var increment_count = runtime.handlerUrl(element, 'increment_count');
    var poll_response = runtime.handlerUrl(element, 'poll_response');

    

    $('.checkmark', element).click(function(eventObject) {
        var selected_val = $(this).data('value');
        $.ajax({
            type: "POST",
            url: poll_response,
            data: JSON.stringify({"selected_val": selected_val}),
            success: updateresponse
        });
    
  });

    $(function ($) {
        /* Here's where you'd do things on page load. */

        function updateCount(result) {
            if (result.count_60s != "usermatch"){
                $('.act2').hide();
                $('.carouselC').show();
                var html = `<div class="count1"><br><div class="pollbox"><span class="left1">60 seconds</span> <div class="pbox1" style="width:`+result.count_60s+`%; max-width:40%;"> </div><span class="span1 sp1">`+result.count_60s+` %</span></div></div>`;
                html +=`<div class="count2"><div class="pollbox"><span class="left1">2 minutes or less</span> <div class="pbox1" style="width:`+result.count_2m+`%; max-width:40%;"> </div><span class="span1 sp2">`+result.count_2m+` %</span></div></div>`;
                html +=`<div class="count3"><div class="pollbox"><span class="left1">5 minutes</span> <div class="pbox1" style="width:`+result.count_5m+`%; max-width:40%;"> </div><span class="span1 sp3">`+result.count_5m+` %</span></div></div>`;
                html +=`<div class="count4"><div class="pollbox"><span class="left1">10 minutes or more</span> <div class="pbox1" style="width:`+result.count_10m+`%; max-width:40%;"> </div><span class="span1 sp4">`+result.count_10m+` %</span></div></div>`;
                $("#poll_73").html(html);



            }
        }
        var increment_count = runtime.handlerUrl(element, 'user_check_if_submit');
        
        $.ajax({
            type: "POST",
            url: increment_count,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });
}
