import { Box, Button, IconButton, styled, Typography } from "@mui/material";

namespace S {
  export const DecisionsTreeContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "white",
    borderRadius: theme.shape.containerRadius,
    padding: "2rem 0",
    overflow: "hidden",
  }));

  export const DecisionsTreeBox = styled(Box)(({ theme }) => ({
    width: "calc(800px - 12px)", //-12px to center the stem alignment
    position: "relative",
    top: "53%", // a little bit down vertically
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "600px",

    [theme.breakpoints.down("md")]: {
      transform: "translate(-50%, -50%) scale(.8)",
    },
  }));

  const LeafStyles = styled(Box)(({ theme }) => ({
    width: "265px",
    height: "150px",
    position: "absolute",
    padding: "calc(10px + 6px)", //10px to overlap border & 6px for actual padding
    textAlign: "center",

    img: {
      position: "absolute",
      top: "0px",
      left: "0px",
    },
  }));

  export const L1 = styled(LeafStyles)(({ theme }) => ({
    top: "0",
    left: "0",
    borderRadius: "0 63px 20px 63px",
  }));

  export const L2 = styled(LeafStyles)(({ theme }) => ({
    top: "200px",
    left: "0",
    borderRadius: "0 63px 20px 63px",
  }));

  export const R1 = styled(LeafStyles)(({ theme }) => ({
    top: "100px",
    right: "0",
    borderRadius: "63px 0 63px 20px",

    img: {
      left: "unset",
      right: "0",
    },
  }));

  export const R2 = styled(LeafStyles)(({ theme }) => ({
    top: "300px",
    right: "0",
    borderRadius: "63px 0 63px 20px",

    img: {
      left: "unset",
      right: "0",
    },
  }));

  export const Bud = styled("img")(({ theme }) => ({
    position: "absolute",
    left: "348px",
    top: "28px",
  }));

  export const Shadow = styled("img")(({ theme }) => ({
    position: "absolute",
    left: "260px",
    top: "565px",
  }));

  export const DecisionTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "10px",
  }));

  export const DecisionDescription = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryLight,
    lineHeight: "1.3",
    fontSize: ".8rem",
    marginBottom: "10px",
  }));

  export const ButtonsBar = styled(Box)(({ theme }) => ({}));

  export const ViewBtn = styled(Button)(({ theme }) => ({
    padding: ".2rem 2rem",
    fontSize: ".7rem",
  }));

  export const DownloadBtn = styled(IconButton)(({ theme }) => ({
    width: "1.7rem",
    height: "1.7rem",
    fontSize: "1rem",
    marginLeft: "15px",
    color: "white",
    "&.MuiButtonBase-root": {
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: "#57ab5b",
      },
    },
  }));

  export const DecisionsTimestamp = styled(DecisionDescription, { shouldForwardProp: (prop) => prop !== "placement" })<{
    placement: "left" | "right";
  }>(({ theme, placement }) => ({
    color: theme.palette.text.secondaryExtraLight,
    position: "absolute",
    top: "-18px",
    [placement]: "0",
  }));
}

export default S;
