import {Grid } from "@mui/material";

import LoginBackground from "../../components/login-background";
import LoginForm from "../../components/login-form";
// import { Typography } from '@mui/material';

const Login = () => {
  return (
    <>
      <Grid container>
        <LoginBackground/>
        <LoginForm />
      </Grid>
    </>
  );
};

export default Login;
