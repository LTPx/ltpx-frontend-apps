import { Course } from "@ltpx-frontend-apps/api";
import { User, UserState } from "../../interfaces/user";

type UserAction =
  | { type: 'setUser', payload: User }
  | { type: 'login', payload: boolean }
  | { type: 'logout', payload: boolean }
  | { type: 'addToCart', payload: Course }
  | { type: 'removeFromCart', payload: Course }

export const userReducer = (state: UserState, action: UserAction): UserState => {

  console.log('action: ', action);

  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case 'logout':
      return {
        ...state,
        isAuthenticated: false
      }
    case 'addToCart':
      return {
        ...state,
        cart: {
          courses: state.cart.courses.concat([action.payload])
        }
      }
    default:
      return state;
  }
}
