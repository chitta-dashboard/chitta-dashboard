import { Box, Typography, styled } from "@mui/material";

namespace S {
  export const LoginDetailsWrapper = styled(Box)(({ theme }) => ({
    width: "55%",
    height: "100vh",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const OverlayTopImageContainer = styled(Box)({
    width: "38rem",
    height: "38rem",
    position: "absolute",
    top: "0",
    left: "0",
  });

  export const OverlayTopImage = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    position: "absolute",
    top: "-75%",
    left: "-40%",
    backgroundColor: theme.palette.addAlpha(theme.palette.primary.main, 0.08),
  }));

  export const FarmerImageContainer = styled(Box)({
    overflow: "hidden",
    position: "absolute",
    width: "70%",
    height: "44%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });

  export const OverlayBottomImageContainer = styled(Box)({
    position: "absolute",
    width: "100%",
    height: "25%",
    bottom: "0%",
    right: "-60%",
  });

  export const FarmerImage = styled("img")({
    position: "absolute",
    height: "100%",
    width: "100%",
    objectFit: "contain",
  });

  export const OverlayBottomImage = styled("img")({
    position: "absolute",
    height: "100%",
    width: "100%",
    objectFit: "fill",
  });

  export const FarmerHeadingText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontWeight: "600",
    fontSize: "2.625rem",
    lineHeight: "3.938rem",
    textAlign: "center",
    marginTop: "10vh",
  }));

  export const RegisterNoContainer= styled(Box)({
    position: "absolute",
    bottom: "4%",
    left: "6%",
  });

  export const RegisterNoText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryLight,
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.688rem",
  }));
}

export default S;
