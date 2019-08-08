import dash
import dash_core_components as dcc
import dash_html_components as html
import colorlover as cl
import numpy as np
import pandas as pd
import logging
import math
import datetime
import calendar
import os
import plotly.graph_objs as go
from datetime import date, timedelta
log = logging.getLogger(__name__)
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from student.models import UserProfile, CohertsUserDetail, OrganizationRegistration, CohertsOrganization
from django.contrib.auth import logout
colorscale = cl.scales['9']['qual']['Paired']

referrer = None

from os.path import dirname, realpath

filepath = realpath(__file__)

dir_of_file = dirname(filepath)
parent_dir_of_file = dirname(dir_of_file)
parents_parent_dir_of_file = dirname(dirname(parent_dir_of_file))
data_folder =  str(parents_parent_dir_of_file) + "/common/djangoapps/student/views/student_data_csvs"

@login_required
def dispatcher(request):
    """
    Main function for the dash application
    :param: request
    :type: Django Request object
    :return: response data from the dash application
    """
    referrer = request.META.get('HTTP_REFERER', '')

    try:
        admin_organization = UserProfile.objects.get(user=request.user).organization
    except:
        admin_organization = None


    if request.user.is_authenticated and admin_organization is not None:   
        # Check for which url is being called and run the dashboard function for it  
        if request.user.is_staff and "admin_dashboard" in referrer:
            app = _create_admin_dashboard_app(request,admin_organization)
        else:
            app = _create_student_dashboard_app(request,admin_organization)


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
      
    else:
        return HttpResponseForbidden('<b>403 Forbidden error</b>')



def _create_admin_dashboard_app(request,admin_organization):
    """
    Creates the dash application for the admin page -- layout, formatting, and styles
    :return: app
    :rtype: Dash application object
    """

    app = dash.Dash(__name__, csrf_protect=False)

    try:                
        cohorts_file_path = os.path.join(str(data_folder), "cohort_details.csv")
        df_cohorts = pd.read_csv(cohorts_file_path)    
    except:
        df_cohorts = None
        log.info("EMPTY CSV FILE")    

    userprofile_list = []
    userprofile_list_2 = []
    facilitator_assigned = []

    if df_cohorts is not None and admin_organization == str(df_cohorts['organization'][0]):

        cohort_options_set = list(set(df_cohorts["cohort"]))
        cohort_dict = [{'label': val, 'value': val} for val in cohort_options_set]
        on_graph = []
        pie_graph = {}
        final_total = []
        perform_track_pie_graph = []
        modules_assigned = []

        cohorts_data = pd.read_csv(cohorts_file_path, index_col="cohort")
        for cohorts_detail in cohort_options_set:
            total = cohorts_data.loc[cohorts_detail,['not started','completed','started']].sum()
            pie_graph[cohorts_detail] =  total

            completed_pie = (cohorts_data.loc[cohorts_detail,['completed']]/ total) * 100
            track_pie = cohorts_data.loc[cohorts_detail,['completed','started']].sum() 


            perform_track_pie_graph.append(float(track_pie))
            on_graph.append(round(float(completed_pie),2))
            final_total.append(total)

        try:
            on_track = round(sum(on_graph)/ len(on_graph),2)
        except:
            on_track = 0

        try:
            performance_track = (sum(perform_track_pie_graph) / sum(final_total)) * 100
            performance_track = round(performance_track,2)
        except:
            performance_track = 0

        try:
            user_prof = UserProfile.objects.get(user=request.user).organization
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


            for learner_data in learner_cohort:
                userprofile_list_2.append(learner_data.learner.username)

        leaners_not_registered = list(set(userprofile_list) - set(userprofile_list_2))   


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
                                    {'x': list(df_cohorts["cohort"]), 'y': df_cohorts['started'],'type': 'bar', 'name': 'Started', 'marker': dict(color='#f8971f')},
                                    {'x': list(df_cohorts["cohort"]), 'y': df_cohorts['not started'], 'type': 'bar', 'name': 'Not Yet Started', 'marker': dict(color='#00a9b7')},
                                    {'x': list(df_cohorts["cohort"]), 'y': df_cohorts['completed'], 'type': 'bar', 'name': 'Completed', 'marker': dict(color='#a6cd57')},
                                    {'x': ['Not Registered'], 'y': [len(leaners_not_registered)], 'type': 'bar', 'name': 'Not Registered', 'marker': dict(color='#005f86')},

                                ],  
                                'layout': {
                                    'title': '<b>Cohort progress</b>',
                                    'barmode': 'stack',
                                    'xaxis' : {
                                        'title': '<b>Cohorts</b>',
                                    },
                                    'yaxis': {
                                        'title': '<b>Learners</b>',
                                    },
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
                                'type': 'pie',
                                "marker": {'colors': ['#9cadb7', '#333f48', 'rgb(166, 205, 87)', '#bf5700', '#ffd600', '#a6cd57', ' #00a9b7', '#f8971f', '#579d42', '#005f86', '#9cadb7', '#d6d2c4'                                    
                                ]},
                            },
                        ],
                        'layout': {
                            'title': '<b>Cohorts</b>',
                        }
                    }
                ),
            )

            return graphs

        return app

    else:
        app.layout = html.Div([
            html.H3('No Data Found')
            ])
        return app  


