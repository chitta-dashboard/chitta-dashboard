import React, { FC } from "react";
import Header from "./header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouters from "../../routes/AppRoutes";
import Content from "./content";
import Footer from "./footer";
import { Box } from "@mui/material";

const Layout: FC = () => {
  return (
    <Box>
      <Router>
        <Header />
        <Content>
          <AppRouters />
        </Content>
        <Footer />
      </Router>
    </Box>
  );
};

export default Layout;
