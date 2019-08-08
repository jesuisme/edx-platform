

function QuestionresponseXBlock(runtime, element) {


    // var setQuestionUrl = runtime.handlerUrl(element, 'set_question');
    var addResponseUrl = runtime.handlerUrl(element, 'add_response');
    var addReplyUrl = runtime.handlerUrl(element, 'add_reply');
    var responseSlides = document.getElementById('responses');


    $('#addresponse', element).click(function (eventObject) {
        console.log("add response function====");
        var response = document.getElementById("studentresponse").value;
        console.log("student response=====", response);
        //console.log("response contains: ", response);
        $.ajax({
            type: "POST",
            url: addReplyUrl,
            data: JSON.stringify({
                "studentReply": response
            }),
            success: function (data) {
                responseSlides.innerHTML = "";
                console.log("replies: ",data.responses);
                data.responses.reverse();
                var ansBoxes = [];
                // count = 0;
                for (var i = 0; i < data.responses.length; i++) {
                    
                    var currentResText = document.createElement("p");
                    var userName = document.createElement("p");
                    var ansPanel = document.createElement("div");
                    ansPanel.className = "panel panel-default col-md-3";
                    // if (count == 0){
                    //     ansPanel.style.cssText = "margin-left: 175px;";
                    //     ++count;

                    // }
                    var panHead = document.createElement("div");
                    var panBody = document.createElement("div");
                    panHead.className = "panel-heading";
                    panBody.className = "panel-body";
                    currentResText.innerText = data.responses[i].reply;
                    userName.innerText = data.responses[i].student;
                    
                    panBody.appendChild(currentResText);
                    panHead.appendChild(userName);
                    ansPanel.appendChild(panHead);
                    ansPanel.appendChild(panBody);
                    ansBoxes.push(ansPanel);
                    
                }

                var slides = chunkArray(ansBoxes, 3);

                for(var j=0; j<slides.length; j++){
                    var slide = document.createElement("div");
                    slide.className = "row";
                    slide.className = "item active";
                    //console.log('slides[j] contains:', slides[j]);
                    for(var k = 0; k<slides[j].length ; k++){
                        
                        //console.log('this slide contains: ', slides[j][k]);
                        slide.appendChild(slides[j][k]);
                    }
                    
                    if (j > 0) {
                        slide.className = "item";
                    }
                    responseSlides.appendChild(slide);
                
                }
                
                document.getElementById("studentresponse").value = "";
                //$('#responseCarousel').carousel();
                $('#responseCarousel').show();



            }
        });
    });


    $(function ($) {
        /* Here's where you'd do things on page load. */
        //get the question on page load
        $('#responseCarousel').hide();



    });

    function answerBox(userName, currentResText){

        var ansPanel = document.createElement("div");
        ansPanel.className = "panel panel-default col-md-4";
        var panHead = document.createElement("div");
        var panBody = document.createElement("div");
        panHead.className = "panel-heading";
        panBody.className = "panel-body";

        panBody.appendChild(currentResText);
        var user = document.createElement("p");
        user.innerText = userName;
        panHead.appendChild(user);
        ansPanel.appendChild(panHead);
        ansPanel.appendChild(panBody);

        return ansPanel;
    }

    function chunkArray(myArray, chunk_size) {
        let results = [];

        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size))
        }

        return results;
    }
}
