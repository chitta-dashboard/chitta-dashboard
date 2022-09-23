import { Stack, styled } from "@mui/material";

namespace S {
  export const LeftSectionContainer = styled(Stack)(({ theme }) => ({
    width: "100%",
    "& .MuiPaper-root": {
      minWidth: "12rem",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  }));
}

export default S;
