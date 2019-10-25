"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope, List
from xblock.fragment import Fragment

@XBlock.wants('user')
class PollStylingXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    # count = Integer(
    #     default=0, scope=Scope.user_state,
    #     help="A simple counter, to show something happening",
    # )
    extremely_likely = Integer(
            default=0, scope=Scope.user_state,
            help="extremely likely to show something happening",
        )
    extremely_likely_percent = Integer(
            default=0, scope=Scope.user_state,
            help="extremely likely to show something happening",
        )
    
    likely = Integer(
            default=0, scope=Scope.user_state,
            help="likely to show something happening",
        )
    likely_percent = Integer(
            default=0, scope=Scope.user_state,
            help="likely to show something happening",
        )
    
    neutral = Integer(
            default=0, scope=Scope.user_state,
            help="neutral to show something happening",
        )
    neutral_percent = Integer(
            default=0, scope=Scope.user_state,
            help="neutral to show something happening",
        )
    
    unlikely = Integer(
            default=0, scope=Scope.user_state,
            help="unlikely to show something happening",
        )
    unlikely_percent = Integer(
            default=0, scope=Scope.user_state,
            help="unlikely to show something happening",
        )
    
    extremely_unlikely = Integer(
            default=0, scope=Scope.user_state,
            help="extremely unlikely to show something happening",
        )
    extremely_unlikely_percent = Integer(
            default=0, scope=Scope.user_state,
            help="extremely unlikely to show something happening",
        )
    
    responses = List(help="responses from students", default=[], scope=Scope.user_state_summary)
    

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the PollStylingXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/pollstylingxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/pollstylingxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/pollstylingxblock.js"))
        frag.initialize_js('PollStylingXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def poll_response(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        user_service = self.runtime.service(self, 'user')
        # print("user_service===%s===" % user_service)
        xb_user = user_service.get_current_user()
        # print("xb_user====%s===" % xb_user)
        user_reply = data['selected_val']
        # course_id = data['course_id']
        # responses = ""
        # print("xb_user====%s===" % xb_user.email)
        print("user_reply====hfghgf==%s====" % user_reply)
        newReply = {
            "student": xb_user.full_name,
            "email": xb_user.emails,
            "responses": data['selected_val']
        }
        if user_reply == "extremely likely":
            self.extremely_likely += 1
        if user_reply == "likely":
            self.likely += 1
        if user_reply == "neutral":
            self.neutral += 1
        if user_reply == "unlikely":
            self.unlikely += 1
        if user_reply == "extremely unlikely":
            self.extremely_unlikely += 1
        
        sum_list = sum([self.extremely_likely,self.likely,self.neutral,self.unlikely,self.extremely_unlikely])
        # sum_all_poll = sum(self.count_60s,self.count_2m,self.count_5m,self.count_10m)
        print(sum_list)
        average_for_each = float(100/sum_list)
        print(average_for_each)

        percent_of_extremely_likely = float(self.extremely_likely * average_for_each)
        percent_of_likely = float(self.likely * average_for_each)
        percent_of_neutral = float(self.neutral * average_for_each)
        percent_of_unlikely = float(self.unlikely * average_for_each)
        percent_of_extremely_unlikely = float(self.extremely_unlikely * average_for_each)
        self.extremely_likely_percent = percent_of_extremely_likely
        self.likely_percent = percent_of_likely
        self.neutral_percent = percent_of_neutral
        self.unlikely_percent = percent_of_unlikely
        self.extremely_unlikely_percent = percent_of_extremely_unlikely
        self.responses.append(newReply)
        return {"extremely_likely": percent_of_extremely_likely, "likely": percent_of_likely, "neutral": percent_of_neutral, "unlikely": percent_of_unlikely, "extremely_unlikely": percent_of_extremely_unlikely}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("PollStylingXBlock",
             """<pollstylingxblock/>
             """),
            ("Multiple PollStylingXBlock",
             """<vertical_demo>
                <pollstylingxblock/>
                <pollstylingxblock/>
                <pollstylingxblock/>
                </vertical_demo>
             """),
        ]
