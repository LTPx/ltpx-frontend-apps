import { useEffect, useState } from "react";
import { SiteRoutes } from "./site-routes";
import { StudentRoutes } from "./student-router";
import { TeacherRoutes } from "./teacher-router";
import { LoaderPage } from "@ltpx-frontend-apps/shared-ui";
import { useUser } from "@ltpx-frontend-apps/store";

export const AppRouter = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const { currentView, isAuthenticated, getCurrentUser } = useUser();
  const token = localStorage.getItem('auth_token');

  const routers = {
    default: <SiteRoutes/>,
    user: <SiteRoutes/>,
    student: <StudentRoutes/>,
    teacher: <TeacherRoutes/>,
  };
  const router = routers[currentView];

  useEffect(() => {
    if (token && !isAuthenticated && !isLoading) {
      setIsLoading(true);
      getCurrentUser().then(()=> {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      });
    }
    return () => {

    }
  }, [])

  return (
    isLoading ? <LoaderPage/> : router
  )
}
