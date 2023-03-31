import { Box, styled, Typography } from "@mui/material";

namespace S {
  export const foundersContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    [theme.breakpoints.down("md")]: {
      gap: "1rem",
    },
  }));

  export const NoDataFound = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  }));
}

export default S;
