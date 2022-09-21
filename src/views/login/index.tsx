import { Grid } from "@mui/material";

import LoginBackground from "../../components/login/login-background";
import LoginForm from "../../components/login/login-form";


const Login = () => {
  return (
    <>
      <Grid container>
        <LoginBackground />
        <LoginForm />
      </Grid>
    </>
  );
};

export default Login;
