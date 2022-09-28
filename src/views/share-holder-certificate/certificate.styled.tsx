import { Theme, Typography } from "@mui/material";
import { Box, styled } from "@mui/material";

export namespace S {
  export const ShareHolderCertificateContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    height: "52.4188rem",
    width: "74.375rem",
    backgroundColor: "#FFFFFF",
    position: "relative",
    padding: "4.375rem ",
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
    color: theme.palette.primary.light,
    fontFamily: "Poppins",
    fontWeight: "600",
    textAlign: "center",
  }));
  export const HeadingContainerSignNo = styled(Box)(({ theme }: { theme: Theme }) => ({}));
  export const RegNoCin = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "0.9375rem",
    fontFamily: "Poppins",
    color: "#323232",
  }));
  export const ShareCertificateHeading = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontFamily: "My Soul",
    fontSize: "4.0625rem",
    color: "#0D0D0D",
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
    height: "2.8125rem",
  }));
  export const CertificateText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "flex-end",
    fontFamily: "Poppins",
    fontSize: "1.125rem",
    color: "#12441E",
  }));
  export const SignatureTextLine = styled(Box)(({ theme }: { theme: Theme }) => ({
    Width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    gap: "9.375rem",
    height: "2.5rem",
    marginTop: "4.375rem",
    paddingRight: "1.4375rem",
  }));
  export const BlankSpace1 = styled(Typography)(({ theme }: { theme: Theme }) => ({
    boxSizing: "border-box",
    fontFamily: "Poppins",
    fontSize: "1.125rem",
    textAlign: "center",
    color: "#12441E",
    borderBottom: "1px solid #404040",
    minWidth: "13.125rem",
    maxWidth: "14.375rem",
    height: "1.625rem",
  }));
  export const BlankSpace2 = styled(BlankSpace1)(({ theme }: { theme: Theme }) => ({
    minWidth: "90%",
  }));
  export const BlankSpace3 = styled(BlankSpace1)(({ theme }: { theme: Theme }) => ({
    minWidth: "100%",
  }));
  export const BlankSpace4 = styled(BlankSpace1)(({ theme }: { theme: Theme }) => ({
    marginRight: "auto",
    marginLeft: "0.5rem",
  }));
}
