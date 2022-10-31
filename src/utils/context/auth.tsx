import { createContext, FC, useContext, useState, useReducer } from "react";
import { adminFormInputs } from "../../views/admin-panel";

//Action type
const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
const ADD_UPDATE = "ADD_UPDATE";
const ADD_LOGO = "ADD_LOGO";

export type Notification = {
  id: string;
  image?: string | undefined;
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
  addUpdate: (data: adminFormInputs) => void;
  addLogo: () => void;
  userNotification: Notification[];
  AdminUpdate: { [id: string]: adminFormInputs };
  headerImage: string | null;
  loginImage: string | null;
  certificateImage: string | null;
  pdfImage: string | null;
  titleName: string | null;
  cinNo: string | null;
  regNo: string | null;
  address: string | null;
}

const initialState: IContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  clearNotification: () => {},
  addNotification: () => {},
  addUpdate: () => {},
  addLogo: () => {},
  userNotification: [],
  AdminUpdate: {},
  headerImage: localStorage.getItem("headerLogo"),
  loginImage: localStorage.getItem("loginLogo"),
  certificateImage: localStorage.getItem("certificateLogo"),
  pdfImage: localStorage.getItem("pdfLogo"),
  titleName: localStorage.getItem("title"),
  cinNo: localStorage.getItem("cinNo"),
  regNo: localStorage.getItem("regNo"),
  address: localStorage.getItem("address"),
};

// Reducer function
const reducer = (state: IContextType, action: any) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { ...state, userNotification: [action.payload, ...state.userNotification] };

    case CLEAR_NOTIFICATION:
      return { ...state, userNotification: [] };

    case ADD_UPDATE:
      return { ...state, AdminUpdate: { ...state.AdminUpdate, [action.payload.id]: action.payload } };

    case ADD_LOGO:
      return {
        ...state,
        headerImage: localStorage.getItem("headerLogo"),
        loginImage: localStorage.getItem("loginLogo"),
        certificateImage: localStorage.getItem("certificateLogo"),
        pdfImage: localStorage.getItem("pdfLogo"),
        titleName: localStorage.getItem("title"),
        cinNo: localStorage.getItem("cinNo"),
        regNo: localStorage.getItem("regNo"),
        address: localStorage.getItem("address"),
      };

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

  const addUpdate = (data: adminFormInputs) => {
    dispatch({ type: ADD_UPDATE, payload: data });
  };

  const addLogo = () => {
    dispatch({ type: ADD_LOGO });
  };

  const data = {
    ...state,
    isAuthenticated,
    login,
    logout,
    clearNotification,
    addNotification,
    addUpdate,
    addLogo,
  };

  return <authContext.Provider value={data}>{props.children}</authContext.Provider>;
};

export { AuthContextProvider, useAuthContext };
