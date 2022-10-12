import { Box, Button, Stack, TextField, Typography, styled } from "@mui/material";
import { FormLabel, FormControl } from "@mui/material";

namespace S {
  export const Icon = styled("i")(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontSize: "1.2rem",
    cursor: "text",
  }));

  export const EyeIcon = styled("i")(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontSize: "1.2rem",
    cursor: "pointer",
  }));

  export const LogoImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "contain",
  });

  export const LoginMainContainer = styled(Box)(({ theme }) => ({
    width: "45%",
    height: "100vh",
    backgroundColor: `${theme.palette.primary.main}`,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      minWidth: "31.25rem",
    },
  }));

  export const LoginContainer = styled(Box)(({ theme }) => ({
    width: "65%",
    backgroundColor: theme.palette.bg.main,
    boxShadow: `0px 8px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.5)}`,
    borderRadius: "0.938rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  export const FormContainer = styled(Stack)({
    width: "85%",
    padding: "4rem 0rem",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  });

  export const ImageBox = styled(Box)({
    width: "35%",
  });

  export const LoginForm = styled("form")({
    width: "100%",
  });

  export const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontWeight: "700",
    fontSize: "1.2rem",
    lineHeight: "3rem",
  }));

  export const InputBox = styled(FormControl)(({ theme }) => ({
    width: "100%",
    paddingBottom: "1.3rem",
    "& .MuiFormHelperText-root": {
      color: `${theme.palette.error.main}`,
      textAlign: "left",
      padding: "0.4rem 0rem",
      margin: "0%",
      fontSize: "0.75rem",
      lineHeight: "1.125rem",
    },
    "& .MuiFormControl-root": {
      boxShadow: "none",
    },
  }));

  export const LoginInput = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.bg.main,
    width: "100%",
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
    borderRadius: "0.625rem",
    textAlign: "center",
    "& label.Mui-focused-root": {
      color: theme.palette.text.red,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.border.primaryDark,
        border: "0.125rem solid",
        borderRadius: "0.625rem",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.border.primaryDark,
        border: "0.125rem solid",
        borderRadius: "0.625rem",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.border.primaryDark,
        border: "0.125rem solid",
        borderRadius: "0.625rem",
      },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.text.secondaryDark,
    },
    input: {
      ":-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px white inset",
        WebkitTextFillColor: theme.palette.text.secondaryDark,
      },
    },
  }));

  export const ButtonContainer = styled(Box)({
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  });

  export const ButtonBox = styled(Stack)({
    width: "52%",
    textAlign: "center",
  });

  export const LoginButton = styled(Button)(({ theme }) => ({
    background: `${theme.palette.primary.light}`,
    "&:hover": {
      background: `${theme.palette.primary.main}`,
    },
  }));

  export const LoginText = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    padding: "0%",
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    paddingTop: "0.7rem",
    width: "max-content",
    zIndex: "1",
    "& span": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
  }));

  export const PasswordText = styled(Typography)(({ theme }) => ({
    color: `${theme.palette.primary.light}`,
    textAlign: "right",
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    paddingTop: "0.9rem",
    cursor: "pointer",
  }));
}

export default S;
