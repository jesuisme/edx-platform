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
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    # count = Integer(
    #     default=0, scope=Scope.user_state,
    #     help="A simple counter, to show something happening",
    # )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    # fragment.add_css(resource_string("static/css/studio-edit-accordion.css"))
    # fragment.add_javascript(resource_string("static/js/runtime-handlers.js"))
    def student_view(self, context=None):
        """
        The primary view of the PopupImageAlignmentXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/popup_image_alignmentxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/popup_image_alignmentxblock.css"))
        # frag.add_javascript(self.resource_string("static/js/src/diabetes_slider.js"))
        # frag.add_javascript(self.resource_string("static/js/src/knee_pain_slider.js"))
        # frag.add_css(self.resource_string("static/css/font/fonts.css"))
        frag.add_css(self.resource_string("static/css/common.css"))
        frag.add_css(self.resource_string("static/css/bootstrap.min.css"))
        frag.add_css(self.resource_string("static/css/m4s9p1.css"))
        
        # frag.add_javascript(self.resource_string("static/js/src/diabetes_slider.js"))
        # frag.add_javascript(self.resource_string("static/js/src/cancer_slider.js"))
        # frag.add_javascript(self.resource_string("static/js/src/knee_pain_slider.js"))

        # frag.add_javascript(self.resource_string("static/js/src/jquery_min.js"))
        # frag.add_javascript(self.resource_string("static/js/src/bootstrap.min.js"))
        
        frag.add_javascript(self.resource_string("static/js/src/script.js"))
        frag.add_javascript(self.resource_string("static/js/src/Json.js"))
        js_str = pkg_resources.resource_string(__name__, "static/js/src/jquery_min.js")
        js_str = pkg_resources.resource_string(__name__, "static/js/src/bootstrap.min.js")
        frag.add_javascript(unicode(js_str))

        frag.add_javascript(self.resource_string("static/js/src/popup_image_alignmentxblock.js"))
        
        # frag.add_javascript(self.resource_string("static/js/src/cancer_slider.js"))
        # frag.add_javascript(self.resource_string("static/js/src/cancer_slider.js"))
        # js_str = pkg_resources.resource_string(__name__, "static/js/src/cancer_slider.js")
        # frag.add_javascript(unicode(js_str))
        # frag.add_javascript(js_str)
        frag.initialize_js('PopupImageAlignmentXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    # @XBlock.json_handler
    # @XBlock.handler
    # def increment_count(self, data):
    #     """
    #     An example handler, which increments the data.
    #     """
    #     # Just to show data coming in...
    #     print("inside increment=========")
    #     html = self.resource_string("static/html/first_slide.html")
    #     # fragment = Fragment(html.format(self=self))
    #     # frag.add_css(self.resource_string("static/css/popup_image_alignmentxblock.css"))
    #     # frag.add_css(self.resource_string("static/css/font/fonts.css"))
    #     # frag.add_css(self.resource_string("static/css/common.css"))
    #     # frag.add_css(self.resource_string("static/css/bootstrap.min.css"))
    #     # fragment.add_javascript(self.resource_string("static/js/src/cancer_slider.js"))
    #     # frag.add_javascript(self.resource_string("static/js/src/script.js"))
    #     # frag.add_javascript(self.resource_string("static/js/src/cancer_slider.js"))
    #     # js_str = pkg_resources.resource_string(__name__, "static/js/src/cancer_slider.js")
    #     # frag.add_javascript(unicode(js_str))
    #     # frag.add_javascript(js_str)
    #     # frag.initialize_js('PopupImageAlignmentXBlock')
    #     # print("frag===========%s==========" % fragment)
    #     return html
        # return {"count": self.count}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
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
