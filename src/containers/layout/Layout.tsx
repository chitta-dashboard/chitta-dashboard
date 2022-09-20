import { FC } from "react";
import { GlobalStyles } from "@mui/material";

import Header from "./header";
import AppRouters from "../../routes/AppRoutes";
import Content from "./content";
import Footer from "./footer";

import S from "./Layout.styled";

const Layout: FC = () => {
  return (
    <S.Layout>
      <GlobalStyles
        styles={(theme) => ({
          "div, span, table, tbody, thead, ul, ol": {
            "&::-webkit-scrollbar": {
              width: "5px",
              backgroundColor: "#F5F5F5",
              borderRadius: "10px",
            },

            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
              backgroundColor: theme.palette.primary.light,
              height: "20px",
            },
          },
        })}
      />
      <Header />
      <Content>
        <AppRouters />
      </Content>
      <Footer />
    </S.Layout>
  );
};

export default Layout;
