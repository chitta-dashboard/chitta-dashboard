import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginBackground from "../../components/login/login-background";
import LoginForm from "../../components/login/login-form";
import S from "./login.styled";
import authContext from "../../utils/context/authContext";

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
