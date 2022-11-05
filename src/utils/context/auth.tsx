import { createContext, FC, useContext, useState, useReducer } from "react";
import { adminFormInputs } from "../../views/admin-panel";
import { useAdd, useFetch, useDelete } from "../hooks/query";
import { ENDPOINTS } from "../constants";

//Action type
const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
const ADD_UPDATE = "ADD_UPDATE";
const ADD_LOGO = "ADD_LOGO";
const LOADER = "LOADER";

export type Notification = {
  id: string;
  image?: string | undefined;
  message: string;
};
export type loader = {
  openLoader: boolean;
  loaderText?: string;
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
  addLogo: () => void;
  loader: (data: loader) => void;
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
  openLoader: boolean;
  loaderText: string;
}

const initialState: IContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  clearNotification: () => {},
  addNotification: () => {},
  addLogo: () => {},
  loader: () => {},
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
  openLoader: false,
  loaderText: "",
};

// Reducer function
const reducer = (state: IContextType, action: any) => {
  switch (action.type) {
    // case ADD_NOTIFICATION:
    // return mutate({ data: action.payload });
    // return { ...state, userNotification: [action.payload, ...state.userNotification] };

    // case CLEAR_NOTIFICATION:
    //   return { ...state, userNotification: [] };

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
    case LOADER:
      return {
        ...state,
        openLoader: action.payload.openLoader,
        loaderText: action.payload.loaderText,
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
  const { mutate: addNotify } = useAdd(ENDPOINTS.notification);
  const {
    result: { data: NotificationData },
    formatChangeSuccess: isSuccess,
  } = useFetch(ENDPOINTS.notification);
  const { mutate: deleteNotification } = useDelete(ENDPOINTS.notification);

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
    return addNotify({ data: data });

    // dispatch({ type: ADD_NOTIFICATION, payload: data });
  };

  const clearNotification = () => {
    // dispatch({ type: CLEAR_NOTIFICATION });

    if (isSuccess) {
      deleteNotification({ id: Object.keys(NotificationData) });
    }
  };

  const addLogo = () => {
    dispatch({ type: ADD_LOGO });
  };

  const loader = (data: loader) => {
    dispatch({ type: LOADER, payload: data });
  };

  const data = {
    ...state,
    isAuthenticated,
    login,
    logout,
    clearNotification,
    addNotification,
    // addUpdate,
    addLogo,
    loader,
  };

  return <authContext.Provider value={data}>{props.children}</authContext.Provider>;
};

export { AuthContextProvider, useAuthContext };
