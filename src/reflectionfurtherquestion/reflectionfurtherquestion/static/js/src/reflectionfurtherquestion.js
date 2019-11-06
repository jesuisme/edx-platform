/* Javascript for ReflectionFurtherXBlock. */
function ReflectionFurtherXBlock(runtime, element) {

    // var addResponseUrl = runtime.handlerUrl(element, 'add_response');
    var addReplyUrl_reflection = runtime.handlerUrl(element, 'add_reply_reflection');
    var responseSlides_reflection = document.getElementById('responses_reflection');


    $('#addresponse1', element).click(function (eventObject) {
        var response11 = document.getElementById("studentresponse1").value;
        var slide = "";
        // var course_id;
        // var current_url = window.location.href;
        // var split_url = current_url.split("/");
        // for (i = 0; i < split_url.length; i++) { 
        //   if (split_url[i].includes("course-v1:")){
        //     console.log(split_url[i]);
        //     course_id = split_url[i];

        //   }
        // }
        $.ajax({
            type: "POST",
            url: addReplyUrl_reflection,
            data: JSON.stringify({
                "studentReply_reflection": response11,
            }),
            success: function (data) {
                responseSlides_reflection.innerHTML = "";
                data.responses_first_time_user.reverse();
                var count = 0;
                var j = 0;
                for (var i = 0; i < data.responses_first_time_user.length; i++) {
                    if (i === 0) {
                        var active = 'active';
                    } else {
                        var active = '';
                    }
                    if (count === 0) {
                        var html = '<div class="item ' + active + '">';
                        $("#reflection_indicatore").append('<li data-target="#responseCarousel_reflection" data-slide-to="' + j + '" class="' + active + '"></li>');
                        j++;
                    }
                    if (data.responses_first_time_user[i].reply.length > 200) {
                        var dot = "...";
                        var readmore = "<p class='read-more' data-reply='"+data.responses_first_time_user[i].reply+"' onclick=\"$('#popup-content').text($(this).data('reply')); $('.popup_ques, #overlay').fadeIn();\"> Read More<p>";
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
                                        <span style="box-sizing: border-box;">`+ data.responses_first_time_user[i].reply.substring(0, 200) + dot + `</span>` + readmore + `</div>
                                    <br/><span style="box-sizing: border-box;"><span
                                            class="fa fa-user-circle fa-3x" aria-hidden="true"
                                            style="box-sizing: border-box; display: inline-block; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 3em; line-height: 1; font-family: FontAwesome; text-rendering: auto; -webkit-font-smoothing: antialiased;"></span>&nbsp;<span
                                            class="text-uppercase"
                                            style="box-sizing: border-box; text-transform: uppercase; color: #000000;">`+ data.responses_first_time_user[i].student + `</span></span><br style="box-sizing: border-box;" /><a
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
                    }else if((i+1) == data.responses_first_time_user.length && count != 3){
                        html += '</div>';
                        slide += html;
                    }

                    



                }

                responseSlides_reflection.innerHTML = slide;
                $("#ask_question1").hide();
                $('#responseCarousel-container1').show();
            }
        });
    });


    $(function ($) {
        /* Here's where you'd do things on page load. */
        //get the question on page load

    var check_user_reply_for_reflection = runtime.handlerUrl(element, 'check_user_reply_for_reflection');
    var slide = "";
    var slidecount = 0;
    // var course_id;
    // var current_url = window.location.href;
    // var split_url = current_url.split("/");
    // for (i = 0; i < split_url.length; i++) { 
    //   if (split_url[i].includes("course-v1:")){
    //     console.log(split_url[i]);
    //     course_id = split_url[i];

    //   }
    // }

    $.ajax({
            type: "POST",
            url: check_user_reply_for_reflection,
            data: JSON.stringify({
                "course_id": "course_id"
            }),
            success: function (data) {
                
                if (data.responses_data != "new_user"){
                    responseSlides_reflection.innerHTML = "";
                    data.responses_data.reverse();
                    var count = 0;
                    var j = 0;
                    slidecount = data.responses_data.length;
                    for (var i = 0; i < data.responses_data.length; i++) {
                        if (i === 0) {
                            var active = 'active';
                        } else {
                            var active = '';
                        }
                        if (count === 0) {
                            var html = '<div class="item ' + active + '">';
                            $("#reflection_indicatore").append('<li data-target="#responseCarousel_reflection" data-slide-to="' + j + '" class="' + active + '"></li>');
                            j++;
                        }
                        if (data.responses_data[i].reply.length > 200) {
                            var dot = "...";
                            var readmore = "<p class='read-more' data-reply='"+data.responses_data[i].reply+"' onclick=\"$('#popup-content').text($(this).data('reply')); $('.popup_ques, #overlay').fadeIn();\"> Read More<p>";
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
                                            <span style="box-sizing: border-box;">`+ data.responses_data[i].reply.substring(0, 200) + dot + `</span>` + readmore + `</div>
                                        <br/><span style="box-sizing: border-box;"><span
                                                class="fa fa-user-circle fa-3x" aria-hidden="true"
                                                style="box-sizing: border-box; display: inline-block; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 3em; line-height: 1; font-family: FontAwesome; text-rendering: auto; -webkit-font-smoothing: antialiased;"></span>&nbsp;<span
                                                class="text-uppercase"
                                                style="box-sizing: border-box; text-transform: uppercase; color: #000000;">`+ data.responses_data[i].student + `</span></span><br style="box-sizing: border-box;" /><a
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
                        }else if((i+1) == data.responses_data.length && count != 3){
                            html += '</div>';
                            slide += html;
                        }

                   



                    }

                    responseSlides_reflection.innerHTML = slide;
                    $("#ask_question1").hide();
                    $('#responseCarousel-container1').show();
                }

            }
                


        });
        
      //   $('.carousel').on('slid.bs.carousel', function (e) {
      //      $('.item .ans').removeClass('Dis');
      //      console.log("slider indicator");
      //      var id = parseInt(e.relatedTarget.id);
      //      console.log("id---", id);
      //         if(id == 0){
      //             $('.left').hide();
      //             $('.right').show();
      //         }else if(id == slidecount){
      //           $('.left').show();
      //           $('.right').hide();
      //         }  else {
      //           $('.left').show();
      //           $('.right').show();
      //         }
      // });











    });

}
