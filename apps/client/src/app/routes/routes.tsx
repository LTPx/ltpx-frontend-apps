
import React, { useState, useEffect } from "react";
import {
  useRoutes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AppLayout from "../layouts/app-layout/app-layout";
import ClassesLayout from "../layouts/classes-layout/classes-layout";
import CoursesLayout from "../layouts/courses-layout/courses-layout";
import DashboardLayout from "../layouts/dashboard-layout/dashboard-layout";
import PaymentsLayout from "../layouts/payments-layout/payments-layout";
import Account from "../pages/account/account";
import AllCourses from "../pages/all-courses/all-courses";
import Checkout from "../pages/checkout/checkout";
import ClassesCalendar from "../pages/classes-calendar/classes-calendar";
import Classes from "../pages/classes/classes";
import CourseDetails from "../pages/course-details/course-details";
import Courses, { StateCourses } from "../pages/courses/courses";
import Dashboard from "../pages/dashboard/dashboard";
import Home from "../pages/home/home";
import Invoice from "../pages/invoice/invoice";
import Login from "../pages/login/login";
import Purchases from "../pages/purchases/purchases";
import Register from "../pages/register/register";
import Settings from "../pages/settings/settings";
import ShoppingCart from "../pages/shopping-cart/shopping-cart";

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
          element: <AllCourses/>,
        },
        {
          path: 'course/:courseId/details',
          element: <CourseDetails id={""} />,
        },
        {
          path: 'cart',
          element: <ShoppingCart/>,

        },
        {
          path: 'checkout',
          element: <Checkout/>,
        }
      ]
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
          path: 'classes',
          element: <ClassesLayout/>,
          children: [
            {
              path: 'today',
              element: <Classes />,
            },
            {
              path: 'calendar',
              element: <ClassesCalendar />,
            },
            {
              path: 'live',
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
          element: <PaymentsLayout/>,
          children: [
            {
              path: 'purchases',
              element: <Purchases />,
            },
            {
              path: 'invoice',
              element: <Invoice />,
            },
          ]
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
