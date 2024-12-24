import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

// Safely parse the user from localStorage
const getUserFromLocalStorage = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Parse only if not null
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null; // Fallback to null on error
  }
};

// Initialize state with a safely parsed user
const INITIAL_STATE = {
  user: getUserFromLocalStorage(),
  isFatching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(state.user));
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFatching: state.isFatching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
