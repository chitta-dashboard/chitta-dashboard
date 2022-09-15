import React, { FC } from "react";
import Header from "./header";
import AppRouters from "../../routes/AppRoutes";
import Content from "./content";
import Footer from "./footer";
import { S } from "./Layout.styled";

const Layout: FC = () => {
  return (
    <S.Layout>
        <Header />
        <Content>
          <AppRouters />
        </Content>
        <Footer />
    </S.Layout>
  );
};

export default Layout;
