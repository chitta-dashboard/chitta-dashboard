import { Box, MenuItem, styled } from "@mui/material";

namespace S {
  export const FarmersGroupContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",

    [theme.breakpoints.down("md")]: {
      gap: "1rem",
    },
  }));

  export const Items = styled(MenuItem)(({ theme }) => ({
    textAlign: "center",
    padding: "0.6rem 1rem",
    borderBottom: "0.1rem solid #6868681A",
    color: theme.palette.text.secondaryLight,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.custom.backgroundLight,
      color: "#1E1E1E",
    },
  }));
}

export default S;
