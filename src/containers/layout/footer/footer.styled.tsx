import { Box } from "@mui/material";
import { Theme, styled } from "@mui/material";

export namespace S {
  export const FooterContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: ".5rem",
    backgroundColor: "white",
    textAlignc: "center",
  }));
}
