
import React, { useState, useEffect } from "react";
import {
  useRoutes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import DashboardLayout from "../layouts/dashboard-layout/dashboard-layout";
import Account from "../pages/account/account";
import Courses from "../pages/courses/courses";
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
      element: <Home />,
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
          path: 'courses',
          element: <Courses/>
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
    {
      path: 'courses',
      element: <Courses />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'Register',
      element: <Register />,
    }
  ];

  let element = useRoutes(routesAccess);

  return element;
}

export default ApplicationRoutes;
