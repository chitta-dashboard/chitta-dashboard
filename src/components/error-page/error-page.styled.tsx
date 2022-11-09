import { Box, styled, Typography } from "@mui/material";

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
  export const NoDataErrorText2 = styled(NoDataErrorText)(({ theme }) => ({
    cursor: "pointer",
  }));
}

export default S;
