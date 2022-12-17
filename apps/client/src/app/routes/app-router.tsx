import { Routes, Route } from "react-router-dom";
import {
  AppLayout,
  ClassesLayout,
  CoursesLayout,
  DashboardLayout,
  PaymentsLayout
} from "../layouts/index";
import Account from "../pages/account/account";
import ClassesCalendar from "../pages/classes-calendar/classes-calendar";
import Classes from "../pages/classes/classes";
import Courses, { StateCourses } from "../pages/courses/courses";
import Dashboard from "../pages/dashboard/dashboard";
import LiveClass from "../pages/live-class/live-class";
import Settings from "../pages/settings/settings";
import { SiteRoutes } from "./site-routes";
import { CoursesRoutes } from "./student/courses-routes";
import { DashboardRoutes } from "./student/dashboard-routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/*" element={<SiteRoutes/>}/>
      </Route>
      <Route path="student" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="courses" element={<CoursesLayout/>}>
          <Route path="learning" element={<Courses state={StateCourses.learning}/>} />
          <Route path="finished" element={<Courses state={StateCourses.finished}/>} />
          <Route path="favorites" element={<Courses state={StateCourses.favorites}/>} />
        </Route>
        <Route path="classes" element={<ClassesLayout/>}>
          <Route path="week" element={<Classes/>}/>
          <Route path="calendar" element={<ClassesCalendar/>}/>
          <Route path=":classId" element={<LiveClass/>}/>
        </Route>
        <Route path="payments" element={<PaymentsLayout/>}>

        </Route>
        <Route path="settings" element={<Settings/>}/>
        <Route path="account" element={<Account/>}/>
      </Route>
    </Routes>
  )
}


// {
//   path: 'week',
//   element: <Classes />,
// },
// {
//   path: 'calendar',
//   element: <ClassesCalendar />,
// },
// {
//   path: ':classId',
//   element: <LiveClass />,
// }
