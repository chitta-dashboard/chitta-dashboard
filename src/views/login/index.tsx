import { Navigate } from "react-router-dom";
import LoginBackground from "../../components/login/login-background";
import LoginForm from "../../components/login/login-form";
import { useAuthContext } from "../../utils/context/auth";
import S from "./login.styled";

const Login = () => {
  const { isAuthenticated } = useAuthContext();

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
