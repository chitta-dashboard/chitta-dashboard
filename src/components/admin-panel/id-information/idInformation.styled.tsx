import { Stack, styled, TextField, Typography } from "@mui/material";

namespace S {
  export const ContainerStack = styled(Stack)({
    gap: "1rem",
    width: "100%",
  });

  export const InputStack = styled(Stack)({
    gap: "1rem",
    flexDirection: "row",
    width: "100%",
  });

  export const IdText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryLight,
    fontSize: "1.125rem",
    lineHeight: "1.688rem",
    paddingBottom: "0.5rem",
  }));

  export const IdInput = styled(TextField)(({ theme }) => ({
    width: "100%",
    borderRadius: "0.625rem",
    textAlign: "center",
    "& .MuiFormLabel-root": {
      color: theme.palette.primary.light,
    },
    "& .MuiFormHelperText-root": {
      color: theme.palette.text.red,
      textAlign: "left",
      padding: "0.4rem 0rem",
      margin: "0%",
      fontSize: "0.75rem",
      lineHeight: "1.125rem",
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
      color: theme.palette.primary.main,
    },
    input: {
      ":-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px white inset",
        WebkitTextFillColor: theme.palette.primary.main,
      },
    },
  }));
}
export default S;
