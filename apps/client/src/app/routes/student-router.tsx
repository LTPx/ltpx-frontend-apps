import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import {
  ClassesLayout,
  CoursesLayout,
  DashboardLayout,
  PaymentsLayout,
} from '../layouts/index';
import { AllCourses, CourseDetails, Home } from '../pages/site';
import {
  Account,
  ClassesCalendar,
  Dashboard,
  Invoice,
  LiveClass,
  Purchases,
  Settings,
  StudentCourses,
  StudentCourse,
  StudentClasses,
  StudentLayout,
  StudentAccountLayout,
  StudentAccountProfile,
  StudentQuiz,
  StudentReviewQuiz,
} from '../pages/student/index';
import VideoMeetingLive from '../video/video-meeting-live/video-meeting-live';

export const StudentRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/course/:courseId/details" element={<CourseDetails />} />
        </Route>
        <Route path="student" element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="courses/:courseId" element={<StudentCourse />} />
          <Route path="classes" element={<StudentClasses />} />
          <Route path="course/:courseId/quiz/:quizId" element={<StudentQuiz/>} />
          <Route path="course/:courseId/quiz-review/:quizId" element={<StudentReviewQuiz/>} />
          <Route
            path="live-meeting/:meetingId/:roomId"
            element={<VideoMeetingLive redirectUrl="/student/classes" />}
          />
          {/* <Route path="classes" element={<ClassesLayout/>}>
            <Route path="/student/classes" element={<Navigate replace to="week" />} />
            <Route path="week" element={<Classes/>}/>
            <Route path="calendar" element={<ClassesCalendar/>}/>
            <Route path=":classId" element={<LiveClass/>}/>
          </Route> */}
          <Route path="payments" element={<PaymentsLayout />}>
            <Route
              path="/student/payments"
              element={<Navigate replace to="purchases" />}
            />
            <Route path="purchases" element={<Purchases />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          {/* <Route path="account" element={<Account />} /> */}
          <Route path="account" element={<StudentAccountLayout />}>
            <Route path="/student/account" element={<StudentAccountProfile />} />
            <Route path="account-form" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
