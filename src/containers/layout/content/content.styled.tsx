import styled from "@emotion/styled";
import { Box } from "@mui/material";

export namespace S {
  export const ContentBox = styled(Box)(({ theme }: any) => ({
    marginTop: "5rem",
    minHeight: "28rem",
    boxSizing:"border-box"
  }));
}
