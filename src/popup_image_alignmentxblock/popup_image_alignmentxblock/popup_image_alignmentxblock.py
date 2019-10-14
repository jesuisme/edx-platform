"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope
from xblock.fragment import Fragment


import sys
reload(sys)
sys.setdefaultencoding('utf-8')




class PopupImageAlignmentXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as

    

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def student_view(self, context=None):
        """
        The primary view of the PopupImageAlignmentXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/popup_image_alignmentxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/popup_image_alignmentxblock.css"))
        frag.add_css(self.resource_string("static/css/common.css"))
        frag.add_css(self.resource_string("static/css/bootstrap.min.css"))
        frag.add_css(self.resource_string("static/css/m4s9p1.css"))
        frag.add_javascript(self.resource_string("static/js/src/script.js"))
        frag.add_javascript(self.resource_string("static/js/src/Json.js"))
        js_str = pkg_resources.resource_string(__name__, "static/js/src/jquery_min.js")
        js_str = pkg_resources.resource_string(__name__, "static/js/src/bootstrap.min.js")
        frag.add_javascript(unicode(js_str))

        frag.add_javascript(self.resource_string("static/js/src/popup_image_alignmentxblock.js"))
        
        frag.initialize_js('PopupImageAlignmentXBlock')
        return frag

    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("PopupImageAlignmentXBlock",
             """<popup_image_alignmentxblock/>
             """),
            ("Multiple PopupImageAlignmentXBlock",
             """<vertical_demo>
                <popup_image_alignmentxblock/>
                <popup_image_alignmentxblock/>
                <popup_image_alignmentxblock/>
                </vertical_demo>
             """),
        ]
