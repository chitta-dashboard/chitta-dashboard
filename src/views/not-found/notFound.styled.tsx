import { Box, Typography, styled } from "@mui/material";

namespace S {
  export const NotFountBox = styled(Box)(({ theme }) => ({
    display: "grid",
    placeContent: "center",
  }));
  export const NotFountText = styled(Typography)(({ theme }) => ({
    textAlign: "center",
  }));
}

export default S;
