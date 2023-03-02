import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
  HowCreateAClass,
  GreatExperienceOpenMind,
  GeneratingImpactOpportunities,
  WhatMakesClassGoingOn,
} from '../pages/site/blog';
import BlogLayout from '../pages/site/blog-layout/blog-layout';
import BlogHome from '../pages/site/blog/blog-home/blog-home';
import EthicsManualForTeaching from '../pages/site/blog/ethics-manual-for-teaching/ethics-manual-for-teaching';
import {
  Home,
  Login,
  Register,
  AllCourses,
  CourseDetails,
  RegisterTeacher,
  ForgetPassword,
  Page404,
  AboutUs,
  CoursesByCategory,
  TeacherProfilePage,
  SiteLayout,
} from '../pages/site/index';
import TermsConditions from '../pages/site/terms-conditions/terms-conditions';

export const SiteRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/course/:courseId/details" element={<CourseDetails />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="blog" element={<BlogLayout />}>
            <Route path="/blog" element={<BlogHome />} />
            <Route path="home" element={<BlogHome />} />
            <Route path="what-is-openmind" element={<WhatIsOpenMind />} />
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
            <Route path="how-create-a-class" element={<HowCreateAClass />} />
            <Route
              path="great-experience-openMind"
              element={<GreatExperienceOpenMind />}
            />
            <Route
              path="what-makes-class-going-on"
              element={<WhatMakesClassGoingOn />}
            />
            <Route
              path="generating-impact-opportunities"
              element={<GeneratingImpactOpportunities />}
            />
          </Route>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/teacher-profile" element={<TeacherProfilePage />} />
          <Route
            path="/course/:categoryId/category"
            element={<CoursesByCategory />}
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
