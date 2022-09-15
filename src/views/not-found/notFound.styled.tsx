import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export namespace S {
  export const NotFountBox = styled(Box)(({ theme }: any) => ({
    display: "grid",
    placeContent: "center",
  }));
  export const NotFountText = styled(Typography)(({ theme }: any) => ({
    textAlign: "center",
  }));
}
