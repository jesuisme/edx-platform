"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope
from xblock.fragment import Fragment


class QuesRespModule2Sec6XBlock(XBlock):
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

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the QuesRespModule2Sec6XBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/quesrespmodule2sec6xblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/bootstrap.min.css"))
        frag.add_css(self.resource_string("static/css/quesrespmodule2sec6xblock.css"))
        frag.add_css(self.resource_string("static/css/common.css"))
        # frag.add_css(self.resource_string("static/css/font-awesome.min.css"))
        # frag.add_css(self.resource_string("static/css/animate.css"))
        
        # frag.add_css(self.resource_string("static/css/fonts.css"))
        js_str = pkg_resources.resource_string(__name__, "static/js/src/jquery.min.js")
        js_str = pkg_resources.resource_string(__name__, "static/js/src/bootstrap.min.js")
        frag.add_javascript(unicode(js_str))
        frag.add_javascript(self.resource_string("static/js/src/quesrespmodule2sec6xblock.js"))
        # frag.add_javascript(self.resource_string("static/js/src/bootstrap.min.js"))
        # frag.add_javascript(self.resource_string("static/js/src/jquery.validate.js"))
        # frag.add_javascript(self.resource_string("static/js/src/jquery.min.js"))
        # frag.add_javascript(self.resource_string("static/js/src/jquitelight.js"))
        frag.initialize_js('QuesRespModule2Sec6XBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
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
            ("QuesRespModule2Sec6XBlock",
             """<quesrespmodule2sec6xblock/>
             """),
            ("Multiple QuesRespModule2Sec6XBlock",
             """<vertical_demo>
                <quesrespmodule2sec6xblock/>
                <quesrespmodule2sec6xblock/>
                <quesrespmodule2sec6xblock/>
                </vertical_demo>
             """),
        ]
