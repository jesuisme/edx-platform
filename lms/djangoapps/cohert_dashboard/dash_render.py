import dash
import dash_core_components as dcc
import dash_html_components as html
import dash_bootstrap_components as dbc
import colorlover as cl
import numpy as np
import pandas as pd
import logging
import math
import datetime
import calendar
import os
import re
import plotly.graph_objs as go
from datetime import date, timedelta
log = logging.getLogger(__name__)
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from student.models import UserProfile, CohertsUserDetail, OrganizationRegistration, CohertsOrganization, CourseAccessRole
from django.contrib.auth import logout
from django.contrib.staticfiles.storage import staticfiles_storage
colorscale = cl.scales['9']['qual']['Paired']

referrer = None

from os.path import dirname, realpath

filepath = realpath(__file__)

dir_of_file = dirname(filepath)
parent_dir_of_file = dirname(dir_of_file)
parents_parent_dir_of_file = dirname(dirname(parent_dir_of_file))
data_folder =  str(parents_parent_dir_of_file) + "/common/djangoapps/student/views/student_data_csvs"

css_directory = os.getcwd()
stylesheets = ['header.css']
static_css_route = '/static/assets'

image_logo = staticfiles_storage.url('cohert_dashboard/assets/images/logo.png')
user_logo = staticfiles_storage.url('cohert_dashboard/assets/images/default_30.png')
header_file = staticfiles_storage.url('cohert_dashboard/assets/font-awesome/css/font-awesome.min.css')

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


# New admin Dashboard

