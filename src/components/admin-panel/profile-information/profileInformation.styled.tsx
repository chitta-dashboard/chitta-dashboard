import { Stack, styled, Typography, TextField } from "@mui/material";

namespace S {
  export const ProfileStack = styled(Stack)(({ theme }) => ({
    gap: "1rem",
    width: "100%",
  }));
  export const ProfileText = styled(Typography)(({ theme }) => ({
    color: "rgba(119, 119, 119, 1)",
    fontSize: "1.125rem",
    lineHeight: "1.688rem",
    paddingBottom: "0.5rem",
  }));
  export const profileInput = styled(TextField)(({ theme }) => ({
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: "0.625rem",
    textAlign: "center",
    "& .MuiFormControl-root": {
      boxShadow: "none",
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.primary.light,
    },
    "& .MuiFormHelperText-root": {
      color: "#FF0000",
      textAlign: "left",
      padding: "0.4rem 0rem",
      margin: "0%",
      fontSize: "0.75rem",
      lineHeight: "1.125rem",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,
        border: "0.125rem solid",
        borderRadius: "0.625rem",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
        border: "0.125rem solid",
        borderRadius: "0.625rem",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        border: "0.125rem solid",
        borderRadius: "0.625rem",
      },
    },

    "& .MuiInputBase-input": {
      color: theme.palette.primary.main,
    },
    input: {
      ":-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px white inset",
        WebkitTextFillColor: theme.palette.primary.main,
      },
    },
    textarea: {
      ":-internal-autofill-selected": {
        WebkitBoxShadow: "0 0 0 1000px white inset",
        WebkitTextFillColor: theme.palette.primary.main,
      },
    },
  }));
}

export default S;
