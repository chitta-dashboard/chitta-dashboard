import { styled, Stack, Avatar } from "@mui/material";

namespace S {
  export const InputContainer = styled(Stack)(({ theme }) => ({
    marginLeft: "1rem",
    marginRight: "1rem",
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

  export const PageNumber = styled(Avatar)(({ theme }) => ({
    width: "2rem",
    height: "2rem",
    marginTop: "1rem",
  }));
}

export default S;
