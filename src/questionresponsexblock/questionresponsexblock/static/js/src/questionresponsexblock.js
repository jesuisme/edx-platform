

function QuestionresponseXBlock(runtime, element) {


    // var setQuestionUrl = runtime.handlerUrl(element, 'set_question');
    var addResponseUrl = runtime.handlerUrl(element, 'add_response');
    var addReplyUrl = runtime.handlerUrl(element, 'add_reply');
    var responseSlides = document.getElementById('responses');


    $('#addresponse', element).click(function (eventObject) {
        var response = document.getElementById("studentresponse").value;
        var slide = "";
        //console.log("student response=====", response);
        //console.log("response contains: ", response);
        $.ajax({
            type: "POST",
            url: addReplyUrl,
            data: JSON.stringify({
                "studentReply": response
            }),
            success: function (data) {
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
                   

                    // var currentResText = document.createElement("p");
                    // var userName = document.createElement("p");
                    // var ansPanel = document.createElement("div");
                    // ansPanel.className = "panel panel-default col-md-3";
                    // // if (count == 0){
                    // //     ansPanel.style.cssText = "margin-left: 175px;";
                    // //     ++count;

                    // // }
                    // var panHead = document.createElement("div");
                    // var panBody = document.createElement("div");
                    // panHead.className = "panel-heading";
                    // panBody.className = "panel-body";
                    // currentResText.innerText = data.responses[i].reply;
                    // userName.innerText = data.responses[i].student;

                    // panBody.appendChild(currentResText);
                    // panHead.appendChild(userName);
                    // ansPanel.appendChild(panHead);
                    // ansPanel.appendChild(panBody);
                    // ansBoxes.push(ansPanel);


                }

                responseSlides.innerHTML = slide;
                // var slides = chunkArray(ansBoxes, 3);

                // for(var j=0; j<slides.length; j++){
                //     var slide = document.createElement("div");
                //     slide.className = "row";
                //     slide.className = "item active";
                //     //console.log('slides[j] contains:', slides[j]);
                //     for(var k = 0; k<slides[j].length ; k++){

                //         //console.log('this slide contains: ', slides[j][k]);
                //         slide.appendChild(slides[j][k]);
                //     }

                //     if (j > 0) {
                //         slide.className = "item";
                //     }
                //     responseSlides.appendChild(slide);

                // }

                // document.getElementById("studentresponse").value = "";
                //$('#responseCarousel').carousel();
                $("#ask_question").hide();
                $('#responseCarousel-container').show();
            }
        });
    });


    $(function ($) {
        /* Here's where you'd do things on page load. */
        //get the question on page load
        // $('#responseCarousel').hide();



    });

    // function answerBox(userName, currentResText) {

    //     var ansPanel = document.createElement("div");
    //     ansPanel.className = "panel panel-default col-md-4";
    //     var panHead = document.createElement("div");
    //     var panBody = document.createElement("div");
    //     panHead.className = "panel-heading";
    //     panBody.className = "panel-body";

    //     panBody.appendChild(currentResText);
    //     var user = document.createElement("p");
    //     user.innerText = userName;
    //     panHead.appendChild(user);
    //     ansPanel.appendChild(panHead);
    //     ansPanel.appendChild(panBody);

    //     return ansPanel;
    // }

    // function chunkArray(myArray, chunk_size) {
    //     let results = [];

    //     while (myArray.length) {
    //         results.push(myArray.splice(0, chunk_size))
    //     }

    //     return results;
    // }
}
