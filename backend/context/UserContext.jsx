import { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';

const INITIAL_STATE = {
  user:
  {
    _id: "61c9cc1bbd81a3630d43cafe",
    firstName: "alon",
    lastName: "alon",
    email: "alon@alon.com",
    profilePicture: "",
    followers: [],
    following: [],
    isAdmin: true,
  },
  isFetching: false,
  error: false,
}

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE)

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}>
      {children}
    </UserContext.Provider>
  )
};