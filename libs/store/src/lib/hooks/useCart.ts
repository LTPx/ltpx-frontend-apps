import { useAppStore } from "../store";

export const useCart = () => {
  const {
    coursesInCart,
    getTotal,
    _addCourseCart,
    _removeCourseCart,
    _getCart,
  } = useAppStore();

  return {
    totalCourses: coursesInCart.length,
    coursesInCart,
    getTotal,
    _addCourseCart,
    _removeCourseCart,
    _getCart,
  }
}
