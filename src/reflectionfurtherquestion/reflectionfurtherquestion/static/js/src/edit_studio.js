function ReflectionUserResponseXBlocks(runtime, element) {

    // function updateCount(result) {
    //     $('.count', element).text(result.count);
    // }
    function editstudioquestions_reflection(result) {
        $('.studio_questions_class1', element).text(result.studio_questions_reflection);
        window.location.reload();
    }

    // var handlerUrl = runtime.handlerUrl(element, 'increment_count');
    var set_question = runtime.handlerUrl(element, 'set_studio_question_reflection');

    $('#addresponses_studio1', element).click(function(eventObject) {
        var response_reflection = document.getElementById("studentresponse_studio1").value;
        $.ajax({
            type: "POST",
            url: set_question,
            data: JSON.stringify({"studio_questions_reflection": response_reflection}),
            success: editstudioquestions_reflection
        });
    });

    

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
