import { useReducer } from "react"
import { User, UserState } from "../../interfaces/user"
import { UserContext } from "./user-context"
import { userReducer } from "./user-reducer"

const INITIAL_STATE: UserState = {
  user: {
    email: '',
    name: ''
  },
  logged: false,
}

interface props {
  children: JSX.Element | JSX.Element[]
}

export const UserProvider = ({children}: props) => {
  const [ userState, dispatch ] = useReducer(userReducer, INITIAL_STATE);

  const setUser = (user: User) => {
    dispatch({type: 'setUser', payload: user});
  }

  return (
    <UserContext.Provider value={{
      userState,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  )
}
