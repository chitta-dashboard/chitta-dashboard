import { createContext, FC, useContext, useState } from "react";
import profile from "../../assets/images/profile.png";

export type Notification = {
  id: string;
  image: string;
  message: string;
};
interface IContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  clearNotification: () => void;
  userNotification: Notification[];
}

const initialState: IContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  clearNotification: () => {},
  userNotification: [
    { id: "1", image: profile, message: `New MD "Arockiaraj" has been registered` },
    { id: "2", image: profile, message: `New MD "Arockiaraj" has been registered` },
    { id: "3", image: profile, message: `New MD "Arockiaraj" has been registered` },
    { id: "4", image: profile, message: `New MD "Arockiaraj" has been registered` },
    { id: "5", image: profile, message: `New MD "Arockiaraj" has been registered` },
  ],
};

const authContext = createContext<IContextType>(initialState);

const useAuthContext = () => useContext(authContext);

const AuthContextProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const localAuth = window.localStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localAuth);
  const [notify, setNotify] = useState(initialState.userNotification);

  const login = () => {
    window.localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    window.localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  const clearNotification = () => {
    setNotify([]);
  };

  const data = {
    isAuthenticated,
    login,
    logout,
    userNotification: notify,
    clearNotification,
  };

  return <authContext.Provider value={data}>{children}</authContext.Provider>;
};

export { AuthContextProvider, useAuthContext };
