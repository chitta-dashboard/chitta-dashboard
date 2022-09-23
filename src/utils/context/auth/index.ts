import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

interface ContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const initialState: ContextType = {
  isAuthenticated: false,
  setIsAuthenticated: (() => {}) as Dispatch<SetStateAction<boolean>>,
};

const authContext = createContext(initialState);

export default authContext;
