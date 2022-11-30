import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "../../utils/context/auth";
import { LightTheme } from "../../utils/theme";
import { MdDetailsContextProvider } from "../../utils/context/mdDetails";
import { FoundersContextProvider } from "../../utils/context/founders";
import { FarmersGroupContextProvider } from "../../utils/context/farmersGroup";
import { CeoDetailsContextProvider } from "../../utils/context/ceoDetails";
import { ResolutionContextProvider } from "../../utils/context/resolution";
import { PortfolioContextProvider } from "../../utils/context/portfolio";
import { FarmerDetailsContextProvider } from "../../utils/context/farmersDetails";

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
            <FarmerDetailsContextProvider>
              <MdDetailsContextProvider>
                <FoundersContextProvider>
                  <FarmersGroupContextProvider>
                    <CeoDetailsContextProvider>
                      <ResolutionContextProvider>
                        <PortfolioContextProvider>{children}</PortfolioContextProvider>
                      </ResolutionContextProvider>
                    </CeoDetailsContextProvider>
                  </FarmersGroupContextProvider>
                </FoundersContextProvider>
              </MdDetailsContextProvider>
            </FarmerDetailsContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Provider;
