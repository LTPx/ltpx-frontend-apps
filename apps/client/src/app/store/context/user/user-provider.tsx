import { ICourse } from "@ltpx-frontend-apps/api";
import { useReducer } from "react"
import { User, UserState } from "../../interfaces/user"
import { UserContext } from "./user-context"
import { userReducer } from "./user-reducer"

const userInSession = sessionStorage.getItem('user') || '{}';
const isAuthenticatedSession = sessionStorage.getItem('isAuthenticated') || 'false';
const userSession = JSON.parse(userInSession);
const userIsAuthenticated = JSON.parse(isAuthenticatedSession);
const user = userIsAuthenticated ? userSession : { email: '', name: ''};

const INITIAL_STATE: UserState = {
  user: user,
  isAuthenticated: userIsAuthenticated,
  cart: {
    courses: []
  }
}

interface props {
  children: JSX.Element | JSX.Element[]
}

export const UserProvider = ({children}: props) => {
  const [ userState, dispatch ] = useReducer(userReducer, INITIAL_STATE);

  const setUser = (user: User) => {
    dispatch({type: 'setUser', payload: user});
  }

  const logoutApp = () => {
    dispatch({type: 'logout', payload: false});
  }

  const addCourseToCart = (course: ICourse) => {
    dispatch({type: 'addToCart', payload: course});
  }

  const removeCourseFromCart = (id: string) => {
    dispatch({type: 'removeFromCart', payload: id});
  }

  return (
    <UserContext.Provider value={{
      userState,
      setUser,
      logoutApp,
      addCourseToCart,
      removeCourseFromCart,
    }}>
      {children}
    </UserContext.Provider>
  )
}
