import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ClassesLayout,
  CoursesLayout,
  DashboardLayout,
  PaymentsLayout,
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
  StudentCourses,
} from "../pages/student/index";

export const StudentRoutes = () => {
  const { t } = useTranslation();

  const linksDashboardStudent = [
    {
      title: t('dashboards.student.dashboard'),
      url: 'dashboard',
      icon: {
        icon: 'store',
        size: 20,
      }
    },
    {
      title: t('dashboards.student.courses'),
      url: 'courses',
      icon: {
        icon: 'university',
        size: 20,
      }
    },
    {
      title: t('dashboards.student.classes'),
      url: 'classes',
      icon: {
        icon: 'desktop',
        size: 20,
      }
    },
    {
      title: t('dashboards.student.payments'),
      url: 'payments',
      icon: {
        icon: 'wallet',
        size: 20,
      }
    },
    {
      title: t('dashboards.student.settings'),
      url: 'settings',
      icon: {
        icon: 'cog',
        size: 20,
      }
    },
    {
      title: t('dashboards.student.account'),
      url: 'account',
      icon: {
        icon: 'user',
        size: 20,
      }
    }
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="student" element={<DashboardLayout links={linksDashboardStudent}/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="courses" element={<CoursesLayout/>}>
            <Route path="/student/courses" element={<Navigate replace to="learning" />} />
            <Route path="learning" element={<StudentCourses />} />
            <Route path="finished" element={<Courses state={StateCourses.finished}/>} />
          </Route>
          <Route path="classes" element={<ClassesLayout/>}>
            <Route path="/student/classes" element={<Navigate replace to="week" />} />
            <Route path="week" element={<Classes/>}/>
            <Route path="calendar" element={<ClassesCalendar/>}/>
            <Route path=":classId" element={<LiveClass/>}/>
          </Route>
          <Route path="payments" element={<PaymentsLayout/>}>
            <Route path="/student/payments" element={<Navigate replace to="purchases" />} />
            <Route path="purchases" element={<Purchases/>}/>
            <Route path="invoice" element={<Invoice/>}/>
          </Route>
          <Route path="settings" element={<Settings/>}/>
          <Route path="account" element={<Account/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
