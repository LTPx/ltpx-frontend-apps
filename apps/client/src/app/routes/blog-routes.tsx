import { Route } from 'react-router-dom';
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
} from '../blog';
import BlogHome from '../blog/blog-home/blog-home';
import BlogLayout from '../blog/blog-layout/blog-layout';
import EthicsManualForTeaching from '../blog/ethics-manual-for-teaching/ethics-manual-for-teaching';

export const blogRoutes = (
  <Route path="blog" element={<BlogLayout />}>
    <Route path="/blog" element={<BlogHome />} />
    <Route path="home" element={<BlogHome />} />
    <Route path="what-is-openmind" element={<WhatIsOpenMind />} />
    <Route path="learning-in-openmind" element={<LearningInOpenMind />} />
    <Route path="how-openmind-works" element={<HowOpenMindWorks />} />
    <Route
      path="achievement-payment-system"
      element={<AchievementPaymentSystem />}
    />
    <Route path="long-term-potentiation" element={<LongTermPotentiation />} />
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
    <Route path="student-safety-privacy" element={<StudentSafetyPrivacy />} />
    <Route path="student-privacy-guide" element={<StudentPrivacyGuide />} />
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
);
