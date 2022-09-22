import { styled, Stack } from "@mui/material";

namespace S {
  export const InputContainer = styled(Stack)(({ theme }) => ({
    marginLeft: "1rem",
    marginRight: "1rem",
    marginBottom: "1rem",
    marginTop: "2rem",
    width: "30rem",

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  export const DateField = styled(Stack)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      color: theme.palette.text.secondaryLight,
      height: "2rem",
      width: "14.5rem",
    },
  }));
}

export default S;
