"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope, List
from xblock.fragment import Fragment

@XBlock.wants('user')
class FBm6s9XBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    fb_responses = List(help="responses from students", default=[], scope=Scope.user_state_summary)

    user_record = List(help="responses from students", default=[], scope=Scope.user_state_summary)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the FBm6s9XBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/fb_m6s9_xblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/bootstrap.min.css"))
        frag.add_css(self.resource_string("static/css/fb_m6s9_xblock.css"))
        js_str = pkg_resources.resource_string(__name__, "static/js/src/bootstrap.min.js")
        frag.add_javascript(unicode(js_str))
        frag.add_javascript(self.resource_string("static/js/src/fb_m6s9_xblock.js"))
        frag.initialize_js('FBm6s9XBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def fb_add_responses(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        
        import ast

        convert_dictionay = ast.literal_eval(data['Data'])
        add_reply = {
            "full_name": xb_user.full_name,
            "user_mail":xb_user.emails,
            "response": convert_dictionay

        }
        self.fb_responses.append(add_reply)
        Current_user = add_reply
        return {"user_record": self.fb_responses, "Current_user": Current_user}

    @XBlock.json_handler
    def check_user_submmited(self, data, suffix=''):

        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()

        user_data = self.fb_responses
        user_match_counter = 0
        Current_user = None
        diffcost = None
        if len(user_data) > 0:
            for user_row in user_data:
                print("user row====%s===" % user_row)
                if str(user_row['user_mail'][0]) == str(xb_user.emails[0]):
                    user_match_counter += 1
                    Current_user = user_row

        if user_match_counter > 0:
            return {"user_record": self.fb_responses, "Current_user": Current_user}
        else:
            return {"user_record": "new_user"}

        return

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("FBm6s9XBlock",
             """<fb_m6s9_xblock/>
             """),
            ("Multiple FBm6s9XBlock",
             """<vertical_demo>
                <fb_m6s9_xblock/>
                <fb_m6s9_xblock/>
                <fb_m6s9_xblock/>
                </vertical_demo>
             """),
        ]
