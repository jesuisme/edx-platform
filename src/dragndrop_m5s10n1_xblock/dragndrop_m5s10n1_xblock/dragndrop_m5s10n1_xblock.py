"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope
from xblock.fragment import Fragment


class Dragndropm5s10n1XBlock(XBlock):
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
        The primary view of the Dragndropm5s10n1XBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/dragndrop_m5s10n1_xblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/bootstrap.min.css"))
        frag.add_css(self.resource_string("static/css/m5s10p1_dndDe1.css"))
        frag.add_css(self.resource_string("static/css/dragndrop_m5s10n1_xblock.css"))

        frag.add_javascript(self.resource_string("static/js/src/UI_files_ga.js"))
        frag.add_javascript(self.resource_string("static/js/src/UI_files_jquery-ui.min.js"))
        frag.add_javascript(self.resource_string("static/js/src/jquery.ui.touch-punch.min.js"))
        
        frag.add_javascript(self.resource_string("static/js/src/dragndrop_m5s10n1_xblock.js"))
        frag.initialize_js('Dragndropm5s10n1XBlock')
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
            ("Dragndropm5s10n1XBlock",
             """<dragndrop_m5s10n1_xblock/>
             """),
            ("Multiple Dragndropm5s10n1XBlock",
             """<vertical_demo>
                <dragndrop_m5s10n1_xblock/>
                <dragndrop_m5s10n1_xblock/>
                <dragndrop_m5s10n1_xblock/>
                </vertical_demo>
             """),
        ]
