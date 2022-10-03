import { styled, Box, Button } from "@mui/material";

namespace S {
  export const ShareDetailFooterContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "2.8125rem",
    height: "5rem",
  }));
  export const CustomButton = styled(Button)(({ theme }) => ({
    fontSize: "1.25rem",
    backgroundColor: "white",
    color: theme.palette.text.primary,
    border: "2px solid #1A9035",
    minWidth: "8.4375rem",
    "&:hover": {
      color: "white",
    },
  }));
}
export default S;
