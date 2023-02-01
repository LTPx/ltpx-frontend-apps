import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layouts';
import BlogLayout from '../pages/site/blog-layout/blog-layout';
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
  WhatIsOpenMind,
  LearningInOpenMind,
  HowOpenMindWorks,
  AchievementPaymentSystem,
  EvaluateStudentsToReceivePayments,
  RulesTeacherProfile,
  SocialMediaPolicy,
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
          <Route path="/blog" element={<BlogLayout />} />
          <Route path="/what" element={<WhatIsOpenMind />} />
          <Route path="/learn" element={<LearningInOpenMind />} />
          <Route path="/how" element={<HowOpenMindWorks />} />
          <Route path="/a" element={<EvaluateStudentsToReceivePayments />} />
          <Route path="/b" element={<RulesTeacherProfile />} />
          <Route path="/c" element={<SocialMediaPolicy />} />
          <Route path="/payment" element={<AchievementPaymentSystem />} />
          <Route path="/about" element={<AboutUs />} />
          
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
