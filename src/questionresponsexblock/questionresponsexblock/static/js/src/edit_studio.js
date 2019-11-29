function UserResponseXBlocks(runtime, element) {

    // function updateCount(result) {
    //     $('.count', element).text(result.count);
    // }
    function editstudioquestions(result) {
        $('.studio_questions_class', element).text(result.studio_questions);
        window.location.reload();
    }

    // var handlerUrl = runtime.handlerUrl(element, 'increment_count');
    var set_question = runtime.handlerUrl(element, 'set_studio_question');

    $('#addresponses_studio', element).click(function(eventObject) {
        var response = document.getElementById("studentresponse_studio").value;
        var studio_questions_after_submit = document.getElementById("studio_questions_after_submit").value;
        $.ajax({
            type: "POST",
            url: set_question,
            data: JSON.stringify({"studio_questions": response, "studio_questions_after_submit": studio_questions_after_submit}),
            success: editstudioquestions
        });
    });

    

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
