import { Route, Routes } from "react-router-dom"
import ClassesLayout from "../../layouts/classes-layout/classes-layout"
import CoursesLayout from "../../layouts/courses-layout/courses-layout"
import PaymentsLayout from "../../layouts/payments-layout/payments-layout"
import Account from "../../pages/account/account"
import Dashboard from "../../pages/dashboard/dashboard"
import Settings from "../../pages/settings/settings"

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="my-courses" element={<CoursesLayout/>}/>
      <Route path="classes" element={<ClassesLayout/>}/>
      <Route path="payments" element={<PaymentsLayout/>}/>
      <Route path="settings" element={<Settings/>}/>
      <Route path="account" element={<Account/>}/>
    </Routes>
  )
}

