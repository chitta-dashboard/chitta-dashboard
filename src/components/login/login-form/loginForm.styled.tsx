import { Box, Button, Stack, TextField, Typography, styled } from "@mui/material";
import { FormLabel, FormControl } from "@mui/material";

namespace S {
  export const Icon = styled("i")(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontSize: "1.2rem",
  }));
  export const LogoImage = styled("img")(({ theme }) => ({
    width: "100%",
    height: "100%",
    objectFit: "contain",
  }));
  export const LoginMainContainer = styled(Box)(({ theme }) => ({
    width: "45%",
    height: "100vh",
    backgroundColor: `${theme.palette.primary.main}`,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      minWidth: "31.25rem",
    },
  }));

  export const LoginContainer = styled(Box)(({ theme }) => ({
    width: "65%",
    margin: "5% auto",
    backgroundColor: "#FFFFFF;",
    boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "15px",
  }));
  export const FormContainer = styled(Box)(({ theme }) => ({
    width: "85%",
    height: "100%",
    margin: "5% auto",
  }));
  export const ImageBox = styled(Box)(({ theme }) => ({
    width: "35%",
    margin: "0% auto",
  }));
  export const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontWeight: "700",
    fontSize: "1.2rem",
    lineHeight: "3rem",
  }));

  export const InputBox = styled(FormControl)(({ theme }) => ({
    width: "100%",
    marginBottom: "1.3rem",
    "& .MuiFormHelperText-root": {
      color: `${theme.palette.error.main}`,
      textAlign: "left",
      padding: "0%",
      margin: "0.4rem 0%",
      fontSize: "0.75rem",
      lineHeight: "1.125rem",
      cursor: "pointer",
    },
    "& .MuiFormControl-root": {
      boxShadow: "none",
    },
  }));

  export const LoginInput = styled(TextField)(({ theme }) => ({
    backgroundColor: "#FFFFFF",
    width: "100%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "0.625rem",
    textAlign: "center",
    whiteSpace: "nowrap",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "2px solid",
      borderRadius: "0.625rem",
    },
  }));
  export const ButtonBox = styled(Stack)(({ theme }) => ({
    width: "52%",
    margin: "5% auto 1% auto",
  }));
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
    marginTop: "0.9rem",
    marginBottom: "3rem",
    "& span ": {
      color: `${theme.palette.primary.light}`,
      cursor: "pointer",
    },
    // input:-internal-autofill-selected
  }));

  export const PasswordText = styled(Typography)(({ theme }) => ({
    color: `${theme.palette.primary.light}`,
    textAlign: "right",
    padding: "0%",
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    marginTop: "0.9rem",
    marginBottom: "3rem",
  }));
}

export default S;
