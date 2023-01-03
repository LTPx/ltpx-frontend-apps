import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  DashboardLayout,
} from "../layouts/index";
import {
  Earnings,
  ManageCourses,
  NewCourse,
  TeacherAccount,
  TeacherApply,
  TeacherCourseDetail,
  TeacherCourses,
  TeacherDashboard
} from "../pages/teacher";
import { ProtectedRoutesTeacher } from "./guards/protected-routes-teacher/protected-routes-teacher";

export const TeacherRoutes = () => {
  const { t } = useTranslation();

  const linksDashboardTeacher = [
    {
      title: t('dashboards.teacher.dashboard'),
      url: 'dashboard',
      icon: {
        icon: 'store',
        size: 20,
      }
    },
    {
      title: t('dashboards.teacher.courses'),
      url: 'courses',
      icon: {
        icon: 'university',
        size: 20,
      }
    },
    {
      title: t('dashboards.teacher.earnings'),
      url: 'earnings',
      icon: {
        icon: 'wallet',
        size: 20,
      }
    },
    {
      title: t('dashboards.teacher.account'),
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
        <Route path="teacher" element={
          <ProtectedRoutesTeacher>
            <DashboardLayout  links={linksDashboardTeacher}/>
          </ProtectedRoutesTeacher>
        }>
          <Route path="dashboard" element={<TeacherDashboard/>}/>
          <Route path="apply-teach" element={<TeacherApply/>}/>
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
