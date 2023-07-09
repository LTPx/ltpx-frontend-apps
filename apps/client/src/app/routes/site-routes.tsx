import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
  FrequentlyAskedQuestions,
  UpdatePassword,
  StudentProfilePage,
  Wallet
} from '../site/index';
import TermsConditions from '../site/terms-conditions/terms-conditions';
import { blogRoutes } from './blog-routes';
import ScrollToTop from '../components/scroll-to-top/scroll-to-top';

export const SiteRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <ScrollToTop />
              <SiteLayout />{' '}
            </>
          }
        >
          {blogRoutes}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/course/:slug" element={<CourseDetails />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/:slug/certificate/:id" element={<StudentProfilePage />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/faq" element={<FrequentlyAskedQuestions />} />
          <Route path="/teacher/:slug" element={<TeacherProfilePage />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route
            path="/courses/:categoryId"
            element={<CoursesByCategory />}
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
