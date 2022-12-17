import { Route, Routes } from "react-router-dom"
import Courses, { StateCourses } from "../../pages/courses/courses"

export const CoursesRoutes = () => {
  return (
    <Routes>
      <Route path="learning" element={<Courses state={StateCourses.learning}/>} />
      <Route path="finished" element={<Courses state={StateCourses.finished}/>} />
      <Route path="favorites" element={<Courses state={StateCourses.favorites}/>} />
    </Routes>
  )
}
