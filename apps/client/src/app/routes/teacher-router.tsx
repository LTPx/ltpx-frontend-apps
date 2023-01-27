import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import {
  ManageCourses,
  TeacherAccount,
  TeacherApply,
  TeacherCourseDetail,
  TeacherCourses,
  TeacherDashboard,
  TeacherEarnings,
  TeacherEditCourse,
  TeacherLayout
} from "../pages/teacher";
import { ProtectedRoutesTeacher } from "./guards/protected-routes-teacher/protected-routes-teacher";

export const TeacherRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="teacher/dashboard" />} />
        <Route path="teacher" element={
          <ProtectedRoutesTeacher>
            <TeacherLayout/>
          </ProtectedRoutesTeacher>
        }>
          <Route path="dashboard" element={<TeacherDashboard/>}/>
          <Route path="apply-teach" element={<TeacherApply/>}/>
          <Route path="account" element={<TeacherAccount/>}/>
          <Route path="earnings" element={<TeacherEarnings/>}/>
          <Route path="courses" element={<ManageCourses/>}>
            <Route path="/teacher/courses" element={<Navigate replace to="all" />} />
            <Route path=":courseId" element={<TeacherCourseDetail/>}/>
            <Route path="all" element={<TeacherCourses/>}/>
            <Route path="edit/:courseId" element={<TeacherEditCourse/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
