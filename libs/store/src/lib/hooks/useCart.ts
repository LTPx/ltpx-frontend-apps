import { useAppStore } from "../store";

export const useCart = () => {
  const {
    addCourseCart,
    removeCourseCart,
    coursesInCart,
    getTotal,
  } = useAppStore();

  return {
    totalCourses: coursesInCart.length,
    addCourseCart,
    removeCourseCart,
    coursesInCart,
    getTotal,
  }
}
