
import React, { useState, useEffect } from "react";
import {
  useRoutes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AppLayout from "../layouts/app-layout/app-layout";
import CoursesLayout from "../layouts/courses-layout/courses-layout";
import DashboardLayout from "../layouts/dashboard-layout/dashboard-layout";
import Account from "../pages/account/account";
import CourseDetails from "../pages/course-details/course-details";
import Courses, { StateCourses } from "../pages/courses/courses";
import Dashboard from "../pages/dashboard/dashboard";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Payments from "../pages/payments/payments";
import Register from "../pages/register/register";
import Settings from "../pages/settings/settings";

function ApplicationRoutes() {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const [ loading, setLoading ] = useState(true);
  // const isUserAuthorized = useSelector(userAuthorized);

  // useEffect(() => {
  //   setLoading(false);
  //   if (isUserAuthorized){
  //     if( location.pathname === '/' || location.pathname === '/login') {
  //       navigate('/dashboard');
  //     }
  //   }else{
  //     navigate('/login');
  //   }
  // }, [isUserAuthorized])

  const routesAccess = [
    {
      path: '/',
      element: <AppLayout/>,
      children: [
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'Register',
          element: <Register />,
        },
        {
          path: 'courses',
          element: <Courses state={StateCourses.favorites}/>,
        },
        {
          path: 'course/:courseId/details',
          element: <CourseDetails id={""} />,
        },
      ]
    },
    {
      path: 'home',
      element: <Home />,
    },
    {
      path: 'user',
      element: <DashboardLayout/>,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard/>
        },
        {
          path: 'my-courses',
          element: <CoursesLayout/>,
          children: [
            {
              path: 'learning',
              element: <Courses state={StateCourses.learning}/>,
            },
            {
              path: 'finished',
              element: <Courses state={StateCourses.finished}/>,
            },
            {
              path: 'favorites',
              element: <Courses state={StateCourses.favorites}/>,
            }
          ]
        },
        {
          path: 'payments',
          element: <Payments/>
        },
        {
          path: 'settings',
          element: <Settings/>
        },
        {
          path: 'account',
          element: <Account/>
        }
      ]
    },
  ];

  let element = useRoutes(routesAccess);

  return element;
}

export default ApplicationRoutes;
