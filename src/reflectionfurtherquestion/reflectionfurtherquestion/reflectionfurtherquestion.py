"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope, List, String
from xblock.fragment import Fragment

@XBlock.wants('user')
class ReflectionFurtherXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    studio_questions_reflection = String(
        default='Add Questions?',display_name='Questions', scope=Scope.content,
        help="A simple counter, to show something happening",
    )

    # reflection_question = String(help="A question for students", default="testing questions?", scope=Scope.content)
    responses_for_reflection = List(help="responses from students", default=[], scope=Scope.user_state_summary)
    

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
        html = self.resource_string("static/html/reflectionfurtherquestion.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/reflectionfurtherquestion.css"))
        frag.add_javascript(self.resource_string("static/js/src/reflectionfurtherquestion.js"))
        frag.initialize_js('ReflectionFurtherXBlock')
        return frag

    def studio_view(self, context=None):
        """
        This is the view that renders the XBlock in the Studio editor, allowing the instructor to configure it.
        """


        html = self.resource_string(
            "static/html/edit_studio.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string(
            "static/css/reflectionfurtherquestion.css"))
        frag.add_javascript(self.resource_string("static/js/src/edit_studio.js"))
        frag.initialize_js('ReflectionUserResponseXBlocks')
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
    # @XBlock.json_handler
    # def set_question(self, data, suffix=''):
    #     """
    #     this handler accepts the question 
    #     """

    #     self.reflection_question = data['question']
    #     return {"question": self.reflection_question}

    @XBlock.json_handler
    def set_studio_question_reflection(self, data, suffix=''):
        """
        this handler accepts the question 
        """

        self.studio_questions_reflection = data['studio_questions_reflection']

        return {"studio_questions_reflection": self.studio_questions_reflection}

    @XBlock.json_handler
    def add_reply_reflection(self, data, suffix=''):
        """
        this handler accepts a new reply
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        user_reply = data['studentReply_reflection']
        # course_id = data['course_id']
        newReply1 = {
            "student": xb_user.full_name,
            "email": xb_user.emails,
            "reply": data['studentReply_reflection']
        }
        self.responses_for_reflection.append(newReply1)
        return {"responses_first_time_user": self.responses_for_reflection}


    @XBlock.json_handler
    def check_user_reply_for_reflection(self, data, suffix=''):
        """
        this handler accepts a new reply
        """
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        # course_id = data['course_id']
        user_data = self.responses_for_reflection
        user_match_counter = 0
        if len(user_data) > 0:
            for user_row in user_data:
                if str(user_row['email'][0]) == str(xb_user.emails[0]):
                    user_match_counter += 1

        if user_match_counter > 0:
            return {"responses_data": self.responses_for_reflection}
        else:
            return {"responses_data": "new_user"}


    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ReflectionFurtherXBlock",
             """<reflectionfurtherquestion/>
             """),
            ("Multiple ReflectionFurtherXBlock",
             """<vertical_demo>
                <reflectionfurtherquestion/>
                <reflectionfurtherquestion/>
                <reflectionfurtherquestion/>
                </vertical_demo>
             """),
        ]
