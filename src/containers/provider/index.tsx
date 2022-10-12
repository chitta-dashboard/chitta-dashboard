import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "../../utils/context/auth";
import { LightTheme } from "../../utils/theme";
import { MdDetailsContextProvider } from "../../utils/context/mdDetails";
import { FoundersContextProvider } from "../../utils/context/founders";
import { FarmersGroupContextProvider } from "../../utils/context/farmersGroup";
import { FarmerDetailsContextProvider } from "../../utils/context/farmersDetails";
import { CeoDetailsContextProvider } from "../../utils/context/ceoDetails";
import { ResolutionsProvider } from "../../utils/context/resolutions";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Provider: FC<Props> = ({ children }) => {
  return (
    <Router>
      <ThemeProvider theme={LightTheme}>
        <AuthContextProvider>
          <MdDetailsContextProvider>
            <FoundersContextProvider>
              <FarmersGroupContextProvider>
                <FarmerDetailsContextProvider>
                  <CeoDetailsContextProvider>
                    <ResolutionsProvider>{children}</ResolutionsProvider>
                  </CeoDetailsContextProvider>
                </FarmerDetailsContextProvider>
              </FarmersGroupContextProvider>
            </FoundersContextProvider>
          </MdDetailsContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Provider;
