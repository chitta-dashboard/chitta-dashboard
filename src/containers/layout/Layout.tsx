import { FC } from "react";
import { GlobalStyles } from "@mui/material";
import "react-toastify/dist/ReactToastify.min.css";
import { Navigate } from "react-router-dom";
import Header from "./header";
import AppRouters from "../../routes/AppRoutes";
import Content from "./content";
import Footer from "./footer";
import { useAuthContext } from "../../utils/context/auth";
import APIloader from "../../components/api-loader";
import S from "./Layout.styled";

const Layout: FC = () => {
  const { openLoader, loaderText, isAuthenticated } = useAuthContext();

  return (
    <S.Layout>
      <GlobalStyles
        styles={(theme) => ({
          "*": {
            "&::-webkit-scrollbar": {
              width: "5px", // for vertical scroll
              height: "5px", // for horizontal scroll
              backgroundColor: "transparent",
              borderRadius: "10px",
            },

            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
              backgroundColor: theme.palette.primary.light,
              height: "20px",
            },

            "&::-webkit-scrollbar-track-piece:start": {
              backgroundColor: "transparent",
              marginTop: "20px",
            },

            "&::-webkit-scrollbar-track-piece:end": {
              backgroundColor: "transparent",
              marginBottom: "20px",
            },
          },
        })}
      />
      {openLoader ? <APIloader loaderText={loaderText} /> : <></>}
      {isAuthenticated ? (
        <>
          <Header />
          <Content>
            <AppRouters />
          </Content>
          <Footer />
        </>
      ) : (
        <Navigate to="./login" />
      )}
    </S.Layout>
  );
};

export default Layout;
