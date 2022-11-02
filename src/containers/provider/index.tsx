import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { AuthContextProvider } from "../../utils/context/auth";
import { LightTheme } from "../../utils/theme";
import { MdDetailsContextProvider } from "../../utils/context/mdDetails";
import { FoundersContextProvider } from "../../utils/context/founders";
import { FarmersGroupContextProvider } from "../../utils/context/farmersGroup";
import { FarmerDetailsContextProvider } from "../../utils/context/farmersDetails";
import { CeoDetailsContextProvider } from "../../utils/context/ceoDetails";
import store from "../../utils/store";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Provider: FC<Props> = ({ children }) => {
  return (
    <Router>
      <ThemeProvider theme={LightTheme}>
        <ReduxProvider store={store}>
          <AuthContextProvider>
            <MdDetailsContextProvider>
              <FoundersContextProvider>
                <FarmersGroupContextProvider>
                  <FarmerDetailsContextProvider>
                    <CeoDetailsContextProvider>{children}</CeoDetailsContextProvider>
                  </FarmerDetailsContextProvider>
                </FarmersGroupContextProvider>
              </FoundersContextProvider>
            </MdDetailsContextProvider>
          </AuthContextProvider>
        </ReduxProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Provider;
