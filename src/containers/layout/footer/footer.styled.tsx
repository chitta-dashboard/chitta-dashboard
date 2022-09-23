import styled from "@emotion/styled";
import { Box } from "@mui/material";

export namespace S {
  export const FooterContainer = styled(Box)(({ theme }: any) => ({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    boxSizing: "border-box",
  }));
}