# Student Dashboard

def _create_student_dashboard_app(request,admin_organization):
    """
    Creates the dash application for the student page -- layout, formatting, and styles
    :return: app
    :rtype: Dash application object
    """

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
        module_file_path = os.path.join(str(data_folder), "university_modules.csv")
        records_file_path = os.path.join(str(data_folder), "university_records.csv")
        student_file_path = os.path.join(str(data_folder), "student_badges.csv")
        login_file_path = os.path.join(str(data_folder), "login_details.csv")
        df_modules = pd.read_csv(module_file_path)
        df_students = pd.read_csv(records_file_path, dtype={'Completed': np.bool})
        df_badges = pd.read_csv(student_file_path)
        df_logins = pd.read_csv(login_file_path)
    except:
        df_modules = None
        df_students = None
        df_badges = None
        df_logins = None
        log.info("EMPTY CSV FILE")
        

    # Write the DataFrame column to a set to remove duplicates
    # Convert the set to a list to support indexing later
    if df_modules is not None:
        module_options_set = list(set(df_modules["ModuleName"]))
        module_options_set.sort()
        module_options = [{'label': val, 'value': val} for val in module_options_set]
        student_options_set = list(set(df_students["Student"]))
        student_options_set.sort()
        student_options = [{'label': val, 'value': val} for val in student_options_set]
        
        login_options_set = list(set(df_logins["Student"]))
        login_options_set.sort()
        login_options = [{'label': val, 'value': val} for val in login_options_set]  

        if not module_options_set:
            module_options_set = ['no_data']


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
                html.Div(id="student-container", style={"width": "200%"}),   
              
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
                                        color='#a6cd57',                                    
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

                ],style={"height": 550,"width": "50%", "display": "table-cell"})             
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
                                        color= '#9cadb7',                                        
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

                ],style={"height": 550, "width": "50%", "display": "table-cell"})             
            )
     
            return graphs

        @app.callback(      # decorator that defines the targets of the interaction
            dash.dependencies.Output('student-container', 'children'),  # The update will happen on the student graphs
            [dash.dependencies.Input('student-dropdown', 'children'),      # The student and module values will be the input
            dash.dependencies.Input('module-dropdown', 'value')])


        def update_student(student_value, module_value):
            badges_data = df_badges[df_badges['ModuleName'] == module_value] 
            
            df_logins['Time']= pd.to_timedelta(df_logins["Time"]).values.astype(np.int64)
            df1 = df_logins.groupby('Date', as_index=False).mean()
            df1['Time']= pd.to_timedelta(df1["Time"])

            avg_time = str(df1['Time'].mean())
            avg = avg_time.split('days', 1)[-1]


            graphs = list() 

            graphs.append(
                html.Div([
                    html.H3('Module Progress:',style={"text-align": "center", "width": "100%"}),
                    html.H3(str(float(badges_data['Progress']))+'%', style={"text-align": "center"})               
                ], style={"width": "14%", "display": "inline-block"})
            ) 

            graphs.append(
                html.Div([
                    html.H3('Final Grade:',style={"text-align": "center"}),
                    html.H3(str(float(badges_data['Grade']))+'%', style={"text-align": "center"})               
                ], style={"width": "14%", "display": "inline-block"})
            ) 

            if (int(badges_data['Badge']) == 0) & (int(badges_data['Certificate']) == 0):
                graphs.append(
                    html.Div([
                        html.H3('No Badge/Certificate Earned'),
                        
                    ], style={"width": "14%", "display": "inline-block", "height": "100.16"})
                )
            else:     
                graphs.append(
                    html.Div([   
                        html.H3("Certificates Earned: "+ str(int(badges_data['Certificate'])), style={"text-align": "center", "width": "100%"}),
                        html.H3("Badges Earned: "+ str(int(badges_data['Badge'])), style={"text-align": "center", "width": "100%"})               
                    ], style={"width": "14%", "display": "inline-block"})
                ) 

            graphs.append(
                html.Div([      
                    html.H3(badges_data['Homework'], style={"text-align": "center"})               
                ], style={"width": "14%", "display": "inline-block"})
            ) 

            graphs.append(
                html.Div([    
                    html.H3(badges_data['Midterm Exam'], style={"text-align": "center"})               
                ], style={"width": "14%", "display": "inline-block"})
            ) 

            graphs.append(
                html.Div([    
                    html.H3(badges_data['Final Exam'], style={"text-align": "center"})               
                ], style={"width": "14%", "display": "inline-block"})
            ) 

            graphs.append(
                html.Div([   
                    html.H3('Average Time per Login',style={"text-align": "center"}),
                    html.H3(avg, style={"text-align": "center"})                
                ], style={"width": "14%", "display": "inline-block"})

            )
            return graphs
        return app 
    
    else:
        app.layout = html.Div([
            html.H3('No Data Found')
            ])
        return app                



        



