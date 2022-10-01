import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "../../utils/context/authContext";
import { LightTheme } from "../../utils/theme";
import { MdDetailsContextProvider } from "../../utils/context/mdDetails";
import { FarmerGroupDetailsContextProvider } from "../../utils/context/farmersGroup";
import { FarmerDetailsContextProvider } from "../../utils/context/farmersDetails";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Provider: FC<Props> = ({ children }) => {
  return (
    <Router>
      <ThemeProvider theme={LightTheme}>
        <MdDetailsContextProvider>
          <FarmerGroupDetailsContextProvider>
            <FarmerDetailsContextProvider>
              <AuthContextProvider>{children}</AuthContextProvider>
            </FarmerDetailsContextProvider>
          </FarmerGroupDetailsContextProvider>
        </MdDetailsContextProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Provider;
