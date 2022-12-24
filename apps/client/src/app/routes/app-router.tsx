import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  AppLayout,
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
} from "../pages/student/index";
import {
  Earnings,
  ManageCourses,
  NewCourse,
  TeacherAccount,
  TeacherCourseDetail,
  TeacherCourses,
  TeacherDashboard
} from "../pages/teacher";
import { SiteRoutes } from "./site-routes";

const linksDashboardStudent = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    icon: {
      icon: 'store',
      size: 20,
    }
  },
  {
    title: 'My Courses',
    url: 'courses/learning',
    icon: {
      icon: 'university',
      size: 20,
    }
  },
  {
    title: 'My Classes',
    url: 'classes/week',
    icon: {
      icon: 'desktop',
      size: 20,
    }
  },
  {
    title: 'Payments',
    url: 'payments/purchases',
    icon: {
      icon: 'wallet',
      size: 20,
    }
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: {
      icon: 'cog',
      size: 20,
    }
  },
  {
    title: 'My Account',
    url: 'account',
    icon: {
      icon: 'user',
      size: 20,
    }
  }
];

export const AppRouter = () => {
  const { t } = useTranslation();
  const linksDashboardTeacher = [
    {
      title: t('dashboard.dashboard'),
      url: 'dashboard',
      icon: {
        icon: 'store',
        size: 20,
      }
    },
    {
      title: t('dashboard.courses'),
      url: 'courses',
      icon: {
        icon: 'university',
        size: 20,
      }
    },
    {
      title: t('dashboard.earnings'),
      url: 'earnings',
      icon: {
        icon: 'wallet',
        size: 20,
      }
    },
    {
      title: t('dashboard.account'),
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
        <Route element={<AppLayout />}>
          <Route path="/*" element={<SiteRoutes/>}/>
        </Route>
        <Route path="student" element={<DashboardLayout links={linksDashboardStudent}/>}>
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
        <Route path="teacher" element={<DashboardLayout  links={linksDashboardTeacher}/>}>
          <Route path="dashboard" element={<TeacherDashboard/>}/>
          <Route path="account" element={<TeacherAccount/>}/>
          <Route path="earnings" element={<Earnings/>}/>
          <Route path="courses" element={<ManageCourses/>}>
            <Route path="/teacher/courses" element={<Navigate replace to="all" />} />
            <Route path=":courseId" element={<TeacherCourseDetail/>}/>
            <Route path="all" element={<TeacherCourses/>}/>
            <Route path="new" element={<NewCourse/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
