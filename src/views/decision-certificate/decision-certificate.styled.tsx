import { Theme, Box, Typography, Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material";

export namespace S {
  export const DecisionCertificateMainContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  }));
  export const ButtonContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  }));
  export const ButtonAlignmentBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    gap: "1.5625rem",
  }));
  export const Button = styled(MuiButton)(({ theme }: { theme: Theme }) => ({
    minWidth: "6.8rem",
    padding: "0.4rem 0.5rem",
  }));
  export const DecisionCertificateContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    height: "90%",
    width: "100%",
    background: "#FFFFFF",
    borderRadius: "1.25rem",
    overflowY: "auto",
    padding: "1rem 5%",
  }));
  export const DecisionCertificateHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "14.375rem",
    padding: "1rem 0",
  }));
  export const NerkathirLogo = styled("img")(({ theme }: { theme: Theme }) => ({
    height: "4.375rem",
  }));
  export const HeaderText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "1.375rem",
    fontWeight: "600",
    color: theme.palette.text.primary,
    textAlign: "center",
    lineHeight: "1.25",
  }));
  export const HeaderSubText = styled(HeaderText)(({ theme }: { theme: Theme }) => ({
    fontSize: "1rem",
    fontWeight: "400",
    textAlign: "center",
    color: "#323232",
  }));
  export const DateContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    width: "100%",
    height: "7.5rem",
  }));

  export const FlexLine = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
  }));
  export const FlexLine2 = styled(FlexLine)(({ theme }: { theme: Theme }) => ({
    width: "100%",
    justifyContent: "space-between",
  }));
  export const DateText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "1.125rem",
    fontWeight: "600",
  }));
  export const DateText2 = styled(DateText)(({ theme }: { theme: Theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: "500",
    marginLeft: "0.3125rem",
    lineHeight: "1.2",
  }));
  export const CertificateContent = styled(Box)(({ theme }: { theme: Theme }) => ({
    fontSize: "1.125rem",
    color: theme.palette.text.secondary,
  }));
  export const SignatureContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: "1.25rem",
  }));
  export const SignatureContainerContent = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: "0.625rem",
  }));
  export const SignatureContainerRight = styled(Box)(({ theme }: { theme: Theme }) => ({}));
}
