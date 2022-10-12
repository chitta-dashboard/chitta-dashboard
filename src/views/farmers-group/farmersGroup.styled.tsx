import { Box, styled, Typography } from "@mui/material";

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

  export const Items = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    padding: "0.6rem 1rem",
    borderBottom: `0.1rem solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,
    color: theme.palette.text.secondaryLight,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
      color: theme.palette.text.secondaryDark,
    },
  }));
}

export default S;
