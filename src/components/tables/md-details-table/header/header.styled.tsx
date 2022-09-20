import { Stack, styled } from "@mui/material";
namespace S {
  export const WebStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));
  export const TabStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));
}

export default S;
