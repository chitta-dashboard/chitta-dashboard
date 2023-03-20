import { Box, TextField, styled, FormLabel, FormControl } from "@mui/material";

namespace S {
  export const PasswordModalBody = styled(Box)(({ theme }) => ({
    maxWidth: "25rem",
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

  export const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontWeight: "700",
    fontSize: "1.2rem",
    lineHeight: "3rem",
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
}
export default S;
