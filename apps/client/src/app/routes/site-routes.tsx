import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layouts';
import {
  WhatIsOpenMind,
  LearningInOpenMind,
  HowOpenMindWorks,
  AchievementPaymentSystem,
  EvaluateStudentsToReceivePayments,
  RulesTeacherProfile,
  SocialMediaPolicy,
  LongTermPotentiation,
  TeacherProfileGuidelines,
  StudentSafetyPrivacy,
  StudentPrivacyGuide,
  RemovalOfTeachers,
} from '../pages/site/blog';
import BlogLayout from '../pages/site/blog-layout/blog-layout';
import BlogHome from '../pages/site/blog/blog-home/blog-home';
import EthicsManualForTeaching from '../pages/site/blog/ethics-manual-for-teaching/ethics-manual-for-teaching';
import {
  Home,
  Login,
  Register,
  AllCourses,
  ShoppingCart,
  Checkout,
  CourseDetails,
  RegisterTeacher,
  ForgetPassword,
  Page404,
  AboutUs,
} from '../pages/site/index';
import TermsConditions from '../pages/site/terms-conditions/terms-conditions';

export const SiteRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/course/:courseId/details" element={<CourseDetails />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="blog" element={<BlogLayout />}>
            <Route path="/blog" element={<Navigate replace to="home" />} />
            <Route path="home" element={<BlogHome />} />
            <Route path="what-is-openMind" element={<WhatIsOpenMind />} />
            <Route
              path="learning-in-openMind"
              element={<LearningInOpenMind />}
            />
            <Route path="how-openMind-works" element={<HowOpenMindWorks />} />
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
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
