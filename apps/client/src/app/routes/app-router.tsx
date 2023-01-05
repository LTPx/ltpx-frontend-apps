import { useUser } from "../store";
import { useEffect, useState } from "react";
import { SiteRoutes } from "./site-routes";
import { StudentRoutes } from "./student-router";
import { TeacherRoutes } from "./teacher-router";

export const AppRouter = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const { currentView } = useUser();
  const { isAuthenticated, getCurrentUser } = useUser();
  const token = sessionStorage.getItem('auth_token');

  const routers = {
    default: <SiteRoutes/>,
    user: <SiteRoutes/>,
    student: <StudentRoutes/>,
    teacher: <TeacherRoutes/>,
  };

  useEffect(() => {
    if (token && !isAuthenticated && (isLoading === false)) {
      setIsLoading(true);
      getCurrentUser().then(()=> setIsLoading(false));
    }
    return () => {

    }
  }, [])

  return (
    isLoading ? <h1>loading...</h1> : routers[currentView]
  )
}
