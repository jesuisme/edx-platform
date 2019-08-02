import dash
import dash_core_components as dcc
import dash_html_components as html
import colorlover as cl
import numpy as np
import pandas as pd
import logging
import math
log = logging.getLogger(__name__)
from django.contrib.auth.decorators import login_required
from student.models import UserProfile, CohertsUserDetail, OrganizationRegistration, CohertsOrganization

colorscale = cl.scales['9']['qual']['Paired']

referrer = None

@login_required
def dispatcher(request):
    """
    Main function for the dash application
    :param: request
    :type: Django Request object
    :return: response data from the dash application
    """
    referrer = request.META.get('HTTP_REFERER', '')
    log.info("dispatcher------")

    # Check for which url is being called and run the dashboard function for it
    if "admin_dashboard" in referrer:
        app = _create_admin_dashboard_app(request)
    else:
        app = _create_student_dashboard_app()

    params = {
        'data': request.body,
        'method': request.method,
        'content_type': request.content_type
    }
    with app.server.test_request_context(request.path, **params):
        app.server.preprocess_request()
        try:
            response = app.server.full_dispatch_request()
        except Exception as e:
            response = app.server.make_response(app.server.handle_exception(e))
        return response.get_data()


def _create_admin_dashboard_app(request):
    """
    Creates the dash application for the admin page -- layout, formatting, and styles
    :return: app
    :rtype: Dash application object
    """

    log.info("ADMIN DASHBOARD----")

    app = dash.Dash(__name__, csrf_protect=False)

    try:        
        df_cohorts = pd.read_csv('/edx/app/edxapp/edx-platform/common/djangoapps/student/cohort_details.csv')    
    except:
        log.info("EMPTY CSV FILE")
        pass

    

    userprofile_list = []
    userprofile_list_2 = []
    registred_not_learners = []
    facilitator_assigned = []

    cohort_options_set = list(set(df_cohorts["cohort"]))
    # cohort_options_set.sort()

    log.info("df cohorts list----%s----"% df_cohorts["cohort"])
    log.info("Cohort OPTIONS SET-----%s-----"% cohort_options_set)

    # cohort_list = [val['cohort'] for val in cohort_options_set]
    cohort_dict = [{'label': val, 'value': val} for val in cohort_options_set]

    log.info("cohort_dict------%s-----"% cohort_dict)


    on_graph = []
    pie_graph = {}
    final_total = []
    perform_track_pie_graph = []
    modules_assigned = []

    cohorts_data = pd.read_csv('/edx/app/edxapp/edx-platform/common/djangoapps/student/cohort_details.csv', index_col="cohort")
    for cohorts_detail in cohort_options_set:
        total = cohorts_data.loc[cohorts_detail,['not started','completed','started']].sum()
        pie_graph[cohorts_detail] =  total

        completed_pie = (cohorts_data.loc[cohorts_detail,['completed']]/ total) * 100
        track_pie = cohorts_data.loc[cohorts_detail,['completed','started']].sum() 


        perform_track_pie_graph.append(float(track_pie))
        on_graph.append(round(float(completed_pie),2))
        final_total.append(total)

    
    on_track = round(sum(on_graph)/ len(on_graph),2)
    performance_track = (sum(perform_track_pie_graph) / sum(final_total)) * 100
    performance_track = round(performance_track,2)

    try:
        user_prof = UserProfile.objects.get(user=request.user).organization
        log.info("USER PROFILE---%s---"% user_prof)
    except:
        user_prof = None

    if user_prof:
        userprofile = UserProfile.objects.filter(organization=user_prof,user__is_staff=False)
        user_profile_staff = UserProfile.objects.filter(organization=user_prof,user__is_staff=True)

        for prof_org_staff in user_profile_staff:
            facilitator_assigned.append(prof_org_staff.user.username)

        for profile in userprofile:
            userprofile_list.append(profile.user.username)


        org = OrganizationRegistration.objects.get(organization_name=user_prof)
        learner_cohort = CohertsUserDetail.objects.filter(organization=org)

        
        course_lists_org = CohertsOrganization.objects.filter(organization=org)
        
        import ast
        from opaque_keys.edx.keys import CourseKey
        from openedx.core.djangoapps.content.course_overviews.models import CourseOverview

        if course_lists_org:
            for coherts_object in course_lists_org:
                coherts_l = coherts_object.course_list
                lq = ast.literal_eval(coherts_l)

                for list_item in range(len(lq)):
                    course_key = CourseKey.from_string(str(lq[list_item]))
                    course_name = CourseOverview.objects.get(id=course_key)
                    modules_assigned.append(course_name.display_name)

        
        log.info("MODULES Assigned----%s-----"% modules_assigned)


        for learner_data in learner_cohort:
            userprofile_list_2.append(learner_data.learner.username)

    leaners_not_registered = list(set(userprofile_list) - set(userprofile_list_2))
    
    log.info("learnersregi---%s----"% len(leaners_not_registered))


    # This lays out the screen and where the graphs appear
    app.layout = html.Div([
        html.Div([  # Dropdown for selecting the cohort
            dcc.Dropdown(
                id='cohort-dropdown',
                options=cohort_dict,
                value='FAMU',
                placeholder='Cohorts'

            ),
        ], style={"width": "25%"}),
        html.Table([    # Graph table container
            html.Tr([     # Table row for summary data

                html.Td([
                    html.H3('COHORTS', style={"text-align": "center"}),
                    html.H3(len(cohort_options_set), style={"text-align": "center"}),
                ], style={"horizontal-align": "center", "vertical-align": "top", "width": "20%"}),


                html.Td([
                    html.H3('MODULES ASSIGNED', style={"text-align": "center"}),
                    html.H3(len(modules_assigned), style={"text-align": "center"}),  # Add logic here for modules assigned
                ], style={"horizontal-align": "center", "vertical-align": "top", "width": "20%"}),


                html.Td([
                    html.H3('ON-TRACK', style={"text-align": "center"}),
                    html.H3(str(on_track)+'%', style={"text-align": "center"}),  # Add logic here for % of students on track
                ], style={"horizontal-align": "center", "vertical-align": "top", "width": "20%"}),


                html.Td([
                    html.H3('PERFORMANCE', style={"text-align": "center"}),
                    html.H3(str(performance_track)+'%', style={"text-align": "center"}),  # Add logic here for average grade on the modules
                ], style={"horizontal-align": "center", "vertical-align": "top", "width": "20%"}),


                html.Td([
                    html.H3('FACILITATORS ASSIGNED', style={"text-align": "center"}),
                    # html.H3(Facilitator.objects.count(), style={"text-align": "center"}),                                        
                    html.H3(len(facilitator_assigned), style={"text-align": "center"}),                                        
                ], style={"horizontal-align": "center", "vertical-align": "top", "width": "20%"})

            ]),
            html.Tr([   # Table row for cohort graphs

                # There are five columns from the summary data -- the graphs will span the columns

                html.Td([  # Cell for cohort progress graph
                    dcc.Graph(
                        id='cohort-graph',
                        figure={
                            'data': [
                                {'x': cohort_options_set, 'y': df_cohorts['started'],'type': 'bar', 'name': 'Started'},
                                {'x': cohort_options_set, 'y': df_cohorts['not started'], 'type': 'bar', 'name': 'Not Yet Started'},
                                {'x': cohort_options_set, 'y': df_cohorts['completed'], 'type': 'bar', 'name': 'Completed'},
                                {'x': ['Not Registered'], 'y': [len(leaners_not_registered)], 'type': 'bar', 'name': 'Not Registered'},

                            ],  
                            'layout': {
                                'title': 'Cohort progress',
                                'barmode': 'stack'
                            }
                        }
                    ),
                ], colSpan=2.5),

                html.Td(id='cohort-pie', colSpan=2.5),  # Cell for the pie chart -- the callback fills in the data

            ]),
        ], style={"width": "100%"}),
    ])

    @app.callback(      # decorator that defines the targets of the interaction
        dash.dependencies.Output('cohort-pie', 'children'),     # The update will happen on the cohort pie chart
        [dash.dependencies.Input('cohort-dropdown', 'value')])  # The values from the cohort dropdown are the input
    def update_cohort_pie(value):

        # pie_graph = {}

        # cohorts_data = pd.read_csv('/edx/app/edxapp/edx-platform/common/djangoapps/student/cohort_details.csv', index_col="cohort")
        # for cohorts_detail in cohort_options_set:
        #     pie_graph[cohorts_detail] =  cohorts_data.loc[cohorts_detail,['not started','completed','started']].sum()
        graphs = list()
        graphs.append(
            dcc.Graph(
                id='graph2',
                figure={
                    'data': [
                        {
                            "values": pie_graph.values(),
                            "labels": pie_graph.keys(),
                            "hole": 0.4,
                            'type': 'pie'
                        },
                    ],
                    'layout': {
                        'title': 'Cohorts',
                    }
                }
            ),
        )

        return graphs

    return app

