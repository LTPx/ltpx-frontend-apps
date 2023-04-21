import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import {
  PaymentsLayout,
} from '../layouts/index';
import { AllCourses, CourseDetails, CoursesByCategory, Home } from '../site';
import {
  Account,
  Dashboard,
  Invoice,
  Purchases,
  StudentCourses,
  StudentCourse,
  StudentClasses,
  StudentLayout,
  StudentAccountLayout,
  StudentAccountProfile,
  StudentQuiz,
  StudentReviewQuiz,
  StudentPasswordEdit,
} from '../student/index';
import VideoMeetingLive from '../video/video-meeting-live/video-meeting-live';
import { blogRoutes } from './blog-routes';

export const StudentRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="student/dashboard" />} />
        <Route path="/" element={<StudentLayout />}>
          { blogRoutes }
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/course/:slug" element={<CourseDetails />} />
          <Route
            path="/course/:categoryId/category"
            element={<CoursesByCategory />}
          />
        </Route>
        <Route path="student" element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="course/:slug" element={<StudentCourse />} />
          <Route path="classes" element={<StudentClasses />} />
          <Route path="course/:courseId/quiz/:quizId" element={<StudentQuiz/>} />
          <Route
            path="live-meeting/:meetingId/:roomId"
            element={<VideoMeetingLive redirectUrl="/student/classes" />}
          />
          <Route path="payments" element={<PaymentsLayout />}>
            <Route
              path="/student/payments"
              element={<Navigate replace to="purchases" />}
            />
            <Route path="purchases" element={<Purchases />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
          <Route path="account" element={<StudentAccountLayout />}>
            <Route path="/student/account" element={<StudentAccountProfile />} />
            <Route path="account-edit" element={<Account />} />
            <Route path="password-edit" element={<StudentPasswordEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
