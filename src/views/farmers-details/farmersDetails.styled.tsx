import { Box, styled } from "@mui/material";

namespace S {
  export const FarmersDetailsContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",

    "& .MuiTableContainer-root": {
      [theme.breakpoints.down("lg")]: {
        margin: "1.5rem 0",
        height: "calc(100% - 7rem)",
      },
      [theme.breakpoints.down("md")]: {
        margin: "1rem 0",
        height: "calc(100% - 10rem)",
      },
    },
  }));
}

export default S;