def _create_admin_dashboard_app(request,admin_organization):
    """
    Creates the dash application for the admin page -- layout, formatting, and styles
    :return: app
    :rtype: Dash application object
    """
    # app = dash.Dash(__name__,csrf_protect=False)
    app = dash.Dash(__name__)
    # header_file = staticfiles_storage.url('cohert_dashboard/assets/font-awesome/css/font-awesome.min.css')
    custom_admin_css = staticfiles_storage.url('cohert_dashboard/assets/css/custom_admin.css')

    # custom_student_css = staticfiles_storage.url('cohert_dashboard/assets/css/custom_student.css')

    # image_logo = staticfiles_storage.url('cohert_dashboard/assets/images/logo.png')
    # user_logo = staticfiles_storage.url('cohert_dashboard/assets/images/default_30.png')

    try:                
        cohorts_file_path = os.path.join(str(data_folder), "cohort_details.csv")
        df_cohorts = pd.read_csv(cohorts_file_path)    
    except:
        df_cohorts = None
        log.info("EMPTY CSV FILE") 

    try:
        user_prof = UserProfile.objects.get(user=request.user).organization
    except:
        user_prof = None   

    userprofile_list = []
    userprofile_list_2 = []
    facilitator_assigned = []

    if df_cohorts is not None: 
        cohort_options_set = list(set(df_cohorts["cohort"]))
        cohort_options_set.sort()



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


        if user_prof:
            userprofile = UserProfile.objects.filter(organization=user_prof,user__is_staff=False)
            user_profile_staff = UserProfile.objects.filter(organization=user_prof,user__is_staff=True)

            for prof_org_staff in user_profile_staff:
                facilitator_assigned.append(prof_org_staff.user.username)

            org = OrganizationRegistration.objects.get(organization_name=user_prof)
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
 

        # This lays out the screen and where the graphs appear

        cohort_dict.insert(0,{'value': 'all_cohorts', 'label': 'All Cohorts Data'})
        cohort_options_set.insert(0,'all_cohorts')
        

        app.layout = html.Div([ 
            html.Link(href=custom_admin_css, rel='stylesheet'),
            html.Link(href=header_file, rel='stylesheet'),
            html.Link(href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', rel='stylesheet'),


            #Header
            html.Header([                
                html.Div(
                    className="inner",
                    children=[

                        html.Div([
                            html.A([
                                html.Img(
                                    className="logo",
                                    src=image_logo,
                                    alt='Dell Medical School | The University of Texas at Austin Home Page')
                            ], href="/dashboard")                    
                        ], className="header-logo"),


                        html.Div([
                            html.Form([                                
                                html.Button([
                                    html.I(" Download Student Data",className="fa fa-download")
                                ],className="btn", type='submit',style={'margin-left': '450px', 'position': 'relative', 'bottom': '9px', 'background-color': '#4DA3D2', 'border': 'none', 'color': 'white', 'cursor': 'pointer', 'padding': '7px 9px','font-size': '20px'})
                            ], action='/data_student_csv_data', method='post')
                        ], className="header-logo"),

                        html.Div([
                            html.Ul([
                                html.Li([
                                    html.Div(children=[
                                        html.Img(src=user_logo, className="user-image-frame", style={'margin-left': '20px'}),
                                        html.Span([
                                            str(request.user.username),
                                        ],className='username', style={'margin-left': '10px', 'position': 'relative', 'bottom': '12px'}),
                                    ],className='nav-item hidden-mobile')
                                ]),

                                html.Div([                                     
                                    html.Div(children=[
                                        html.Div(children=[
                                            html.Button([
                                                html.I(className="fa fa-caret-down")
                                            ],className='dropbtn'),
                                            html.Div([
                                                html.A(['Dashboard'],href='/dashboard'),
                                                html.A(['Account'],href='/account/settings'),
                                                html.A(['Sign Out'],href='/logout'),
                                            ],className='dropdown-content')
                                        ],className='dropdown'),
                                    ],className='navbar'),                                  
                                   
                                ], className='dropdown'),

                            ])
                        ], className="header-menu")
                    ]
                )
            ]),

            # Dropdown for selecting the cohort

            html.Div([ 
                dcc.Dropdown(
                    id='cohort-dropdown',
                    options=cohort_dict,
                    value= cohort_options_set[0]
                ),
            ], style={"width": "25%"}),

            html.Div(
                children=[
                    html.Div(
                        children=[
                            html.Div(
                                children=[
                                    html.Div(
                                        children=[
                                            html.Div(
                                                children=[
                                                    html.Div([
                                                        html.I(className='fa fa-users')
                                                    ],className='widget-header-icon'),
                                            ],className='widget-header'),
                                            html.Div(
                                                children=[
                                                    html.Div(['Cohorts'],className='text'),
                                                    html.H1(className='number', id='cohort_id')
                                            ],className='widget-body'),
                                    ],className='widget'),
                            ],className='width25'),


                            html.Div(
                                children=[
                                    html.Div(
                                        children=[
                                            html.Div(
                                                children=[
                                                    html.Div([
                                                        html.I(className='fa fa-book')
                                                    ],className='widget-header-icon'),
                                            ],className='widget-header'),
                                            html.Div(
                                                children=[
                                                    html.Div(['Modules Assigned'],className='text'),
                                                    html.H1(className='number', id='module_id')
                                            ],className='widget-body'),
                                    ],className='widget'),
                            ],className='width25'),



                            html.Div(
                                children=[
                                    html.Div(
                                        children=[
                                            html.Div(
                                                children=[
                                                    html.Div([
                                                        html.I(className='fa fa-calendar-check-o')
                                                    ],className='widget-header-icon'),
                                            ],className='widget-header'),
                                            html.Div(
                                                children=[
                                                    html.Div(['On-Track'],className='text'),
                                                    html.H1(className='number', id='on_track_id')
                                            ],className='widget-body'),
                                    ],className='widget'),
                            ],className='width25'),


                            html.Div(
                                children=[
                                    html.Div(
                                        children=[
                                            html.Div(
                                                children=[
                                                    html.Div([
                                                        html.I(className='fa fa-line-chart')
                                                    ],className='widget-header-icon'),
                                            ],className='widget-header'),
                                            html.Div(
                                                children=[
                                                    html.Div(['Performance'],className='text'),
                                                    html.H1(className='number', id='performance_track_id')
                                            ],className='widget-body'),
                                    ],className='widget'),
                            ],className='width25'),

                            html.Div(
                                children=[
                                    html.Div(
                                        children=[
                                            html.Div(
                                                children=[
                                                    html.Div([
                                                        html.I(className='fa fa-user-circle-o')
                                                    ],className='widget-header-icon'),
                                            ],className='widget-header'),
                                            html.Div(
                                                children=[
                                                    html.Div(['Facilitators Assigned'],className='text'),
                                                    html.H1(className='number', id='staff_id')
                                            ],className='widget-body'),
                                    ],className='widget'),
                            ],className='width25'),

                    ],className='custom-row'),
                    
                    html.Div(
                        children=[
                            html.Div(children=[
                                html.Div(children=[
                                    html.H4('Cohort Progress')   
                                ],className='box-header'),
                                html.Div([                                    


                                ],id='cohort-graph', className='box-body'),  
                            ],className='box')
                    ],className='width50'),  



                    html.Div(
                        children=[
                            html.Div(children=[
                                html.Div(children=[
                                    html.H4('Cohorts')
                                ],className='box-header'),
                                html.Div([                                    

                                ],id='cohort-pie', className='box-body'),                                 

                            ],className='box')
                    ],className='width50'),  


            ],className='container'),

            #Footer

            html.Footer([
                html.Div(
                    className='colophon', 
                    children=[
                        html.Nav(className='nav-colophon',children=[
                            html.Ol(children=[
                                html.Li([
                                    html.A(["About"], href="/admin_about")

                                ],className='nav-colophon-01'),

                            ])

                        ]),

                        html.Br([]),

                        html.Div(children=[
                            html.P(
                                html.A([
                                    html.Img(
                                        src=image_logo,
                                        alt='organization logo',
                                        width='250'      
                                    )
                                ],href='/dashboard')
                            )
                        ],className='wrapper-logo'),

                        html.P("Dell Medical School, The University of Texas at Austin. All rights reserved except where noted. EdX, Open edX and their respective logos are trademarks or registered trademarks of edX Inc.", className='copyright'),

                        html.Nav(children=[
                            html.Ul(children=[
                                html.Li([
                                    html.A(["Privacy Policy"],href="/privacy")
                                ],className='nav-legal-01'),

                                html.Li([
                                    html.A(["Terms of Service"],href="/tos")
                                ],className='nav-legal-02'),

                                html.Li([
                                    html.A(["Honor Code"],href="/honor")
                                ],className='nav-legal-03'),


                                html.Li([
                                    html.A(["Take free online courses at edX.org"],href="#")
                                ],className='nav-legal-04'),
                            ])
                        ],className='nav-legal'),
                    ]
                ),

                html.Div(children=[
                    html.P(
                        html.A([
                            html.Img(
                                src="https://files.edx.org/openedx-logos/edx-openedx-logo-tag.png",
                                alt="Powered by Open edX", 
                                width="100"  
                            )
                        ],href="http://open.edx.org")
                    )
                ],className='footer-about-openedx')
            ], style={'box-shadow': '0 -1px 5px 0 rgba(0, 0, 0, 0.1)', 'border-top': '1px solid #c5c6c7', 'padding': '5px 20px', 'background': '#fff', 'clear': 'both', 'margin-top': '100px'})
        ]) 
        @app.callback(      # decorator that defines the targets of the interaction
            [dash.dependencies.Output('cohort-graph', 'children'),
            dash.dependencies.Output('cohort-pie', 'children'), 
            dash.dependencies.Output('cohort_id', 'children'), 
            dash.dependencies.Output('module_id', 'children'),            
            dash.dependencies.Output('on_track_id', 'children'),
            dash.dependencies.Output('performance_track_id', 'children'),
            dash.dependencies.Output('staff_id', 'children')],                 
            [dash.dependencies.Input('cohort-dropdown', 'value')])  
        def update_cohort_pie(value):
            value = str(value)   
            if value == 'all_cohorts': 
                if df_cohorts is not None: 
                    cohort_options_set = list(set(df_cohorts["cohort"]))
                    cohort_options_set.sort()
                    cohort_dict = [{'label': val, 'value': val} for val in cohort_options_set]

                    cohorts_data = pd.read_csv(cohorts_file_path, index_col="cohort")
                    for cohorts_detail in cohort_options_set:
                        total = cohorts_data.loc[cohorts_detail,['not started','completed','started']].sum()                        

                        completed_pie = (cohorts_data.loc[cohorts_detail,['completed']]/ total) * 100

                        track_pie = cohorts_data.loc[cohorts_detail,['completed','started']].sum() 

                       
                        perform_track_pie_graph.append(float(track_pie))
                        on_graph.append(round(completed_pie,2))

                        
                        final_total.append(total)

                    try:
                        track_v = np.nansum(on_graph)
                        track_t = round(np.nansum(on_graph)/ len(on_graph),2)
                        on_track = track_t
                    except:
                        on_track = 0

                    try:
                        performance_track = (sum(perform_track_pie_graph) / sum(final_total)) * 100
                        performance_track = round(performance_track,2)
                    except:
                        performance_track = 0


                    if user_prof:
                        userprofile = UserProfile.objects.filter(organization=user_prof,user__is_staff=False)

                        for profile in userprofile:
                            userprofile_list.append(profile.user.username)


                        org = OrganizationRegistration.objects.get(organization_name=user_prof)
                        learner_cohort = CohertsUserDetail.objects.filter(organization=org)


                        for learner_data in learner_cohort:
                            userprofile_list_2.append(learner_data.learner.username)

                    leaners_not_registered = list(set(userprofile_list) - set(userprofile_list_2)) 

                graphs = list()                             
                graphs.append(
                    dcc.Graph(
                        id='graph1',
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
                                    'title': '', 
                                    'autotick': False,                                                                                                  
                                    'tickmode': 'array',
                                                                                                                                                                  
                                },
                                'yaxis': {
                                    'title': '<b>Learners</b>',
                                },
                            }
                        }
                    )
                )

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
                    )
                )
                
                graphs.append(len(cohort_options_set))
                graphs.append(len(modules_assigned))  
                graphs.append(str(on_track)+'%')
                graphs.append(str(performance_track)+'%')
                graphs.append(len(facilitator_assigned))
 
                return graphs
            else:
                graphs = list()
                cohort_learner_data = df_cohorts[df_cohorts["cohort"] == value]
                on_graph_1 = []
                modules_assigned_1 = []
                if pie_graph.get(value) != 0:
                    total_1 = int(cohort_learner_data['not started']) + int(cohort_learner_data['started']) + int(cohort_learner_data['completed'])

                    completed_1 = (float(cohort_learner_data['completed'])/ float(total_1)) * 100
                    track_pie_1 = int(cohort_learner_data['started']) + int(cohort_learner_data['completed'])
                    performance_track_1 = (float(track_pie_1) / float(total_1)) * 100
                    performance_track_1 = round(performance_track_1,2)             

                    total_learners = pie_graph.get(value)

                    org = OrganizationRegistration.objects.get(organization_name=user_prof)
                    course_lists_org_1 = CohertsOrganization.objects.filter(organization=org, coherts_name=value)

                    import ast
                    from opaque_keys.edx.keys import CourseKey
                    from openedx.core.djangoapps.content.course_overviews.models import CourseOverview                    

                    if course_lists_org_1:
                        for coherts_object in course_lists_org_1:
                            coherts_l = coherts_object.course_list
                            lq = ast.literal_eval(coherts_l)

                            for list_item in range(len(lq)):
                                course_key = CourseKey.from_string(str(lq[list_item]))
                                course_name = CourseOverview.objects.get(id=course_key) 
                                modules_assigned_1.append(course_name.display_name)

                                course_access = CourseAccessRole.objects.filter(org=org, course_id=course_key)
                                for course_acc in course_access:
                                    if course_acc.role == 'staff' and str(course_acc.user) != 'edx':
                                        facilitator_assigned.append(course_acc.user)

                    

                    graphs.append(
                        dcc.Graph(
                            id='graph3',
                            figure={
                                'data': [
                                    {'x': list(cohort_learner_data["cohort"]), 'y': cohort_learner_data['started'],'type': 'bar', 'name': 'Started', 'marker': dict(color='#f8971f')},
                                    {'x': list(cohort_learner_data["cohort"]), 'y': cohort_learner_data['not started'], 'type': 'bar', 'name': 'Not Yet Started', 'marker': dict(color='#00a9b7')},
                                    {'x': list(cohort_learner_data["cohort"]), 'y': cohort_learner_data['completed'], 'type': 'bar', 'name': 'Completed', 'marker': dict(color='#a6cd57')},                               

                                ],  
                                'layout': {
                                    'title': '<b>Cohort progress</b>',
                                    'barmode': 'stack',                                    
                                    'xaxis' : {      
                                        'title': '',                                     
                                        'autotick': False,                                                                                                  
                                        'tickmode': 'array',                                                                                                                                                                  
                                    },
                                    'yaxis': {
                                        'title': '<b>Learners</b>',
                                    },
                                }
                            }
                        )
                    )

                    graphs.append(                        
                        dcc.Graph(
                            id='graph2',
                            figure={
                                'data': [
                                    {
                                        "values": [int(cohort_learner_data['started']), int(cohort_learner_data['not started']), int(cohort_learner_data['completed']), total_learners],
                                        "labels": ['started', 'not started', 'completed', 'learners'],
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
                        )
                    )
                    graphs.append(str(1))
                    graphs.append(len(modules_assigned_1))                                       
                    graphs.append(str(round(float(completed_1),2))+'%')
                    graphs.append(str(performance_track_1)+'%')
                    graphs.append(len(facilitator_assigned))
                    return graphs
                else:
                    modules_assigned_2 = []
                    org = OrganizationRegistration.objects.get(organization_name=user_prof)
                    course_lists_org_1 = CohertsOrganization.objects.filter(organization=org, coherts_name=value)

                    import ast
                    from opaque_keys.edx.keys import CourseKey
                    from openedx.core.djangoapps.content.course_overviews.models import CourseOverview                    

                    if course_lists_org_1:
                        for coherts_object in course_lists_org_1:
                            coherts_l = coherts_object.course_list
                            lq = ast.literal_eval(coherts_l)

                            for list_item in range(len(lq)):
                                course_key = CourseKey.from_string(str(lq[list_item]))
                                course_name = CourseOverview.objects.get(id=course_key)  
                                modules_assigned_2.append(course_name.display_name)

                    graphs.append(
                        html.P(
                            html.B('No Data found'),
                        )                           
                    )

                    graphs.append(
                        html.P(
                            html.B('No Data found'),
                        )    
                    )
                    graphs.append(str(1))
                    graphs.append(str(len(modules_assigned_2)))                    
                    graphs.append(str(0.0)+'%')
                    graphs.append(str(0.0)+'%')
                    graphs.append(len(facilitator_assigned))
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

    # app = dash.Dash(__name__, csrf_protect=False)    
    app = dash.Dash(__name__)    

    # Styles are defined using dictionaries.  This style is not used, but it's an example of a more complex
    # style that could be applied

    custom_student_css = staticfiles_storage.url('cohert_dashboard/assets/css/custom_student.css')

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
    if df_badges is not None:
        module_options_set = list(set(df_badges["ModuleName"]))
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

            html.Link(href=custom_student_css, rel='stylesheet'),
            html.Link(href=header_file, rel='stylesheet'),  
            html.Link(href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', rel='stylesheet'),        
                       

            #Header
            html.Header([                
                html.Div(
                    className="inner",
                    children=[
                        html.Div([
                            html.A([
                                html.Img(
                                    className="logo",
                                    src=image_logo,
                                    alt='Dell Medical School | The University of Texas at Austin Home Page')
                            ], href="/dashboard")                    
                        ], className="header-logo"),


                        html.Div([
                            html.Ul([
                                html.Li([
                                    html.Div(children=[
                                        html.Img(src=user_logo, className="user-image-frame", style={'margin-left': '20px'}),
                                        html.Span([
                                            str(request.user.username),
                                        ],className='username', style={'margin-left': '10px', 'position': 'relative', 'bottom': '12px'}),
                                    ],className='nav-item hidden-mobile')
                                ]),

                                html.Div([                                     
                                    html.Div(children=[
                                        html.Div(children=[
                                            html.Button([
                                                html.I(className="fa fa-caret-down")
                                            ],className='dropbtn'),
                                            html.Div([
                                                html.A(['Dashboard'],href='/dashboard'),
                                                html.A(['Account'],href='/account/settings'),
                                                html.A(['Sign Out'],href='/logout'),
                                            ],className='dropdown-content')
                                        ],className='dropdown'),
                                    ],className='navbar'),                                  
                                   
                                ], className='dropdown'),

                            ])
                        ], className="header-menu")
                    ]
                )
            ]),

            # html.H1('Performance Tracking', style={"text-align": "center"}),           
            html.Div([     # Graph table container
                html.Div([  # Dropdown for selecting the module     

                    dcc.Dropdown(
                        id='module-dropdown',
                        options=module_options,
                        value=module_options_set[0]
                    ),                    
                ], style={"width": "25%", "padding-left": "20px"}),   
                html.Div(id="cohort-container", style={"display": "table-row"}),    # Table row for the three cohort graphs                
                html.Div([                     
                    
                ], id='student-dropdown', style={"width": "25%"}),
                html.Div(id="student-container", style={"width": "100%"}),   
              
            ], style={"width": "100%", "display": "table", "margin-top": "7px"}),

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
            login_date_list = []

            if not module_data.empty:
                for row in module_data['Date']:
                    t = datetime.datetime.strptime(row, '%Y-%m-%d')        
                    # t = datetime.datetime.strptime(row, '%Y-%m-%d %H:%M:%S+00:00')        
                    dates_list.append("{0} {1}".format(calendar.month_name[t.month],t.day))           
            else:
                date_today = date.today()
                today_d1 = date_today.strftime("%Y-%m-%d")
                today_d2 = datetime.datetime.strptime(today_d1, '%Y-%m-%d')
                dates_list.append("{0} {1}".format(calendar.month_name[today_d2.month],today_d2.day))
                module_data['Views'] = 0


            for login_date in df_logins['Date']:
                date_login_dt = datetime.datetime.strptime(login_date, '%Y-%m-%d')
                login_date_list.append("{0} {1}".format(calendar.month_name[date_login_dt.month],date_login_dt.day)) 

            graphs.append(
                html.Div(children=[
                    html.Div(children=[
                        html.Div(children=[
                            html.Div([
                                html.H4('Course Views'),
                            ],className='box-header'),
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
                                                    color='#bf5700',
                                                    line=dict(
                                                        color='rgb(0,0,0,255)',
                                                        width=1.1,
                                                    ),
                                                    opacity=0.6                                                                                     
                                                )
                                            ),                            
                                        ],
                                        layout=go.Layout(
                                            title='<b>Course Views</b>',
                                            showlegend=True,                            
                                            yaxis = {                            
                                                'title':'<b>Total Views</b>',

                                            },                           
                                          
                                            margin=go.layout.Margin(l=70, r=0, t=70, b=70)
                                        )
                                    ),           
                                ) 
                            ],className='box-body'),
                        ],className='box')
                    ],className='width50'),


                    html.Div(children=[
                        html.Div(children=[
                            html.Div([
                                html.H4('Login Details'),
                            ],className='box-header'),
                            html.Div([                                
                                dcc.Graph(
                                    id='graph2',
                                    figure=go.Figure(
                                        data=[
                                            go.Bar(
                                                x=login_date_list,
                                                y=df_logins['Logins'],
                                                name='Number of Logins',
                                                marker=go.bar.Marker(
                                                    color= '#005f86', 
                                                    line=dict(                                                        
                                                        # color='rgb(0,0,0,255)',
                                                        color='#000000',
                                                        width=1.0,
                                                    ),   
                                                    opacity=0.6                                    
                                                )
                                            ),                            
                                        ],
                                        layout=go.Layout(
                                            title='<b>Login Details</b>',
                                            showlegend=True,                            
                                            yaxis = {                            
                                                'title':'<b>Total Logins</b>'
                                            },                           
                                          
                                            margin=go.layout.Margin(l=40, r=0, t=40, b=70)
                                        )
                                    ),           
                                ) 
                            ],className='box-body'),
                        ],className='box')
                    ],className='width50'),

                ],className='container')
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


            avg_sp = avg.split(':')

            deltas = timedelta(hours=float(avg_sp[0]), minutes=float(avg_sp[1]), seconds=float(avg_sp[2]))
            total_seconds = deltas.total_seconds()
            minutes = int(total_seconds // 60)
            seconds = int(total_seconds % 60)

            final_avg_value = '{minutes}:{seconds}'.format(minutes=minutes, seconds=seconds)
            

            homework_data_list = re.findall(r'\d+\.\d+', str(badges_data['Homework']))
            mid_term_data_list = re.findall(r'\d+\.\d+', str(badges_data['Midterm Exam']))

            final_term_data_list = re.findall(r'\d+\.\d+', str(badges_data['Final Exam']))
            # final_term_data_list = str(badges_data['Final Exam'])
            entrance_term_data_list = re.findall(r'\d+\.\d+', str(badges_data['Entrance Exam']))
            # entrance_term_data_list = str(badges_data['Entrance Exam'])         


            if mid_term_data_list:
                mid_term_header = ['Midterm Exam(out of '+str(mid_term_data_list[1])+'%)']
                mid_term_value = str(mid_term_data_list[0])+'%'
            else:
                mid_term_header = ['Midterm Exam']
                mid_term_value = '--'


            if homework_data_list:
                homework_term_header = ['Homework(out of '+str(homework_data_list[1])+'%)']
                homework_term_value = str(homework_data_list[0])+'%'
            else:
                homework_term_header = ['Homework']
                homework_term_value = '--'


            if final_term_data_list:
                final_term_header = ['Final test(out of 100%)']
                final_term_value = str(final_term_data_list[0])+'%'
            else:
                final_term_header = ['Final test(out of 100%)']
                final_term_value = '--'



            if entrance_term_data_list:
                entrance_term_header = ['Pre test(out of 100%)']
                entrance_term_value = str(entrance_term_data_list[0])+'%'
            else:
                entrance_term_header = ['Pre test(out of 100%)']
                entrance_term_value = '--'

            if (int(badges_data['Badge']) == 0) & (int(badges_data['Certificate']) == 0):
                certificate_earned = '0'
                badge_earned = '0'
            else:
                certificate_earned = str(int(badges_data['Certificate']))
                badge_earned = str(int(badges_data['Badge']))


            graphs = list()

            graphs.append(
                html.Div(children=[
                    html.Div(children=[                        
                        html.Div(                                                        
                            children=[
                                html.Div(
                                    children=[
                                        html.Div(
                                            children=[
                                                html.Div([
                                                    html.I(className='fa fa-line-chart')
                                                ],className='widget-header-icon'),
                                        ],className='widget-header'),
                                        html.Div(
                                            children=[
                                                html.Div(['Module Progress'],className='text'),
                                                html.H1(str(float(badges_data['Progress']))+'%', className='number')
                                        ],className='widget-body'),
                                ],className='widget'),
                        ],className='width25'),

                        #Final Grade

                        # html.Div(                                                        
                        #     children=[
                        #         html.Div(
                        #             children=[
                        #                 html.Div(
                        #                     children=[
                        #                         html.Div([
                        #                             html.I(className='fa fa-graduation-cap')
                        #                         ],className='widget-header-icon'),
                        #                 ],className='widget-header'),
                        #                 html.Div(
                        #                     children=[
                        #                         html.Div(['Final Grade'],className='text'),
                        #                         html.H1(str(float(badges_data['Grade']))+'%', className='number')
                        #                 ],className='widget-body'),
                        #         ],className='widget'),
                        # ],className='width25'),

                        # HOmework Term

                        # html.Div(                                                        
                        #     children=[
                        #         html.Div(
                        #             children=[
                        #                 html.Div(
                        #                     children=[
                        #                         html.Div([
                        #                             html.I(className='fa fa-book')
                        #                         ],className='widget-header-icon'),
                        #                 ],className='widget-header'),
                        #                 html.Div(
                        #                     children=[
                        #                         html.Div(homework_term_header,className='text'),
                        #                         html.H1(homework_term_value, className='number')
                        #                 ],className='widget-body'),
                        #         ],className='widget'),
                        # ],className='width25'),

                        # Mid Term

                        # html.Div(                                                        
                        #     children=[
                        #         html.Div(
                        #             children=[
                        #                 html.Div(
                        #                     children=[
                        #                         html.Div([
                        #                             html.I(className='fa fa-file-text-o')
                        #                         ],className='widget-header-icon'),
                        #                 ],className='widget-header'),
                        #                 html.Div(
                        #                     children=[
                        #                             html.Div(mid_term_header,className='text'),
                        #                             html.H1(mid_term_value, className='number')
                        #                 ],className='widget-body'),
                        #         ],className='widget'),
                        # ],className='width25'),

                        #Entrance Exam

                        html.Div(                                                        
                            children=[
                                html.Div(
                                    children=[
                                        html.Div(
                                            children=[
                                                html.Div([
                                                    html.I(className='fa fa-clipboard')
                                                ],className='widget-header-icon'),
                                        ],className='widget-header'),
                                        html.Div(
                                            children=[                                            
                                                html.Div(entrance_term_header,className='text'),
                                                html.H1(str(entrance_term_value), className='number')                                                
                                        ],className='widget-body'),
                                ],className='widget'),
                        ],className='width25'),

                        #Final Exam

                        html.Div(                                                        
                            children=[
                                html.Div(
                                    children=[
                                        html.Div(
                                            children=[
                                                html.Div([
                                                    html.I(className='fa fa-clipboard')
                                                ],className='widget-header-icon'),
                                        ],className='widget-header'),
                                        html.Div(
                                            children=[                                            
                                                html.Div(final_term_header,className='text'),
                                                html.H1(str(final_term_value), className='number')                                                
                                        ],className='widget-body'),
                                ],className='widget'),
                        ],className='width25'),


                        html.Div(                                                        
                            children=[
                                html.Div(
                                    children=[
                                        html.Div(
                                            children=[
                                                html.Div([
                                                    html.I(className='fa fa-certificate')
                                                ],className='widget-header-icon'),
                                        ],className='widget-header'),
                                        html.Div(
                                            children=[                                            
                                                html.Div(['Badge and Certificate Earned'],className='text'),
                                                html.H3('Certificates: '+ str(certificate_earned), style={'margin': '10px 0 0 0', 'color': '555'}),                                                
                                                html.H3('Badges: '+ str(badge_earned), style={'margin': '10px 0 0 0', 'color': '555'})                                                
                                        ],className='widget-body'),
                                ],className='widget'),
                        ],className='width25'), 


                        html.Div(                                                        
                            children=[
                                html.Div(
                                    children=[
                                        html.Div(
                                            children=[
                                                html.Div([
                                                    html.I(className='fa fa-clock-o')
                                                ],className='widget-header-icon'),
                                        ],className='widget-header'),
                                        html.Div(
                                            children=[
                                                html.Div(['Average Time per Login(minutes)'],className='text'),
                                                html.H1(final_avg_value, className='number')
                                        ],className='widget-body'),
                                ],className='widget'),
                        ],className='width25'),

                    ],className='custom-row')
                ],className='container')
            )
            
          

            #Footer
            graphs.append(                
                html.Footer([
                    html.Div(
                        className='colophon', 
                        children=[
                            html.Nav(className='nav-colophon',children=[
                                html.Ol(children=[
                                    html.Li([
                                        html.A(["About"], href="/about_student")

                                    ],className='nav-colophon-01'),


                                ])

                            ]),

                            html.Br([]),

                            html.Div(children=[
                                html.P(
                                    html.A([
                                        html.Img(
                                            src=image_logo,
                                            alt='organization logo',
                                            width='250'      
                                        )
                                    ],href='/dashboard')
                                )
                            ],className='wrapper-logo'),

                            html.P("Dell Medical School, The University of Texas at Austin. All rights reserved except where noted. EdX, Open edX and their respective logos are trademarks or registered trademarks of edX Inc.", className='copyright'),

                            html.Nav(children=[
                                html.Ul(children=[
                                    html.Li([
                                        html.A(["Privacy Policy"],href="/privacy")
                                    ],className='nav-legal-01'),

                                    html.Li([
                                        html.A(["Terms of Service"],href="/tos")
                                    ],className='nav-legal-02'),

                                    html.Li([
                                        html.A(["Honor Code"],href="/honor")
                                    ],className='nav-legal-03'),


                                    html.Li([
                                        html.A(["Take free online courses at edX.org"],href="#")
                                    ],className='nav-legal-04'),
                                ])
                            ],className='nav-legal'),
                        ]
                    ),

                    html.Div(children=[
                        html.P(
                            html.A([
                                html.Img(
                                    src="https://files.edx.org/openedx-logos/edx-openedx-logo-tag.png",
                                    alt="Powered by Open edX", 
                                    width="140"  
                                )
                            ],href="http://open.edx.org")
                        )
                    ],className='footer-about-openedx')
                ], style={'box-shadow': '0 -1px 5px 0 rgba(0, 0, 0, 0.1)', 'border-top': '1px solid #c5c6c7', 'padding': '5px 20px', 'background': '#fff', 'clear': 'both'})
            )

            return graphs
        return app 
    
    else:
        app.layout = html.Div([
            html.H3('No Data Found')
            ])
        return app                




if __name__ == '__main__':    
    app.run_server(debug=True)