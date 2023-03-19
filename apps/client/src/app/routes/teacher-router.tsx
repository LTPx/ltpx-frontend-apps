import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import {
  AchievementPaymentSystem,
  EvaluateStudentsToReceivePayments,
  HowOpenMindWorks,
  LearningInOpenMind,
  LongTermPotentiation,
  RemovalOfTeachers,
  RulesTeacherProfile,
  SocialMediaPolicy,
  StudentPrivacyGuide,
  StudentSafetyPrivacy,
  TeacherProfileGuidelines,
  WhatIsOpenMind,
} from '../site/blog';
import BlogLayout from '../site/blog-layout/blog-layout';
import BlogHome from '../site/blog/blog-home/blog-home';
import EthicsManualForTeaching from '../site/blog/ethics-manual-for-teaching/ethics-manual-for-teaching';
import {
  ManageCourses,
  TeacherAccount,
  TeacherAccountLayout,
  TeacherAccountProfile,
  TeacherApply,
  TeacherChat,
  TeacherCourseDetail,
  TeacherCourses,
  TeacherCourseStudents,
  TeacherDashboard,
  TeacherEarnings,
  TeacherEditCourse,
  TeacherLayout,
  TeacherMeetingsAgenda,
  TeacherReviewQuiz,
} from '../teacher';
import VideoMeetingLive from '../video/video-meeting-live/video-meeting-live';
import { ProtectedRoutesTeacher } from './guards/protected-routes-teacher/protected-routes-teacher';

export const TeacherRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="teacher/dashboard" />} />
        <Route
          path="teacher"
          element={
            <ProtectedRoutesTeacher>
              <TeacherLayout />
            </ProtectedRoutesTeacher>
          }
        >
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="chat" element={<TeacherChat />} />
          <Route path="apply-teach" element={<TeacherApply />} />
          <Route path="earnings" element={<TeacherEarnings />} />
          <Route path="sessions" element={<TeacherMeetingsAgenda />} />
          <Route
            path="/teacher/quiz-review/:quizId"
            element={<TeacherReviewQuiz />}
          />
          <Route
            path="live-meeting/:meetingId/:roomId"
            element={<VideoMeetingLive redirectUrl="/teacher/sessions" />}
          />
          <Route
            path="/teacher/quiz-review/:quizId"
            element={<TeacherReviewQuiz />}
          />
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
            >
            </Route>
            <Route path="all" element={<TeacherCourses />} />
            <Route path="edit/:courseId" element={<TeacherEditCourse />} />
          </Route>
          <Route path="account" element={<TeacherAccountLayout />}>
            <Route
              path="/teacher/account"
              element={<TeacherAccountProfile />}
            />
            <Route path="account-form" element={<TeacherAccount />} />
            <Route path="account-profile" element={<TeacherAccountProfile />} />
          </Route>
          <Route path="blog" element={<BlogLayout />}>
            <Route path="/teacher/blog" element={<BlogHome />} />
            <Route path="home" element={<BlogHome />} />
            <Route
              path="teacher/blog/what-is-openmind"
              element={<WhatIsOpenMind />}
            />
            <Route
              path="learning-in-openmind"
              element={<LearningInOpenMind />}
            />
            <Route path="how-openmind-works" element={<HowOpenMindWorks />} />
            <Route
              path="achievement-payment-system"
              element={<AchievementPaymentSystem />}
            />
            <Route
              path="long-term-potentiation"
              element={<LongTermPotentiation />}
            />
            <Route
              path="ethics-manual-for-teaching"
              element={<EthicsManualForTeaching />}
            />
            <Route
              path="guidelines-teacher-profile"
              element={<RulesTeacherProfile />}
            />
            <Route path="removal-of-teachers" element={<RemovalOfTeachers />} />
            <Route
              path="teacher-profile-guidelines"
              element={<TeacherProfileGuidelines />}
            />
            <Route
              path="evaluate-to-receive-payments"
              element={<EvaluateStudentsToReceivePayments />}
            />
            <Route
              path="student-safety-privacy"
              element={<StudentSafetyPrivacy />}
            />
            <Route
              path="student-privacy-guide"
              element={<StudentPrivacyGuide />}
            />
            <Route path="social-media-policy" element={<SocialMediaPolicy />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
