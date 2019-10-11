(function() {
    var OrganizationCohorts;
    var total_ids_selected;

    OrganizationCohorts = (function() {
        function OrganizationCohorts($section) {
            this.$section = $section;
            this.$section.data('wrapper', this);
        }

        OrganizationCohorts.prototype.onClickTitle = function() {
            function returnCheckedIds() {
                var checkedIds = $(".checkbox_check:checkbox:checked").map(function () {
                return this.id;
                }).get();
                return checkedIds;
            }

            
            $(".checkbox_check").click(function () {
                var checkedIds = returnCheckedIds();
                total_ids_selected = $.makeArray(checkedIds).join(",");
                $("#selected_item").val(total_ids_selected);
            });

        //     function myFunction() {
        //   console.log("my functionssssssss");
         
        // }
        $("#button_id").click(function () {
                var course_id;
                var selected_cohorts = $("#coherts_id").val();
                var url_cohorts = window.location.href;
                var split_url = url_cohorts.split("/");
                for (i = 0; i < split_url.length; i++) { 
                  if (split_url[i].includes("course-v1:")){
                    console.log(split_url[i]);
                    course_id = split_url[i];

                  }
                }

                var main_url = "/courses/" + course_id + "/instructor" 
                sendData = {
                    "selected_learner": total_ids_selected,
                    "coherts": selected_cohorts
                }
                if (total_ids_selected == undefined || total_ids_selected == null)  {
                    console.log("id undefinedllll");
                    $("#response_messages").text("Please select at least one learner ");
                }else{
                    $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: main_url,
                    data: sendData,
                    success: function(data) {
                        $("#response_messages").text(data.message);
                    }
                    // error: function(data) {
                    //     console.log("errorrrrrrrrr");
                    // }
                });


                }

            
                







            });








            };

        return OrganizationCohorts;
    }());

    window.InstructorDashboard.sections.OrganizationCohorts = OrganizationCohorts;
}).call(this);


