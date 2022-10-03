import { Theme, Typography } from "@mui/material";
import { Box, styled } from "@mui/material";

export namespace S {
  export const TamilShareCertificateContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    height: "52.5rem",
    width: "74.375rem",
    backgroundColor: "#FFFFFF",
    position: "relative",
    padding: "4.375rem 6.25rem ",
  }));
  export const CertificateTopBorderImg = styled("img")(({ theme }: { theme: Theme }) => ({
    position: "absolute",
    width: "70%",
    left: "50%",
    right: "50%",
    top: "2.3125rem",
    transform: "translate(-50%, -50%)",
  }));
  export const CertificateBottomBorderImg = styled("img")(({ theme }: { theme: Theme }) => ({
    position: "absolute",
    width: "70%",
    left: "50%",
    right: "50%",
    bottom: "0.625rem",
    transform: "translate(-50%, -50%)",
  }));
  export const CertificateLeftBorderImg = styled("img")(({ theme }: { theme: Theme }) => ({
    position: "absolute",
    height: "70%",
    top: "50%",
    bottom: "50%",
    left: "1.875rem",
    transform: "translate(-50%, -50%)",
  }));
  export const CertificateRightBorderImg = styled("img")(({ theme }: { theme: Theme }) => ({
    position: "absolute",
    height: "70%",
    top: "50%",
    bottom: "50%",
    right: "0.75rem",
    transform: "translate(-50%, -50%)",
  }));
  export const TopLeftIcon = styled("img")(({ theme }: { theme: Theme }) => ({
    position: "absolute",
    left: "0",
    top: "0",
    width: "10rem",
  }));
  export const TopRightIcon = styled("img")(({ theme }: { theme: Theme }) => ({
    transform: "scaleX(-1)",
    position: "absolute",
    right: "0",
    top: "0",
    width: "10rem",
  }));
  export const BottomLeftIcon = styled("img")(({ theme }: { theme: Theme }) => ({
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "10rem",
  }));
  export const BottomRightIcon = styled("img")(({ theme }: { theme: Theme }) => ({
    transform: "scaleX(-1)",
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "10rem",
  }));

  export const CertificateHeadingContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }));

  export const HeadingContainerLogo = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "fit-content",
  }));
  export const NerkathirLogo = styled("img")(({ theme }: { theme: Theme }) => ({
    width: "8.125rem",
    marginRight: "4.375rem",
  }));
  export const HeadingContainerHeading = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "2.125rem",
    color: "#1A9035",
    fontFamily: "Poppins",
    fontWeight: "600",
    textAlign: "center",
  }));
  export const HeadingContainerSignNo = styled(Box)(({ theme }: { theme: Theme }) => ({}));
  export const RegNoCin = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "0.9375rem",
    fontFamily: "Poppins",
  }));

  export const CertificateHeader = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "1.75rem",
    fontWeight: "600",
  }));
  export const DateContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "space-between",
  }));
  export const DateBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    minWidth: "9.6875rem",
  }));
  export const DateText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "1.125rem",
    fontWeight: "600",
  }));
  export const CertificateContent = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "100%",
    height: "fit-content",
  }));
  export const CertificateTextLine = styled(Box)(({ theme }: { theme: Theme }) => ({
    Width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "3rem",
  }));
  export const CertificateText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "flex-end",
    fontSize: "1.125rem",
    fontWeight: "600",
  }));
  export const CertificateText2 = styled(Typography)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "flex-end",
    fontSize: "1.125rem",
    fontWeight: "600",
    textAlign: "justify",
    width: "100%",
  }));
  export const ShareCountContainer = styled(DateContainer)(({ theme }: { theme: Theme }) => ({
    width: "80%",
  }));
  export const ShareCountInnerContainer = styled(DateContainer)(({ theme }: { theme: Theme }) => ({
    width: "fit-content",
    gap: "1rem",
  }));
  export const SignatureLine = styled(DateContainer)(({ theme }: { theme: Theme }) => ({
    width: "100%",
    marginTop: "3.125rem",
  }));
  export const ShareCount = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: "1px solid #404040",
    padding: "1.1rem 0.7rem",
    height: "1.625rem",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "red",
  }));
  export const BlankSpace1 = styled(Typography)(({ theme }: { theme: Theme }) => ({
    boxSizing: "border-box",
    textAlign: "center",
    borderBottom: "1px solid #404040",
    minWidth: "250px",
    height: "1.625rem",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "red",
  }));
  export const BlankSpace2 = styled(BlankSpace1)(({ theme }: { theme: Theme }) => ({
    width: "23.75rem",
    color: "red",
  }));
  export const BlankSpace3 = styled(BlankSpace1)(({ theme }: { theme: Theme }) => ({
    width: "85%",
    color: "red",
  }));
}
