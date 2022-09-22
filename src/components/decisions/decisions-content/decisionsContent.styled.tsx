import { styled, Box } from "@mui/material";

namespace S {
  export const DecisionsContentContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "white",
    borderRadius: theme.shape.containerRadius,
    height: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    paddingTop: "3rem",
    justifyContent: "center",
  }));
}

export default S;
