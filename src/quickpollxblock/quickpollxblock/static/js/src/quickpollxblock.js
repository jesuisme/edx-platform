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
    var addReplyUrl = runtime.handlerUrl(element, 'add_reply');
    var responseSlides = document.getElementById('responses');
    // $('p', element).click(function(eventObject)user_check {
    //     $.ajax({
    //         type: "POST",
    //         url: handlerUrl,
    //         data: JSON.stringify({"hello": "world"}),
    //         success: updateCount
    //     });
    // });
    $('.checkmark', element).click(function(eventObject) {
        console.log($(this).data('value'));
        var selected_val = $(this).data('value');
        console.log("ffffffffffffff");
        $.ajax({
            type: "POST",
            url: poll_url,
            data: JSON.stringify({"selected_val": selected_val}),
            success: updateresponse
        });
    });


    $('#addresponse', element).click(function (eventObject) {
        var response = document.getElementById("response1Text").value;
        var slide = "";
        var course_id;
        var current_url = window.location.href;
        var split_url = current_url.split("/");
        for (i = 0; i < split_url.length; i++) { 
          if (split_url[i].includes("course-v1:")){
            console.log(split_url[i]);
            course_id = split_url[i];

          }
        }
        $.ajax({
            type: "POST",
            url: addReplyUrl,
            data: JSON.stringify({
                "studentReply": response,
                "course_id": course_id
            }),
            success: function (data) {
                responseSlides.innerHTML = "";
                data.responses.reverse();
                var count = 0;
                var j = 0;
                for (var i = 0; i < data.responses.length; i++) {
                    if (i === 0) {
                        var active = 'active';
                    } else {
                        var active = '';
                    }
                    if (count === 0) {
                        var html = '<div class="item ' + active + '">';
                        $(".carousel-indicators").append('<li data-target="#responseCarousel" data-slide-to="' + j + '" class="' + active + '"></li>');
                        j++;
                    }
                    if (data.responses[i].reply.length > 200) {
                        var dot = "...";
                        var readmore = "<p class='read-more' data-reply='"+data.responses[i].reply+"' onclick=\"$('#popup-content').text($(this).data('reply')); $('.popup_ques, #overlay').fadeIn();\"> Read More<p>";
                    } else {
                        var dot = "";
                        var readmore = '';
                    }

                    
                    html += `<div class="col-sm-4"
                                style="box-sizing: border-box; position: relative; min-height: 1px; padding-right: 15px; padding-left: 15px; float: left; width: 33.33%;">
                                <div class="well text-left small"
                                    style="box-sizing: border-box; font-size: 11.9px; text-align: left; min-height: 20px; padding: 19px; margin-bottom: 20px; background: none 0px 0px repeat scroll #ffffff; border: 0px solid #e3e3e3; border-radius: 0px; box-shadow: none; color: #8e9091;">
                                    <div class="iHeight"
                                        style="box-sizing: border-box; max-height: 155px; overflow: hidden; min-height: 155px !important;">
                                        <span style="box-sizing: border-box;">`+ data.responses[i].reply.substring(0, 200) + dot + `</span>` + readmore + `</div>
                                    <br/><span style="box-sizing: border-box;"><span
                                            class="fa fa-user-circle fa-3x" aria-hidden="true"
                                            style="box-sizing: border-box; display: inline-block; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 3em; line-height: 1; font-family: FontAwesome; text-rendering: auto; -webkit-font-smoothing: antialiased;"></span>&nbsp;<span
                                            class="text-uppercase"
                                            style="box-sizing: border-box; text-transform: uppercase; color: #000000;">`+ data.responses[i].student + `</span></span><br style="box-sizing: border-box;" /><a
                                        href="#" class="Org"
                                        style="box-sizing: border-box; background-color: transparent; color: #f58320; text-decoration-line: none; cursor: pointer; line-height: 22px;">Lumina
                                        Datamatics Ltd</a><br style="box-sizing: border-box;" /><a
                                        href="#" class="PPRole"
                                        style="box-sizing: border-box; background-color: transparent; color: #f58320; text-decoration-line: none; cursor: pointer; line-height: 22px;">Researcher</a>
                                </div>
                            </div>`;


                    count++;
                    if (count === 3 ) {
                        html += '</div>';
                        count = 0;
                        slide += html;
                    }else if((i+1) == data.responses.length && count != 3){
                        html += '</div>';
                        slide += html;
                    }


                }

                responseSlides.innerHTML = slide;
                $("#ask_question").hide();
                $('#responseCarousel-container').show();
            }
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


        var check_user_reply = runtime.handlerUrl(element, 'check_user_reply');
        var slide = "";
        var course_id;
        var current_url = window.location.href;
        var split_url = current_url.split("/");
        for (i = 0; i < split_url.length; i++) { 
          if (split_url[i].includes("course-v1:")){
            console.log(split_url[i]);
            course_id = split_url[i];

          }
        }

        $.ajax({
                type: "POST",
                url: check_user_reply,
                data: JSON.stringify({
                    "course_id": course_id
                }),
                success: function (data) {
                    
                    if (data.responses != "new_user"){
                        responseSlides.innerHTML = "";
                        console.log("replies: ", data.responses);
                        data.responses.reverse();
                        var count = 0;
                        var j = 0;
                        for (var i = 0; i < data.responses.length; i++) {
                            if (i === 0) {
                                var active = 'active';
                            } else {
                                var active = '';
                            }
                            if (count === 0) {
                                var html = '<div class="item ' + active + '">';
                                $(".carousel-indicators").append('<li data-target="#responseCarousel" data-slide-to="' + j + '" class="' + active + '"></li>');
                                j++;
                            }
                            if (data.responses[i].reply.length > 200) {
                                var dot = "...";
                                var readmore = "<p class='read-more' data-reply='"+data.responses[i].reply+"' onclick=\"$('#popup-content').text($(this).data('reply')); $('.popup_ques, #overlay').fadeIn();\"> Read More<p>";
                            } else {
                                var dot = "";
                                var readmore = '';
                            }

                            
                            html += `<div class="col-sm-4"
                                        style="box-sizing: border-box; position: relative; min-height: 1px; padding-right: 15px; padding-left: 15px; float: left; width: 33.33%;">
                                        <div class="well text-left small"
                                            style="box-sizing: border-box; font-size: 11.9px; text-align: left; min-height: 20px; padding: 19px; margin-bottom: 20px; background: none 0px 0px repeat scroll #ffffff; border: 0px solid #e3e3e3; border-radius: 0px; box-shadow: none; color: #8e9091;">
                                            <div class="iHeight"
                                                style="box-sizing: border-box; max-height: 155px; overflow: hidden; min-height: 155px !important;">
                                                <span style="box-sizing: border-box;">`+ data.responses[i].reply.substring(0, 200) + dot + `</span>` + readmore + `</div>
                                            <br/><span style="box-sizing: border-box;"><span
                                                    class="fa fa-user-circle fa-3x" aria-hidden="true"
                                                    style="box-sizing: border-box; display: inline-block; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 3em; line-height: 1; font-family: FontAwesome; text-rendering: auto; -webkit-font-smoothing: antialiased;"></span>&nbsp;<span
                                                    class="text-uppercase"
                                                    style="box-sizing: border-box; text-transform: uppercase; color: #000000;">`+ data.responses[i].student + `</span></span><br style="box-sizing: border-box;" /><a
                                                href="#" class="Org"
                                                style="box-sizing: border-box; background-color: transparent; color: #f58320; text-decoration-line: none; cursor: pointer; line-height: 22px;">Lumina
                                                Datamatics Ltd</a><br style="box-sizing: border-box;" /><a
                                                href="#" class="PPRole"
                                                style="box-sizing: border-box; background-color: transparent; color: #f58320; text-decoration-line: none; cursor: pointer; line-height: 22px;">Researcher</a>
                                        </div>
                                    </div>`;

                            console.log(count);

                            count++;
                            if (count === 3 ) {
                                html += '</div>';
                                count = 0;
                                slide += html;
                            }else if((i+1) == data.responses.length && count != 3){
                                html += '</div>';
                                slide += html;
                            }



                        }

                        responseSlides.innerHTML = slide;
                        $("#ask_question").hide();
                        $('#responseCarousel-container').show();
                    }

                }
                    


            });











    });
}
