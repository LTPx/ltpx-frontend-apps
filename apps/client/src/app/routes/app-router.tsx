import { useUser } from "../store";
import { useEffect, useState } from "react";
import { SiteRoutes } from "./site-routes";
import { StudentRoutes } from "./student-router";
import { TeacherRoutes } from "./teacher-router";
import { LoaderPage } from "@ltpx-frontend-apps/shared-ui";

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
      getCurrentUser().then(()=> {
        setTimeout(() => {
          setIsLoading(false)
        }, 500);
      });
    }
    return () => {

    }
  }, [])

  return (
    isLoading ? <LoaderPage/> : routers[currentView]
  )
}
