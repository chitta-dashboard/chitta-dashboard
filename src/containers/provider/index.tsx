import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { AuthContextProvider } from "../../utils/context/auth";
import { LightTheme } from "../../utils/theme";
import { MdDetailsContextProvider } from "../../utils/context/mdDetails";
import { FoundersContextProvider } from "../../utils/context/founders";
import { FarmersGroupContextProvider } from "../../utils/context/farmersGroup";
import { CeoDetailsContextProvider } from "../../utils/context/ceoDetails";
import store from "../../utils/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const queryClient = new QueryClient();

const Provider: FC<Props> = ({ children }) => {
  return (
    <Router>
      <ThemeProvider theme={LightTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <MdDetailsContextProvider>
              <FoundersContextProvider>
                <FarmersGroupContextProvider>
                  <CeoDetailsContextProvider>
                    <ReduxProvider store={store}>{children}</ReduxProvider>
                  </CeoDetailsContextProvider>
                </FarmersGroupContextProvider>
              </FoundersContextProvider>
            </MdDetailsContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Provider;
