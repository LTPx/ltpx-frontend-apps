import { User, UserState } from "../../interfaces/user";

type UserAction =
  | { type: 'setUser', payload: User }
  | { type: 'login', payload: boolean }
  | { type: 'logout', payload: boolean }

export const userReducer = (state: UserState, action: UserAction): UserState => {

  console.log('action: ', action);

  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    default:
      return state;
  }
}
