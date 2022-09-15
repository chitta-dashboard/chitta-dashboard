import { Box } from "@mui/material";
import { Theme, styled } from "@mui/material";

export namespace S {
  export const ContentBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    overflowY: "auto",
    padding: "1.2rem 2.2rem",
  }));
}
