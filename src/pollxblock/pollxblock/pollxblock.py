"""TO-DO: Write a description of what this XBlock is."""
import logging
import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope, List
from xblock.fragment import Fragment
from student.models import PollXblock
from django.contrib.auth.models import User

log = logging.getLogger(__name__)

@XBlock.wants('user')
class PollXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count_60s = Integer(
        default=0, scope=Scope.user_state,
        help="A count_60s counter, to show something happening",
    )
    count_60s_percent = Integer(
        default=0, scope=Scope.user_state,
        help="A count_60s counter, to show something happening",
    )
    
    count_2m = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )
    count_2m_percent = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )
    
    count_5m = Integer(
        default=0, scope=Scope.user_state,
        help="A count_2m counter, to show something happening",
    )
    count_5m_percent = Integer(
        default=0, scope=Scope.user_state,
        help="A count_2m counter, to show something happening",
    )
    
    count_10m = Integer(
        default=0, scope=Scope.user_state,
        help="A count_10m counter, to show something happening",
    )
    count_10m_percent = Integer(
        default=0, scope=Scope.user_state,
        help="A count_10m counter, to show something happening",
    )
    
    responses = List(help="responses from students", default=[], scope=Scope.user_state_summary)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the PollXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/pollxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/pollxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/pollxblock.js"))
        frag.initialize_js('PollXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def user_check_if_submit(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        user_object = User.objects.get(email=xb_user.emails[0])
        if PollXblock.objects.filter(user=user_object).exists():
            return {"count_60s": self.count_60s_percent, "count_2m": self.count_2m_percent, "count_5m": self.count_5m_percent, "count_10m": self.count_10m_percent}
        else:
            return {"count_60s": "usermatch",}


        # user_registered = self.responses
        # for row in user_registered:
        #     if xb_user.emails == row['email']:
        #         log.info("match found")
        #         return {"count_60s": self.count_60s_percent, "count_2m": self.count_2m_percent, "count_5m": self.count_5m_percent, "count_10m": self.count_10m_percent}
        #     else:
        #         return {"count_60s": "usermatch",}

    @XBlock.json_handler
    def poll_response(self, data, suffix=''):
        """
        this handler accepts a new reply
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        user_reply = data['selected_val']
        # newReply = {
        #     "student": xb_user.full_name,
        #     "email": xb_user.emails,
        #     "responses": data['selected_val']
        # }
        if user_reply == "60s":
            self.count_60s += 1
        if user_reply == "2m":
            self.count_2m += 1
        if user_reply == "5m":
            self.count_5m += 1
        if user_reply == "10m":
            self.count_10m += 1
        
        user_object = User.objects.get(email=xb_user.emails[0])
        sum_list = sum([self.count_60s,self.count_2m,self.count_5m,self.count_10m])
        average_for_each = float(100/sum_list)

        percent_of_count_60s = float(self.count_60s * average_for_each)
        percent_of_count_2m = float(self.count_2m * average_for_each)
        percent_of_count_5m = float(self.count_5m * average_for_each)
        percent_of_count_10m = float(self.count_10m * average_for_each)
        self.count_60s_percent = percent_of_count_60s
        self.count_2m_percent = percent_of_count_2m
        self.count_5m_percent = percent_of_count_5m
        self.count_10m_percent = percent_of_count_10m
        created, obj = PollXblock.objects.get_or_create(user=user_object)
        # self.responses.append(newReply)
        

        return {"count_60s": percent_of_count_60s, "count_2m": percent_of_count_2m, "count_5m": percent_of_count_5m, "count_10m": percent_of_count_10m}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("PollXBlock",
             """<pollxblock/>
             """),
            ("Multiple PollXBlock",
             """<vertical_demo>
                <pollxblock/>
                <pollxblock/>
                <pollxblock/>
                </vertical_demo>
             """),
        ]
