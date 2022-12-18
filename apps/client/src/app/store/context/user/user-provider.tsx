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

  return (
    <UserContext.Provider value={{
      userState,
      setUser,
      logoutApp
    }}>
      {children}
    </UserContext.Provider>
  )
}
