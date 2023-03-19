import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/app-layout/app-layout';
import ApplicationDetailsPage from '/application-details-page/application-details-page';
import CourseDetailsPage from '/course-details-page/course-details-page';
import CoursesPages from '/courses-pages/courses-pages';
import DashboardPage from '/dashboard-page/dashboard-page';
import LearningPathPage from '/learning-path-page/learning-path-page';
import Login from '/login/login';
import NewUserPage from '/new-user-page/new-user-page';
import SettingsAppPage from '/settings-app-page/settings-app-page';
import TeachersPage from '/teachers-page/teachers-page';
import PaymentsPage from '/payments-page/payments-page';
import PaymentsDetailsPage from '/payments-details-page/payments-details-page';
import UsersPage from '/users-page/users-page';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="admin" element={<AppLayout />}>
        <Route path="users" element={<UsersPage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="courses" element={<CoursesPages />} />
        <Route path="courses/:id" element={<CourseDetailsPage />} />
        <Route path="application/:id" element={<ApplicationDetailsPage />} />
        <Route path="payments-details/:id" element={<PaymentsDetailsPage />} />
        <Route path="settings" element={<SettingsAppPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="learning-path" element={<LearningPathPage />} />
        <Route path="payments" element={<PaymentsPage />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="new-user" element={<NewUserPage />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );

};
