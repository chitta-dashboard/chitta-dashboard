import { Box, styled } from "@mui/material";

export namespace S {
  export const Decisions = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateRows: "auto 1fr",
    height: "100%",
    gap: "1.2rem",
  }));
}
