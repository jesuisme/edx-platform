"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope, List
from xblock.fragment import Fragment
from student.models import QuestionResponse, quickpollxblock
from django.contrib.auth.models import User

@XBlock.wants('user')
class QuickPollXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    yes = Integer(
        default=0, scope=Scope.user_state_summary,
        help="A simple counter, to show something happening",
    )
    yes_percent = Integer(
        default=0, scope=Scope.user_state_summary,
        help="A simple counter, to show something happening",
    )
    no = Integer(
        default=0, scope=Scope.user_state_summary,
        help="A simple counter, to show something happening",
    )
    no_percent = Integer(
        default=0, scope=Scope.user_state_summary,
        help="A simple counter, to show something happening",
    )

    responses = List(help="responses from students", default=[], scope=Scope.user_state_summary)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the QuickPollXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/quickpollxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/quickpollxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/quickpollxblock.js"))
        frag.initialize_js('QuickPollXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def select_poll(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        user_object = User.objects.get(email=xb_user.emails[0])
        user_reply = data['selected_val']
        # newReply = {
        #     "student": xb_user.full_name,
        #     "email": xb_user.emails,
        #     "responses": data['selected_val']
        # }
        if user_reply == "yes":
            self.yes += 1
        if user_reply == "no":
            self.no += 1
        
        sum_list = sum([self.yes,self.no])
        # sum_all_poll = sum(self.count_60s,self.count_2m,self.count_5m,self.count_10m)
        average_for_each = float(100/sum_list)
        percent_of_yes = float(self.yes * average_for_each)
        percent_of_no = float(self.no * average_for_each)
        self.yes_percent = percent_of_yes
        self.no_percent = percent_of_no
        created, obj = quickpollxblock.objects.get_or_create(user=user_object)
        # self.responses.append(newReply)
        return {"yes": percent_of_yes, "no": percent_of_no}

    @XBlock.json_handler
    def user_check(self, data, suffix=''):
        """
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        user_object = User.objects.get(email=xb_user.emails[0])
        if quickpollxblock.objects.filter(user=user_object).exists():
            return {"yes": self.yes_percent, "no": self.no_percent}
        else:
            return {"yes": "usermatch",}


    @XBlock.json_handler
    def add_reply(self, data, suffix=''):
        """
        this handler accepts a new reply
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        user_reply = data['studentReply']
        course_id = data['course_id']
        newReply = {
            "student": xb_user.full_name,
            "email": xb_user.emails,
            "reply": data['studentReply']
        }
        # user_object = User.objects.get(email=xb_user.emails[0])
        # if not QuestionResponse.objects.filter(user=user_object,course_id=course_id).exists():
        #     QuestionResponse.objects.create(user=user_object, response_text=user_reply,course_id=course_id)
        #     self.responses.append(newReply)
        # else:
        #     QuestionResponse.objects.create(user=user_object, response_text=user_reply,course_id=course_id)
        #     self.responses.append(newReply)
        user_object = User.objects.get(email=xb_user.emails[0])
        created, user_obj = QuestionResponse.objects.get_or_create(user=user_object,course_id=course_id)
        self.responses.append(newReply)
        return {"responses": self.responses}


    @XBlock.json_handler
    def check_user_reply(self, data, suffix=''):
        """
        this handler accepts a new reply
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        course_id = data['course_id']
        
        # user_object = User.objects.get(email=xb_user.emails[0])
        # if QuestionResponse.objects.filter(user=user_object,course_id=course_id).exists():
        #     return {"responses": self.responses}
        # else:
        #     return {"responses": "new_user"}
        user_data = self.responses
        user_match_counter = 0
        if len(user_data) > 0:
            for user_row in user_data:
                if str(user_row['email'][0]) == str(xb_user.emails[0]):
                    user_match_counter += 1

        if user_match_counter > 0:
            return {"responses": self.responses}
        else:
            return {"responses": "new_user"}


    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("QuickPollXBlock",
             """<quickpollxblock/>
             """),
            ("Multiple QuickPollXBlock",
             """<vertical_demo>
                <quickpollxblock/>
                <quickpollxblock/>
                <quickpollxblock/>
                </vertical_demo>
             """),
        ]
