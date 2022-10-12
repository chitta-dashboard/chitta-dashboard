import { styled, Box, Button } from "@mui/material";

namespace S {
  export const ShareDetailFooterContainer = styled(Box)({
    display: "flex",
    gap: "2.8125rem",
    height: "5rem",
  });

  export const CustomButton = styled(Button)(({ theme }) => ({
    fontSize: "1.25rem",
    backgroundColor: theme.palette.bg.main,
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.border.primary}`,
    minWidth: "8.4375rem",
    "&:hover": {
      color: theme.palette.text.white,
    },
  }));
}
export default S;
