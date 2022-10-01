import { createContext, FC, useContext, useState } from "react";

interface IContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const initialState: IContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

const authContext = createContext<IContextType>(initialState);

const useAuthContext = () => useContext(authContext);

const AuthContextProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const localAuth = window.localStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localAuth);

  const login = () => {
    window.localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    window.localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  const data = {
    isAuthenticated,
    login,
    logout,
  };

  return <authContext.Provider value={data}>{children}</authContext.Provider>;
};

export { AuthContextProvider, authContext, useAuthContext };
