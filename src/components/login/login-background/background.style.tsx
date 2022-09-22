import { Box, Typography, styled } from "@mui/material";

namespace S {
  export const ImageContainer = styled(Box)(({ theme }) => ({
    width: "55%",
    height: "100vh",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const TopImageBox = styled(Box)(({ theme }) => ({
    overflow: "hidden",
    position: "absolute",
    width: "100%",
    height: "17vh",
    top: "0rem",
    left: "0rem",
  }));
  export const FarmerImageBox = styled(Box)(({ theme }) => ({
    overflow: "hidden",
    position: "absolute",
    width: "70%",
    height: "44vh",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }));
  export const BottomImageBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    width: "100%",
    height: "25vh",
    bottom: "0%",
    right: "-60%",
  }));
  export const TopImage = styled("img")(({ theme }) => ({
    position: "absolute",
    top: "0rem",
    left: "0rem",
    height: "100%",
    width: "50%",
    objectFit: "cover",
  }));
  export const FarmerImage = styled("img")(({ theme }) => ({
    position: "absolute",
    height: "100%",
    width: "100%",
    objectFit: "contain",
  }));
  export const BottomImage = styled("img")(({ theme }) => ({
    position: "absolute",
    height: "100%",
    width: "100%",
    objectFit: "fill",
  }));

  export const HeadingText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontWeight: "600",
    fontSize: "2.625rem",
    lineHeight: "3.938rem",
    textAlign: "center",
    marginTop: "10vh",
  }));
  export const RegTextBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    bottom: "4%",
    left: "6%",
  }));
  export const RegText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.688rem",
  }));
}

export default S;
