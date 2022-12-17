import { Routes, Route } from "react-router-dom";
import {
  AppLayout,
  ClassesLayout,
  CoursesLayout,
  DashboardLayout,
  PaymentsLayout
} from "../layouts/index";
import {
  Account,
  ClassesCalendar,
  Classes,
  Courses,
  StateCourses,
  Dashboard,
  Invoice,
  LiveClass,
  Purchases,
  Settings,
} from "../pages/student/index";
import { SiteRoutes } from "./site-routes";

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
          <Route path="purchases" element={<Purchases/>}/>
          <Route path="invoice" element={<Invoice/>}/>
        </Route>
        <Route path="settings" element={<Settings/>}/>
        <Route path="account" element={<Account/>}/>
      </Route>
    </Routes>
  )
}
