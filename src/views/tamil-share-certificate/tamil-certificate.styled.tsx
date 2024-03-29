import { Box, styled, Typography } from "@mui/material";

export namespace S {
  // export const TamilShareCertificateContainer = styled(Box)(({ theme }) => ({
  export const TamilShareCertificateContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "Toggle",
  })<{ Toggle: boolean | undefined }>(({ theme, Toggle }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    height: Toggle ? "775.5px" : "839px",
    width: Toggle ? "69rem" : "74.375rem",
    backgroundColor: theme.palette.bg.main,
    position: "relative",
    padding: "4.375rem 6.25rem ",
    overflow: "hidden",
  }));

  export const CertificateTopBorderImg = styled("img")({
    position: "absolute",
    width: "70%",
    left: "50%",
    right: "50%",
    top: "2.3125rem",
    transform: "translate(-50%, -50%)",
  });

  export const CertificateBottomBorderImg = styled("img")({
    position: "absolute",
    width: "70%",
    left: "50%",
    right: "50%",
    bottom: "0.625rem",
    transform: "translate(-50%, -50%)",
  });

  export const CertificateLeftBorderImg = styled("img")({
    position: "absolute",
    height: "70%",
    top: "50%",
    bottom: "50%",
    left: "1.875rem",
    transform: "translate(-50%, -50%)",
  });

  export const CertificateRightBorderImg = styled("img")({
    position: "absolute",
    height: "70%",
    top: "50%",
    bottom: "50%",
    right: "0.75rem",
    transform: "translate(-50%, -50%)",
  });

  export const TopLeftIcon = styled("img")({
    position: "absolute",
    left: "0",
    top: "0",
    width: "10rem",
  });

  export const TopRightIcon = styled("img")({
    transform: "scaleX(-1)",
    position: "absolute",
    right: "0",
    top: "0",
    width: "10rem",
  });

  export const BottomLeftIcon = styled("img")({
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "10rem",
  });

  export const BottomRightIcon = styled("img")({
    transform: "scaleX(-1)",
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "10rem",
  });

  export const CertificateHeadingMainContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "1.1rem",
  }));

  export const CertificateHeadingContainer = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  export const HeadingContainerLogo = styled(Box)({
    width: "fit-content",
  });

  export const NerkathirLogo = styled("img")({
    width: "8.125rem",
    marginRight: "4.375rem",
    borderRadius: "50%",
    aspectRatio: "1/1",
    // filter: "grayscale(100%)",
  });

  export const HeadingContainerHeading = styled(Typography)(({ theme }) => ({
    fontSize: "2.125rem",
    color: theme.palette.text.primary,
    fontFamily: "Poppins",
    fontWeight: "600",
    textAlign: "center",
  }));

  export const HeadingContainerSignNo = styled(Box)({});

  export const RegNoCin = styled(Typography)({
    fontSize: "0.9375rem",
    fontFamily: "Poppins",
  });

  export const CertificateHeader = styled(Typography)({
    fontSize: "1.75rem",
    fontWeight: "600",
  });

  export const DateContainer = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "space-between",
  });

  export const DateBox = styled(Box)({
    minWidth: "9.6875rem",
  });

  export const DateText = styled(Typography)({
    fontSize: "1.125rem",
    fontWeight: "600",
  });

  export const CertificateContent = styled(Box)({
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    height: "fit-content",
  });

  export const CertificateTextLine = styled(Box)({
    minWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "3rem",
  });

  export const CertificateText = styled(Typography)({
    display: "flex",
    alignItems: "flex-end",
    fontSize: "1.125rem",
    fontWeight: "600",
  });

  export const CertificateText2 = styled(Typography)({
    display: "flex",
    alignItems: "flex-end",
    fontSize: "1.125rem",
    fontWeight: "600",
    textAlign: "justify",
    width: "100%",
  });

  export const ShareCountContainer = styled(DateContainer)({
    marginTop: "10px",
    width: "100%",
  });

  export const ShareCountInnerContainer = styled(DateContainer)({
    width: "fit-content",
    gap: "0.1rem !important",
  });

  export const SignatureLine = styled(DateContainer)({
    width: "100%",
    marginTop: "5.5rem",
  });

  export const ShareCount = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: `px solid ${theme.palette.border.certificate}`,
    padding: "1.1rem 0.7rem",
    height: "1.625rem",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: theme.palette.text.black,
  }));

  export const BlankSpace1 = styled(Typography)(({ theme }) => ({
    boxSizing: "border-box",
    textAlign: "center",
    borderBottom: `1px solid ${theme.palette.border.certificate}`,
    minWidth: "250px",
    height: "1.625rem",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: theme.palette.text.black,
  }));

  export const BlankSpace2 = styled(BlankSpace1)({
    width: "23.75rem",
  });

  export const BlankSpace3 = styled(BlankSpace1)({
    width: "85%",
    textAlign: "left",
  });

  export const CertificateGap = styled("div")({
    height: "11px",
  });
}
