import React, { FC, useState } from "react";
import { FormHelperText } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import logo from "../../assets/images/logo.png";
import S from "./loginForm.styled";

interface LoginFormInputs {
  mobileNo: string;
  loginPassword: string;
}

interface UserAuth {
  mobileNo: string;
  password: string;
}
const userAuth: UserAuth[] = [{ mobileNo: "0123456789", password: "nerkathir" }];
const LoginSchema = yup.object().shape({
  mobileNo: yup
    .string()
    .required("Mobile number is required")
    .test("mobileNo Auth", "Mobile number Missmatch", (val) => val === userAuth[0].mobileNo),
  loginPassword: yup
    .string()
    .required("Password is required")
    .test("password Auth", "Password Missmatch", (val) => val === userAuth[0].password),
});

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (userData: LoginFormInputs) => {
    console.log(userData);
    navigate("/dashboard");
    reset();
  };

  const handleClickShowHidePassword = () => setShowPassword(!showPassword);

  return (
    <S.LoginMainContainer>
      <S.LoginContainer>
        <S.FormContainer>
          <S.ImageBox>
            <S.LogoImage src={logo} alt="Nerkathir" />
          </S.ImageBox>
          <br />
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <S.InputBox>
              <S.LoginFormLabel>கைபேசி எண்</S.LoginFormLabel>
              <S.LoginInput
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <S.Icon>phone</S.Icon>
                    </InputAdornment>
                  ),
                }}
                {...register("mobileNo")}
                helperText={errors.mobileNo && errors.mobileNo.message}
              />
            </S.InputBox>
            <br />
            <S.InputBox>
              <S.LoginFormLabel>கடவுச்சொல்</S.LoginFormLabel>
              <S.LoginInput
                type={showPassword === false ? "password" : "text"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <S.Icon>lock</S.Icon>
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment sx={{ cursor: "pointer" }} onClick={handleClickShowHidePassword} position="end">
                      {showPassword === false ? <S.Icon>show</S.Icon> : <VisibilityOffIcon />}
                    </InputAdornment>
                  ),
                }}
                {...register("loginPassword")}
                helperText={errors.loginPassword && errors.loginPassword.message}
              />
              <S.PasswordText variant="subtitle1">Forgot password?</S.PasswordText>
            </S.InputBox>
            <br />

            <S.ButtonBox>
              <S.LoginButton size="large" type="submit" variant="contained">
                Login
              </S.LoginButton>
            </S.ButtonBox>
            <S.LoginText variant="subtitle1">
              Don't have an account? <span>Signup</span>
            </S.LoginText>
          </form>
        </S.FormContainer>
      </S.LoginContainer>
    </S.LoginMainContainer>
  );
};

export default LoginForm;
