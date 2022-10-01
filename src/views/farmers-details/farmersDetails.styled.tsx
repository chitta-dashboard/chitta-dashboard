import { Box, styled } from "@mui/material";

namespace S {
  export const FarmersDetailsContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",

    "& .MuiTableContainer-root": {
      [theme.breakpoints.down("lg")]: {
        margin: "1.5rem 0",
        height: "calc(100% - 8rem)",
      },
      [theme.breakpoints.down("md")]: {
        margin: "1rem 0",
        height: "calc(100% - 10.5rem)",
      },
    },
  }));
}

export default S;
