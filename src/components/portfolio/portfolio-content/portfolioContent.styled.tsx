import { styled, Box } from "@mui/material";

namespace S {
  export const PortfolioContentContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.bg.main,
    borderRadius: theme.shape.containerRadius,
    height: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
  }));
}

export default S;
