import { Box, styled, Typography } from "@mui/material";

export namespace S {
  export const ShareCertificateContent = styled(Box)(({ theme }) => ({
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
    padding: "1.875rem 1.25rem",
    overflow: "hidden",
  }));

  export const CertificateMainContent = styled(Box)(() => ({
    border: "0.3125rem solid #284120",
    minHeight: "1129.67px",
    maxHeight: "1129.67px",
    width: "100%",
    padding: "1rem 32px",
    display: "flex",
    gap: "1.5rem",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  }));

  export const CertificateHeader = styled(Box)(() => ({
    display: "flex",
    width: "100%",
    minHeight: "208px",
    maxHeight: "208px",
  }));

  export const HeaderLogo = styled(Box)(() => ({
    width: "25%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  export const CustomLogo = styled("img")(() => ({
    height: "100%",
  }));

  export const HeaderContent = styled(Box)(() => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    textAlign: "center",
    width: "75%",
  }));

  export const FormNo = styled(Typography)(() => ({
    position: "absolute",
    color: "#112f5c",
    fontSize: "18px",
    fontWeight: "600",
    right: "0",
    top: "-16px",
  }));

  export const HeaderMainText = styled(Typography)(() => ({
    color: "#284120",
    fontSize: "1.625rem",
    fontWeight: "600",
  }));

  export const HeaderSubtext = styled(Typography)(() => ({
    color: "#112f5c",
    fontSize: "1rem",
  }));

  export const CertificateTitle = styled(Typography)(() => ({
    fontSize: "1.625rem",
    color: "#ad1010",
    fontWeight: "600",
  }));

  export const HeaderAddressText = styled(Typography)(() => ({
    color: "#112f5c",
    fontSize: "1.25rem",
    fontWeight: "500",
    margin: "0.5rem 0",
  }));

  export const Description = styled(Typography)(() => ({
    color: "#112f5c",
    fontSize: "1.25rem",
    width: "100%",
    textIndent: "0.625rem",
  }));

  export const DescriptionBold = styled("span")(() => ({
    color: "#112f5c",
    fontSize: "1.25rem",
    width: "100%",
    fontWeight: "600",
  }));

  export const ShareValue = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    border: "0.25rem solid black",
    width: "100%",
  }));

  export const CompanySeal = styled(Box)(() => ({
    width: "100%",
    fontSize: "1.25rem",
    color: "#112f5c",
    paddingTop: "0.625rem",
  }));

  export const DirectorSign = styled(Box)(() => ({
    width: "100%",
    fontSize: "1.25rem",
    color: "#112f5c",
    fontWeight: "600",
    textAlign: "right",
    paddingTop: "0.625rem",
    paddingRight: "7.5rem",
  }));

  export const DirectorSign2 = styled(DirectorSign)(() => ({
    paddingTop: "1.875rem",
  }));

  export const CertificateNote = styled(Box)(() => ({
    width: "100%",
    fontSize: "1rem",
    color: "#112f5c",
    fontWeight: "500",
  }));

  export const ShareRow = styled(Box)(() => ({
    display: "flex",
    width: "100%",
    padding: "0.4375rem 0.9375rem",
  }));

  export const ShareText = styled(Typography)(() => ({
    fontSize: "1.25rem",
    color: "#112f5c",
    fontWeight: "600",
    width: "11.5625rem",
  }));

  export const ShareHolderInfoRow = styled(ShareRow)(() => ({
    padding: "0.4375rem 0.3125rem",
    width: "100%",
    justifyContent: "space-between",
  }));

  export const ShareInfoText = styled(Typography)(() => ({
    fontSize: "1.25rem",
    color: "#112f5c",
    fontWeight: "600",
    width: "15.625rem",
    position: "relative",
    "&::after": {
      content: "':'",
      display: "block",
      position: "absolute",
      right: "0",
      top: "0",
    },
  }));

  export const CertificateDetailWrapper = styled(Box)(() => ({
    display: "flex",
  }));

  export const ShareInfoTextRight = styled(ShareInfoText)(() => ({
    width: "9.375rem",
    display: "flex",
  }));

  export const Detail = styled(Box)(() => ({
    minWidth: "9.375rem",
    paddingLeft: "0.625rem",
    fontSize: "1.25rem",
    color: "#112f5c",
    fontWeight: "600",
  }));

  export const SignatureText = styled(Typography)(() => ({
    fontSize: "1.25rem",
    color: "#112f5c",
    fontWeight: "600",
    marginRight: "1.25rem",
  }));

  export const DetachableLine = styled(Box)(() => ({
    width: "100%",
    borderTop: "1px dashed #284120",
    margin: "24.9px 0",
  }));

  export const CertificateDetachableContent = styled(Box)(() => ({
    border: "5px solid #284120",
    width: "100%",
    minHeight: "319.17px",
    maxHeight: "319.17px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "0.8rem",
    padding: "0 1rem 1rem",
  }));

  export const DetachableHeaderContainer = styled(Box)(() => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }));

  export const DetachableHeaderTitle = styled(Box)(() => ({
    fontSize: "1rem",
    color: "#ad1010",
    fontWeight: "600",
  }));

  export const DetachableHeaderText = styled(Box)(() => ({
    color: "#284120",
    fontSize: "1.625rem",
    fontWeight: "600",
  }));
}
