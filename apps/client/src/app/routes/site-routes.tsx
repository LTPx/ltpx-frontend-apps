import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts";
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
  Page404
} from "../pages/site/index";
import TermsConditions from "../pages/site/terms-conditions/terms-conditions";

export const SiteRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/register-teacher" element={<RegisterTeacher/>} />
            <Route path="/courses" element={<AllCourses/>} />
            <Route path="/course/:courseId/details" element={<CourseDetails/>} />
            <Route path="/cart" element={<ShoppingCart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/terms-and-conditions" element={<TermsConditions/>} />
            <Route path="/forget-password" element={<ForgetPassword/>} />
            <Route path='*' element={<Page404 />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}
