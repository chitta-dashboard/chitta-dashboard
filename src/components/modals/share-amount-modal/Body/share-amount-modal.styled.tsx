import { styled, Box, Typography } from "@mui/material";

namespace S {
  export const ShareDetailBodyContainer = styled(Box)({
    height: "7.5rem",
    width: "29.375rem",
    padding: "0 0.625rem",
    display: "flex !important",
    justifyContent: "space-between !important",
  });

  export const ShareDetailLeft = styled(Box)({
    display: "flex",
    alignItems: "flex-start !important",
    gap: "0.625rem",
    flexDirection: "column",
  });

  export const ShareHolderCount = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondaryLight,
    display: "flex",
    gap: "0.625rem",
    fontSize: "1.375rem",
  }));

  export const ShareHolderText = styled(Typography)(({ theme }) => ({
    fontSize: "1.125rem",
    color: theme.palette.text.secondaryLight,
  }));

  export const ShareDetailRight = styled(Box)(({ theme }) => ({
    position: "relative",
    height: "4.0625rem",
    width: "9.375rem",
    border: `2px solid ${theme.palette.border.primary}`,
    borderRadius: "0.625rem",
  }));

  export const FloatingAmount = styled(Box)(({ theme }) => ({
    position: "absolute",
    padding: "0 0.3125rem",
    top: "-0.75rem",
    left: "0.4375rem",
    backgroundColor: theme.palette.bg.main,
  }));

  export const CustomInput = styled("input")(({ theme }) => ({
    width: "90%",
    height: "95%",
    border: "none",
    outline: "none",
    fontSize: "1.125rem",
  }));

  export const InvisibleDiv = styled(Box)({
    display: "none",
  });
}
export default S;
