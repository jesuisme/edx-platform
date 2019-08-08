"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import String, List, Scope, Integer
from xblock.fragment import Fragment
import logging


log = logging.getLogger(__name__)

@XBlock.wants('user')
class QuestionresponseXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    # count = Integer(
    #     default=0, scope=Scope.user_state,
    #     help="A simple counter, to show something happening", user_state
    # )
    studio_questions = String(
        default='Add Questions?',display_name='Questions', scope=Scope.content,
        help="A simple counter, to show something happening",
    )

    question = String(help="A question for students", default="testing questions?", scope=Scope.content)
    responses = List(help="responses from students", default=[], scope=Scope.user_state_summary)
    

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the QuestionresponseXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/questionresponsexblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/questionresponsexblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/questionresponsexblock.js"))
        frag.initialize_js('QuestionresponseXBlock')
        return frag

    def studio_view(self, context=None):
        """
        This is the view that renders the XBlock in the Studio editor, allowing the instructor to configure it.
        """


        html = self.resource_string(
            "static/html/edit_studio.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string(
            "static/css/questionresponsexblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/edit_studio.js"))
        frag.initialize_js('UserResponseXBlocks')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    # @XBlock.json_handler
    # def increment_count(self, data, suffix=''):
    #     """
    #     An example handler, which increments the data.
    #     """
    #     # Just to show data coming in...
    #     assert data['hello'] == 'world'

    #     self.count += 1
    #     return {"count": self.count}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @XBlock.json_handler
    def set_question(self, data, suffix=''):
        """
        this handler accepts the question 
        """

        self.question = data['question']
        return {"question": self.question}

    @XBlock.json_handler
    def set_studio_question(self, data, suffix=''):
        """
        this handler accepts the question 
        """
        log.info("set questions==========")

        self.studio_questions = data['studio_questions']

        return {"studio_questions": self.studio_questions}

    @XBlock.json_handler
    def add_reply(self, data, suffix=''):
        """
        this handler accepts a new reply
        """
        print("==add reply function==========")
        user_service = self.runtime.service(self, 'user')
        print("user_service===%s===" % user_service)
        xb_user = user_service.get_current_user()
        print("xb_user====%s===" % xb_user)
        newReply = {
            "student": xb_user.full_name,
            "reply": data['studentReply']
        }
        print("newReply===%s----" % newReply)
        # self.replies.update(newReply)
        self.responses.append(newReply)
        # default_data.update(data)
        return {"responses": self.responses}


    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("QuestionresponseXBlock",
             """<questionresponsexblock/>
             """),
            ("Multiple QuestionresponseXBlock",
             """<vertical_demo>
                <questionresponsexblock/>
                <questionresponsexblock/>
                <questionresponsexblock/>
                </vertical_demo>
             """),
        ]
