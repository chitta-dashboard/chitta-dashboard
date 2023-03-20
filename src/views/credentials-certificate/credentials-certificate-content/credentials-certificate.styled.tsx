import { Box, styled, Typography } from "@mui/material";

export namespace S {
  export const CredentialsContainerContent = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "1104px",
    minHeight: "1562px",
    maxHeight: "1562px",
    backgroundColor: theme.palette.bg.main,
    position: "relative",
    padding: "100px 152px 30px",
    overflow: "hidden",
    gap: "2rem",
  }));

  export const CertificateHeader = styled(Box)(() => ({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.7rem",
  }));

  export const HeaderText = styled(Typography)(() => ({
    fontSize: "22px",
    fontWeight: "600",
  }));

  export const LogoContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
  }));

  export const ChittaLogo = styled("img")(() => ({
    height: "60px",
  }));

  export const UserCredentials = styled(Box)(() => ({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1.2rem",
    width: "100%",
  }));

  export const CredentialRow = styled(Box)(() => ({}));

  export const CredentialText = styled(Typography)(() => ({
    fontSize: "18px",
  }));

  export const UserName = styled("span")(() => ({
    fontSize: "18px",
    fontWeight: "400",
  }));

  export const CredentialTextBold = styled(Typography)(() => ({
    fontSize: "18px",
    fontWeight: "600",
  }));

  export const DisclaimerContainer = styled(Box)(() => ({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1.4rem",
  }));

  export const DisclaimerText = styled(Typography)(() => ({
    fontSize: "16px",
  }));

  export const ItalicText = styled("span")(() => ({
    fontSize: "16px",
    fontWeight: "600",
    fontStyle: "italic",
  }));

  export const DisclaimerTextBold = styled(Typography)(() => ({
    fontSize: "22px",
    fontWeight: "600",
  }));

  export const DisclaimerList = styled(Box)(() => ({
    paddingLeft: "50px",
    ul: {
      li: {
        fontSize: "16px",
      },
    },
  }));
}
export default S;
