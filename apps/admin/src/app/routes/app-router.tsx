import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/app-layout/app-layout';
import ApplicationDetailsPage from '../pages/application-details-page/application-details-page';
import CourseDetailsPage from '../pages/course-details-page/course-details-page';
import CoursesPages from '../pages/courses-pages/courses-pages';
import DashboardPage from '../pages/dashboard-page/dashboard-page';
import LearningPathPage from '../pages/learning-path-page/learning-path-page';
import Login from '../pages/login/login';
import NewUserPage from '../pages/new-user-page/new-user-page';
import SettingsAppPage from '../pages/settings-app-page/settings-app-page';
import TeachersPage from '../pages/teachers-page/teachers-page';
import UsersPage from '../pages/users-page/users-page';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="admin" element={<AppLayout />}>
        <Route path="users" element={<UsersPage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="courses" element={<CoursesPages />} />
        <Route path="courses/:id" element={<CourseDetailsPage />} />
        <Route path="application/:id" element={<ApplicationDetailsPage />} />
        <Route path="settings" element={<SettingsAppPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="learning-path" element={<LearningPathPage />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="new-user" element={<NewUserPage />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );

};
