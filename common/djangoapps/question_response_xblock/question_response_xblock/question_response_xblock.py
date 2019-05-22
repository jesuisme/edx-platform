"""TO-DO: This xblock is for storing and retreiving questions and responses."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import String, List, Scope
from xblock.fragment import Fragment
import logging


@XBlock.wants('user')
class QuestionResponseXBlock(XBlock):
    """
    TO-DO: this xblock stores a question and the responses to that question 
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    
    question = String(help="A question for students", default="what is the powerhouse of the cell?", scope=Scope.content)
    responses = List(help="responses from students", default=[], scope=Scope.user_state_summary)
    


    

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the QuestionResponseXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/question_response_xblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/question_response_xblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/question_response_xblock.js"))

        frag.initialize_js('QuestionResponseXBlock')
        return frag

    def studio_view(self, context=None):
        """
        This is the view that renders the XBlock in the Studio editor, allowing the instructor to configure it.
        """


        html = self.resource_string(
            "static/html/question_response_xblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string(
            "static/css/question_response_xblock.css"))
        frag.add_javascript(self.resource_string(
            "static/js/src/question_response_xblock.js"))

        frag.initialize_js('QuestionResponseXBlock')
        return frag

    def author_view(self,context=None):
        """
        This is the view that renders the XBlock in the Studio editor, allowing the instructor to configure it.
        """

        html = self.resource_string(
            "static/html/question_response_xblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string(
            "static/css/question_response_xblock.css"))
        frag.add_javascript(self.resource_string(
            "static/js/src/question_response_xblock.js"))

        frag.initialize_js('QuestionResponseXBlock')
        return frag

    # TO-DO: change handler to save an original question
    @XBlock.json_handler
    def set_question(self, data, suffix=''):
        """
        this handler accepts the question 
        """

        self.question = data['question']
        return {"question": self.question}

    @XBlock.json_handler
    def add_reply(self, data, suffix=''):
        """
        this handler accepts a new reply
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        newReply = {
            "student": xb_user.full_name,
            "reply": data['studentReply']
        }

        # self.replies.update(newReply)
        self.responses.append(newReply)
        # default_data.update(data)
        return {"responses": self.responses}



    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("QuestionResponseXBlock",
             """<question_response_xblock/>
             """),
        ]
