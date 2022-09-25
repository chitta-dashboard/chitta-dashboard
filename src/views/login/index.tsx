import { useContext } from "react";
import { Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import LoginBackground from "../../components/login/login-background";
import LoginForm from "../../components/login/login-form";
import authContext from "../../utils/context/auth";
import S from "./login.styled";
const Login = () => {
  const { isAuthenticated } = useContext(authContext);

  return (
    <>
      {!isAuthenticated ? (
        <S.ContainerGrid container>
          <LoginBackground />
          <LoginForm />
        </S.ContainerGrid>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </>
  );
};

export default Login;
