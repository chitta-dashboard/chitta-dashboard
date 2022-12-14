import { Box, styled, Typography, Button } from "@mui/material";

export namespace S {
  export const CertificateNodataContainer = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",
    background: theme.palette.bg.main,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "5rem",
    height: "100%",
    width: "100%",
    borderRadius: "0.5rem",
  }));

  export const NoDataErrorText = styled(Typography)(({ theme }) => ({
    fontSize: "1.375rem",
    fontWeight: "600",
    color: theme.palette.text.black,
    textAlign: "center",
    lineHeight: "1.25",
  }));

  export const NoDataErrorText2 = styled(NoDataErrorText)({
    cursor: "pointer",
  });

  export const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    padding: "0.4rem ",
    width: "6rem",
    borderRadius: "1.3rem",
    fontSize: "1rem",
    fontWeight: "500",
    "&:hover": {
      transform: "scale(1.1)",
    },
  }));
}

export default S;
