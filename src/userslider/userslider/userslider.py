"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from web_fragments.fragment import Fragment
from xblock.core import XBlock
from xblock.fields import Integer, Scope, String, List


class UserSliderXBlock(XBlock):
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
    response_text = List(help="responses from students", default=[], scope=Scope.user_state_summary)
    #response_text = String(help="Submit your response", default="your response", scope=Scope.content)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the UserSliderXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/userslider.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/userslider.css"))
        frag.add_javascript(self.resource_string("static/js/src/userslider.js"))
        frag.initialize_js('UserSliderXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def add_response(self, data, suffix=''):
        """
        this handler accepts the question 
        """
        
        text_response = {
            "response": data['response_text']
        }
        self.response_text.append(text_response)
        return {"response_text": self.response_text}

    @XBlock.json_handler
    def check_add_response(self, data, suffix=''):
        """
        this handler accepts the question
        """
        
        total_data = self.response_text
        
        if len(total_data) > 0:
            return {"response_text": self.response_text}
        else:
            return {"response_text": "already_submit"}
        

    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        return {"count": self.count}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("UserSliderXBlock",
             """<userslider/>
             """),
            ("Multiple UserSliderXBlock",
             """<vertical_demo>
                <userslider/>
                <userslider/>
                <userslider/>
                </vertical_demo>
             """),
        ]
