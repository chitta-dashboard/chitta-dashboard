import { useContext } from "react";
import { Grid } from "@mui/material";
import LoginBackground from "../../components/login-background";
import LoginForm from "../../components/login-form";
import authContext from "../../utils/context/auth";
import { Navigate } from "react-router-dom";

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
