import { styled, Stack, TextField, Typography } from "@mui/material";

namespace S {
  export const IconStack = styled(Stack)({
    alignItems: "center",
  });

  export const Icon = styled("i")(({ theme }) => ({
    fontSize: "1.5rem",
    color: theme.palette.primary.main,
  }));

  export const SearchField = styled(TextField)(({ theme }) => ({
    borderRadius: "1.25rem",
    "& .MuiInputBase-input": {
      color: theme.palette.primary.light,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "2px solid",
      borderRadius: "2.25rem",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.border.primaryDark,
        border: "0.125rem solid",
        borderRadius: "0.2.25rem",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.border.primaryDark,
        border: "0.125rem solid",
        borderRadius: "2.25rem",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.border.primaryDark,
        border: "0.125rem solid",
        borderRadius: "2.25rem",
      },
    },
  }));

  export const SearchIcon = styled("i")(({ theme }) => ({
    color: theme.palette.primary.light,
  }));

  export const closeIcon = styled("i")(({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: "pointer",
  }));

  export const IconText = styled(Typography)(({ theme }) => ({
    fontSize: "0.8rem",
    lineHeight: "0.938rem",
    color: theme.palette.text.secondaryLight,
    fontWeight: 500,
  }));

  export const IconBox = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    padding: "1.3rem",
    gap: "0.4rem",
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
      cursor: "pointer",
      "& p": {
        fontWeight: 700,
      },
    },
  }));
}

export default S;