import plotly.graph_objs as go
from datetime import date
from datetime import datetime as dt
import datetime
from datetime import timedelta
import calendar

def _create_student_dashboard_app():
    """
    Creates the dash application for the student page -- layout, formatting, and styles
    :return: app
    :rtype: Dash application object
    """

    log.info("student dashboard----")
    app = dash.Dash(__name__, csrf_protect=False)    

    # Styles are defined using dictionaries.  This style is not used, but it's an example of a more complex
    # style that could be applied

    styles = {
        'pre': {
            'border': 'thin lightgrey solid',
            'overflowX': 'scroll'
        }
    }


    try:
        log.info("IN THE TRY BLOCK READING CSV FILE------")
        df_modules = pd.read_csv('/edx/app/edxapp/edx-platform/common/djangoapps/student/university_modules.csv')
        df_students = pd.read_csv('/edx/app/edxapp/edx-platform/common/djangoapps/student/university_records.csv', dtype={'Completed': np.bool})
        df_badges = pd.read_csv('/edx/app/edxapp/edx-platform/common/djangoapps/student/new_student_badges.csv')
        df_logins = pd.read_csv('/edx/app/edxapp/edx-platform/common/djangoapps/student/login_details.csv')
    except:
        log.info("EMPTY CSV FILE")
        pass

    # Write the DataFrame column to a set to remove duplicates
    # Convert the set to a list to support indexing later
    module_options_set = list(set(df_modules["ModuleName"]))
    module_options_set.sort()
    module_options = [{'label': val, 'value': val} for val in module_options_set]
    student_options_set = list(set(df_students["Student"]))
    student_options_set.sort()
    student_options = [{'label': val, 'value': val} for val in student_options_set]
    
    login_options_set = list(set(df_logins["Student"]))
    login_options_set.sort()
    login_options = [{'label': val, 'value': val} for val in login_options_set]
    

    log.info("module_options_set--------%s-----"% module_options_set)
    log.info("Student options set--------%s----"% student_options_set)


    # df_logins['Time']= pd.to_timedelta(df_logins["Time"]).values.astype(np.int64)
    # df1 = df_logins.groupby('Date', as_index=False).mean()
    # df1['Time']= pd.to_timedelta(df1["Time"])
    # log.info("TIME PER LOGIN----%s----"% df1['Time'].mean())

    # avg_time = str(df1['Time'].mean())
    # avg = avg_time.split('days', 1)[-1]




    if not module_options_set:
        module_options_set = ['no_data']

    bar_colors = 'rgbkymc'


    # This lays out the screen and where the graphs appear
    app.layout = html.Div([
        html.H1('Performance Tracking', style={"text-align": "center"}),
        html.H2('Cohort Data'),
        html.Div([     # Graph table container
            html.Div([  # Dropdown for selecting the module
                dcc.Dropdown(
                    id='module-dropdown',
                    options=module_options,
                    value=module_options_set[0]
                ),
            ], style={"width": "25%"}),
            html.Div(id="cohort-container", style={"display": "table-row"}),    # Table row for the three cohort graphs
            
            html.Div([                  
                
                
            ], id='student-dropdown', style={"width": "25%"}),
            html.Div(id="student-container", style={"display": "table-row"}),              

            # html.Div([
            #     html.H3('Average Time per Login'),
            #     html.H3(avg, style={})
            # ], style={"display": "table-row", "horizontal-align": "center", "vertical-align": "bottom"})
           
        ], style={"width": "100%", "display": "table"}),

    ])

    @app.callback(      # decorator that defines the targets of the interaction
        dash.dependencies.Output('cohort-container', 'children'),   # The update will happen on the cohort graphs        
        [dash.dependencies.Input('module-dropdown', 'value')])
        
        # The module values will be the input
    def update_cohort(value):
        graphs = list()
        module_data = df_modules[df_modules['ModuleName'] == value]
        student_data = df_students[df_students['Module'] == value]
        badges_data = df_badges[df_badges['ModuleName'] == value]
        
        dates_list = []


        for row in module_data['Date']:
            t = datetime.datetime.strptime(row, '%Y-%m-%d')        
            # t = datetime.datetime.strptime(row, '%Y-%m-%d %H:%M:%S+00:00')        
            dates_list.append("{0} {1}".format(calendar.month_name[t.month],t.day))
        
          

        graphs.append(
            html.Div([
                dcc.Graph(
                    id='graph1',
                    figure=go.Figure(
                        data=[
                            go.Bar(
                                x=dates_list,
                                y=module_data['Views'],
                                name='Number of Views',
                                marker=go.bar.Marker(
                                    color='mediumpurple',                                    
                                )
                            ),                            
                        ],
                        layout=go.Layout(
                            title='<b>Module Views Per Week</b>',
                            showlegend=True,                            
                            yaxis = {                            
                                'title':'<b>Total Views</b>'
                            },                           
                          
                            margin=go.layout.Margin(l=70, r=0, t=70, b=70)
                        )
                    ),           
        )   

            ],style={"height": 550,"width": "34%", "display": "table-cell"})             
        )
            

        graphs.append(
            html.Div([
                dcc.Graph(
                    id='graph2',
                    figure=go.Figure(
                        data=[
                            go.Bar(
                                x=df_logins['Date'],
                                y=df_logins['Logins'],
                                name='Number of Logins',
                                marker=go.bar.Marker(
                                    color= 'indianred',                                        
                                )
                            ),                            
                        ],
                        layout=go.Layout(
                            title='<b>Login Per Week</b>',
                            showlegend=True,                            
                            yaxis = {                            
                                'title':'<b>Total Logins</b>'
                            },                           
                          
                            margin=go.layout.Margin(l=40, r=0, t=40, b=70)
                        )
                    ),           
        )   

            ],style={"height": 550, "width": "33%", "display": "table-cell"})             
        )


        if (int(badges_data['Badge']) == 0) & (int(badges_data['Certificate']) == 0):
            graphs.append(
                html.Div([
                    html.H3('No Badge/Certificate Earned'),
                    
                ], style={"display": "table-cell", "horizontal-align": "center", "vertical-align": "bottom"})
            )
        else:
            graphs.append(
                html.Div([
                    dcc.Graph(
                        figure=go.Figure(
                            data=[
                                go.Bar(
                                    x=badges_data['ModuleName'],
                                    y=badges_data['Badge'],
                                    name='Badge',
                                    marker=go.bar.Marker(
                                        color='lightslategray'
                                    )
                                ),
                                go.Bar(
                                    x=badges_data['ModuleName'],
                                    y=badges_data['Certificate'],
                                    name='Certificate',
                                    marker=go.bar.Marker(
                                        color='darkgray'
                                    )
                                )
                            ],
                            layout=go.Layout(
                                title='<b>Badges and Certificates Earned</b>',
                                showlegend=True,                            
                                margin=go.layout.Margin(l=40, r=0, t=40, b=40)
                            )
                        ),                    
                        id='graph3'
                    )  
                   
                ], style={"height": 300, "width": "33%", "display": "table-cell"})
            ) 

        log.info("GRAPHS-----STudent dashboard----%s-----"% graphs)

        return graphs

    @app.callback(      # decorator that defines the targets of the interaction
        dash.dependencies.Output('student-container', 'children'),  # The update will happen on the student graphs
        [dash.dependencies.Input('student-dropdown', 'children'),      # The student and module values will be the input
        dash.dependencies.Input('module-dropdown', 'value')])


    def update_student(student_value, module_value):
        badges_data = df_badges[df_badges['ModuleName'] == module_value] 
        log.info("Badges data----%s-----"% badges_data)       
        
        df_logins['Time']= pd.to_timedelta(df_logins["Time"]).values.astype(np.int64)
        df1 = df_logins.groupby('Date', as_index=False).mean()
        df1['Time']= pd.to_timedelta(df1["Time"])
        log.info("TIME PER LOGIN----%s----"% df1['Time'].mean())

        avg_time = str(df1['Time'].mean())
        avg = avg_time.split('days', 1)[-1]


        graphs = list() 

        graphs.append(
            html.Div([
                html.H3('Module Progress:'),
                html.H3(str(float(badges_data['Progress']))+'%', style={})               
            ], style={"display": "table-cell"})
        ) 

        graphs.append(
            html.Div([
                html.H3('Final Grade:'),
                html.H3(str(float(badges_data['Grade']))+'%', style={})               
            ], style={"display": "table-cell"})
        ) 

        graphs.append(
            html.Div([                
                html.H3(badges_data['Homework'], style={})               
            ], style={})
        ) 

        graphs.append(
            html.Div([                
                html.H3(badges_data['Midterm Exam'], style={})               
            ], style={})
        ) 

        graphs.append(
            html.Div([                
                html.H3(badges_data['Final Exam'], style={})               
            ], style={})
        ) 

        graphs.append(
            html.Div([                
                html.H3('Average Time per Login'),
                html.H3(avg, style={})                
            ], style={})

        )
        return graphs
    return app 
                
    



