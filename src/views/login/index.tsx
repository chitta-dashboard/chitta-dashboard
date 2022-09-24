import { useContext } from "react";
import { Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import LoginBackground from "../../components/login/login-background";
import LoginForm from "../../components/login/login-form";
import authContext from "../../utils/context/authContext";

const Login = () => {
  const { isAuthenticated } = useContext(authContext);

  return (
    <>
      {!isAuthenticated ? (
        <Grid container>
          <LoginBackground />
          <LoginForm />
        </Grid>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </>
  );
};

export default Login;
