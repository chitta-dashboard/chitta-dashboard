import { FC, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import authContext from "../../utils/context/authContext";
import { LightTheme } from "../../utils/theme";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Provider: FC<Props> = ({ children }) => {
  const localAuth = window.localStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localAuth);

  return (
    <Router>
      <ThemeProvider theme={LightTheme}>
        <authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</authContext.Provider>
      </ThemeProvider>
    </Router>
  );
};

export default Provider;
