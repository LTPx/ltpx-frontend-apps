import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import {
  BankAccountEdit,
  ManageCourses,
  PasswordEdit,
  TeacherAccount,
  TeacherAccountBank,
  TeacherAccountLayout,
  TeacherAccountProfile,
  TeacherApply,
  TeacherCourseDetail,
  TeacherCourses,
  TeacherCourseStudents,
  TeacherDashboard,
  TeacherEarnings,
  TeacherEditCourse,
  TeacherLayout,
  TeacherMeetingsAgenda,
  TeacherProfileEdit,
  TeacherUserProfile,
  UserProfileEdit,
} from '../teacher';
import VideoMeetingLive from '../video/video-meeting-live/video-meeting-live';
import { ProtectedRoutesTeacher } from './guards/protected-routes-teacher/protected-routes-teacher';
import { blogRoutes } from './blog-routes';
import { TeacherProfilePage } from '../site';

export const TeacherRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={<Navigate replace to="/teacher/dashboard" />}
        />
        <Route
          path="/login"
          element={<Navigate replace to="/home" />}
        />
        <Route
          path="/register"
          element={<Navigate replace to="/home" />}
        />
        <Route path="/" element={<TeacherLayout />}>
          {blogRoutes}
        </Route>
        <Route
          path="teacher"
          element={
            <ProtectedRoutesTeacher>
              <TeacherLayout />
            </ProtectedRoutesTeacher>
          }
        >
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="apply-teach" element={<TeacherApply />} />
          <Route path="earnings" element={<TeacherEarnings />} />
          <Route path="sessions" element={<TeacherMeetingsAgenda />} />
          <Route
            path="live-meeting/:meetingId/:roomId"
            element={<VideoMeetingLive redirectUrl="/teacher/sessions" />}
          />
          <Route path="courses" element={<ManageCourses />}>
            <Route
              path="/teacher/courses"
              element={<Navigate replace to="all" />}
            />
            <Route path=":courseId" element={<TeacherCourseDetail />} />
            <Route
              path=":courseId/students"
              element={<TeacherCourseStudents />}
            ></Route>
            <Route path="all" element={<TeacherCourses />} />
            <Route path="edit/:courseId" element={<TeacherEditCourse />} />
          </Route>
          <Route path="web-profile/:slug" element={<TeacherProfilePage />} />
          <Route path="account" element={<TeacherAccountLayout />}>
            <Route
              path="/teacher/account"
              element={<TeacherAccountProfile />}
            />
            <Route path="account-form" element={<TeacherAccount />} />
            <Route path="account-profile" element={<TeacherAccountProfile />} />
            <Route path="account-user" element={<TeacherUserProfile />} />
            <Route path="account-bank" element={<TeacherAccountBank />} />
            <Route path="account-bank-edit" element={<BankAccountEdit />} />
            <Route path="profile-edit" element={<TeacherProfileEdit />} />
            <Route path="password-edit" element={<PasswordEdit />} />
            <Route path="user-edit" element={<UserProfileEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
