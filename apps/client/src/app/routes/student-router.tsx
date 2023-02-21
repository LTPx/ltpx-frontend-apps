import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ClassesLayout,
  CoursesLayout,
  DashboardLayout,
  PaymentsLayout,
} from '../layouts/index';
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
  StudentCourse,
  StudentClasses,
  StudentLayout,
} from '../pages/student/index';
import VideoMeetingLive from '../video/video-meeting-live/video-meeting-live';

export const StudentRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="student/dashboard" />} />
        <Route path="student" element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CoursesLayout />}>
            <Route
              path="/student/courses"
              element={<Navigate replace to="learning" />}
            />
            <Route path="learning" element={<StudentCourses />} />
            <Route
              path="finished"
              element={<Courses state={StateCourses.finished} />}
            />
            <Route path=":courseId" element={<StudentCourse />} />
          </Route>
          <Route path="classes" element={<StudentClasses />} />
          <Route path="classes" element={<StudentClasses />} />
          <Route path="live-meeting/:meetingId/:roomId" element={<VideoMeetingLive redirectUrl='/student/classes'/>} />

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
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
