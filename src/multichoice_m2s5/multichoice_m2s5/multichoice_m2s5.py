"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope
from xblock.fragment import Fragment


class MultichoiceM2S5XBlock(XBlock):
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
        The primary view of the MultichoiceM2S5XBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/multichoice_m2s5.html")
        frag = Fragment(html.format(self=self))
        
        frag.add_css(self.resource_string("static/css/multichoice_m2s5.css"))
        frag.add_css(self.resource_string("static/css/common.css"))
        frag.add_css(self.resource_string("static/css/bootstrap.min.css"))
        #frag.add_css(self.resource_string("static/css/m2s5p1.css"))
        
        # frag.add_javascript(self.resource_string("static/js/src/jquery_min.js"))
        # frag.add_javascript(self.resource_string("static/js/src/bootstrap.min.js"))
        # frag.add_javascript(self.resource_string("static/js/src/wow.js"))
        # frag.add_javascript(self.resource_string("static/js/src/script.js"))
        # frag.add_javascript(self.resource_string("static/js/src/Json.js"))
        # js_str = pkg_resources.resource_string(__name__, "static/js/src/wow.js")
        # js_str = pkg_resources.resource_string(__name__, "static/js/src/script.js")
        # js_str = pkg_resources.resource_string(__name__, "static/js/src/Json.js")

        js_str = pkg_resources.resource_string(__name__, "static/js/src/jquery_min.js")
        js_str = pkg_resources.resource_string(__name__, "static/js/src/bootstrap.min.js")
        
        frag.add_javascript(unicode(js_str))
        frag.add_javascript(self.resource_string("static/js/src/multichoice_m2s5.js"))
        frag.initialize_js('MultichoiceM2S5XBlock')
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
            ("MultichoiceM2S5XBlock",
             """<multichoice_m2s5/>
             """),
            ("Multiple MultichoiceM2S5XBlock",
             """<vertical_demo>
                <multichoice_m2s5/>
                <multichoice_m2s5/>
                <multichoice_m2s5/>
                </vertical_demo>
             """),
        ]
