import { Box, Theme, styled } from "@mui/material";

namespace S {
  export const ContentBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    overflowY: "auto",
    padding: "1.2rem 2.2rem",
  }));
}

export default S;
