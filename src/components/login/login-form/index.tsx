import { FC, useContext, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../../assets/images/logo.png";
import S from "./loginForm.styled";
import authContext from "../../../utils/context/authContext";
interface LoginFormInputs {
  mobileNo: string;
  loginPassword: string;
}

interface UserAuth {
  mobileNo: string;
  loginPassword: string;
}
const userAuth: UserAuth = { mobileNo: "0123456789", loginPassword: "nerkathir" };
const LoginSchema = yup.object().shape({
  mobileNo: yup.string().required("Mobile number is required !"),
  loginPassword: yup.string().required("Password is required !"),
});

const LoginForm: FC = () => {
  const { setIsAuthenticated } = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginSchema),
    criteriaMode: "all",
  });

  const onLoginSubmit = (userData: LoginFormInputs) => {
    if (userData.mobileNo !== userAuth.mobileNo || userData.loginPassword !== userAuth.loginPassword) {
      if (userData.mobileNo !== userAuth.mobileNo) {
        setError("mobileNo", {
          type: "custom",
          message: "Mobile number not registered !",
        });
      }
      if (userData.loginPassword !== userAuth.loginPassword) {
        setError("loginPassword", {
          type: "custom",
          message: "Password mismatch !",
        });
      }
      return;
    }
    window.localStorage.setItem("isAuthenticated", "true");
    reset();
    setIsAuthenticated(true);
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
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <S.InputBox>
              <S.LoginFormLabel>கைபேசி எண்</S.LoginFormLabel>
              <S.LoginInput
                type="number"
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
                      {showPassword === false ? <S.Icon>show</S.Icon> : <S.Icon>hide</S.Icon>}
                    </InputAdornment>
                  ),
                }}
                {...register("loginPassword")}
                helperText={errors.loginPassword && errors.loginPassword.message}
                autoComplete="off"
              />
              <S.PasswordText variant="subtitle1">Forgot password?</S.PasswordText>
            </S.InputBox>
            <br />

            <S.ButtonBox>
              <S.LoginButton size="large" type="submit">
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
