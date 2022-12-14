import { Box, Typography, styled, Button } from "@mui/material";

namespace S {
  export const NotFountBox = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",
    background: theme.palette.bg.main,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "5rem",
    height: "100%",
    width: "100%",
    borderRadius: "0.5rem",
  }));

  export const NotFountText = styled(Typography)({
    textAlign: "center",
    lineHeight: " 1",
  });

  export const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    padding: "0.4rem ",
    width: "6rem",
    marginTop: "1rem",
    borderRadius: "1.3rem",
    fontSize: "1rem",
    fontWeight: "500",
    "&:hover": {
      transform: "scale(1.1)",
    },
  }));
}

export default S;
