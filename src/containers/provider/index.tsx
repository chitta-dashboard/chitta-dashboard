import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { LightTheme } from "../../utils/theme";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Provider: FC<Props> = ({ children }) => {
  return (
    <Router>
      <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>
    </Router>
  );
};

export default Provider;
