import { createContext, FC, useContext, useState, useReducer } from "react";
import profile from "../../assets/images/profile.png";

//Action type
const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";

export type Notification = {
  id: string;
  image: string | undefined;
  message: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};
interface IContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  clearNotification: () => void;
  addNotification: (data: Notification) => void;
  userNotification: Notification[];
}

const initialState: IContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  clearNotification: () => {},
  addNotification: () => {},
  userNotification: [
    { id: "100", image: profile, message: `New MD "Arockiaraj" has been registered` },
    { id: "101", image: profile, message: `New MD "Arockiaraj" has been registered` },
    { id: "102", image: profile, message: `New MD "Arockiaraj" has been registered` },
    { id: "103", image: profile, message: `New MD "Arockiaraj" has been registered` },
    { id: "104", image: profile, message: `New MD "Arockiaraj" has been registered` },
  ],
};
// Reducer function
const reducer = (state: IContextType, action: any) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { ...state, userNotification: [action.payload, ...state.userNotification] };
    // return {
    //   ...state,
    //   userNotification: [
    //     ...state.userNotification,
    //     { id: action.payload.id, image: profile, message: `New MD ${action.payload.message} has been registered` },
    //   ],
    // };
    case CLEAR_NOTIFICATION:
      return { ...state, userNotification: [] };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

const authContext = createContext<IContextType>(initialState);
const useAuthContext = () => useContext(authContext);

const AuthContextProvider: FC<Props> = (props) => {
  const localAuth = window.localStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localAuth);
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = () => {
    window.localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    window.localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  const addNotification = (data: Notification) => {
    dispatch({ type: ADD_NOTIFICATION, payload: data });
  };

  const clearNotification = () => {
    dispatch({ type: CLEAR_NOTIFICATION });
  };

  const data = {
    ...state,
    isAuthenticated,
    login,
    logout,
    clearNotification,
    addNotification,
  };

  return <authContext.Provider value={data}>{props.children}</authContext.Provider>;
};

export { AuthContextProvider, useAuthContext };
