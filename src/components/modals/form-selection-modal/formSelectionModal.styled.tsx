import { Box, styled, Typography } from "@mui/material";

namespace S {
  export const SelectionModalBody = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    minWidth: "22rem",
  }));

  export const ModalRow = styled(Box)(() => ({
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-start !important",
    width: "100%",
  }));

  export const ModalText = styled(Typography)(() => ({
    fontSize: "20px",
    fontWeight: "400",
  }));

  export const InvisibleDiv = styled(Box)(() => ({
    display: "none",
  }));
}
export default S;
