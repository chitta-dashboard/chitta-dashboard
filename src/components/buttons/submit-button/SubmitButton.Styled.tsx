import { styled, Box } from "@mui/material";

namespace S {
  export const ButtonContainer = styled(Box)(({ theme }) => ({
    marginTop: "1rem",
    marginBottom: "1rem",

    "& .MuiButton-root": {
      paddingLeft: "3rem",
      paddingRight: "3rem",
      marginBottom: "1rem",
      backgroundColor: theme.palette.primary.light,
    },
  }));
}

export default S;