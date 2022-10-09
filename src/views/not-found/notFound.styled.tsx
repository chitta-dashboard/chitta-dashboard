import { Box, Typography, styled } from "@mui/material";

namespace S {
  export const NotFountBox = styled(Box)({
    display: "grid",
    placeContent: "center",
  });

  export const NotFountText = styled(Typography)({
    textAlign: "center",
  });
}

export default S;
