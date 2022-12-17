import { Route, Routes } from "react-router-dom";
import AllCourses from "../pages/all-courses/all-courses";
import Checkout from "../pages/checkout/checkout";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ShoppingCart from "../pages/shopping-cart/shopping-cart";

export const SiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/courses" element={<AllCourses/>} />
      <Route path="/cart" element={<ShoppingCart/>} />
      <Route path="/checkout" element={<Checkout/>} />
    </Routes>
  )
}
