import { Box, Button, IconButton, styled, Typography } from "@mui/material";

namespace S {
  export const DecisionsTreeBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "leafCount",
  })<{ leafCount: number }>(({ theme, leafCount }) => ({
    minWidth: "790px",
    position: "relative",
    height: `calc(230px + ${100 * leafCount}px)`,
    margin: "auto 0 15px 0",

    [theme.breakpoints.down("md")]: {
      transform: "scale(.8)",
    },
  }));

  const LeafStyles = styled(Box)({
    width: "265px",
    height: "150px",
    position: "absolute",
    padding: "6px", //10px to overlap border & 6px for actual padding
    textAlign: "center",
    border: "11px solid",
    "&::before": {
      content: "''",
      position: "absolute",
      width: "160px",
      height: "11px",
      borderRadius: "20px",
      bottom: "10px",
    },
    "&::after": {
      content: "''",
      position: "absolute",
      width: "12px", //1px extra
      height: "90px",
      bottom: "-148px",
    },
  });

  export const L1 = styled(LeafStyles)({
    top: "18px",
    left: "0",
    borderRadius: "0 63px 20px 63px",
    borderColor: "#1A9035",
    "&::before": {
      backgroundColor: "#1A9035",
      transform: "rotate(30deg)",
      transformOrigin: "left",
      left: "calc(265px - 17px)", //17px to cope border with and border radius
    },
    "&::after": {
      backgroundColor: "#1A9035",
      borderRadius: "40px 40px 80px 0px",
      left: "calc((265px - 17px) + 130px)", //15px to cope border with and border radius
    },
  });

  export const L2 = styled(LeafStyles)({
    top: "218px",
    left: "0",
    borderRadius: "0 63px 20px 63px",
    borderColor: "#D8C411",
    "&::before": {
      backgroundColor: "#D8C411",
      transform: "rotate(30deg)",
      transformOrigin: "left",
      left: "calc(265px - 17px)", //17px to cope border with and border radius
    },
    "&::after": {
      backgroundColor: "#D8C411",
      borderRadius: "40px 40px 80px 0px",
      left: "calc((265px - 17px) + 130px)", //15px to cope border with and border radius
    },
  });

  export const R1 = styled(LeafStyles)({
    top: "118px",
    right: "0",
    borderRadius: "63px 0 63px 20px",
    borderColor: "#4DC82F",
    "&::before": {
      backgroundColor: "#4DC82F",
      transform: "rotate(-30deg)",
      transformOrigin: "right",
      right: "calc(265px - 17px)", //17px to cope border with and border radius
    },
    "&::after": {
      backgroundColor: "#4DC82F",
      borderRadius: "40px 40px 0px 80px",
      right: "calc((265px - 17px) + 130px)", //15px to cope border with and border radius
    },
  });

  export const R2 = styled(LeafStyles)({
    top: "318px",
    right: "0",
    borderRadius: "63px 0 63px 20px",
    borderColor: "#B2A20F",
    "&::before": {
      backgroundColor: "#B2A20F",
      transform: "rotate(-30deg)",
      transformOrigin: "right",
      right: "calc(265px - 17px)", //17px to cope border with and border radius
    },
    "&::after": {
      backgroundColor: "#B2A20F",
      borderRadius: "40px 40px 0px 80px",
      right: "calc((265px - 17px) + 130px)", //17px to cope border with and border radius
    },
  });

  export const Bud = styled(Box)({
    // LEAF STYLING
    position: "absolute",
    top: "105px",
    left: "390px",
    width: "11px",
    height: "100px",
    backgroundColor: "#2B9C03",
    borderRadius: "0 0 0 80px",
    "&::before": {
      content: "''",
      position: "absolute",
      top: "-25px",
      left: "-40px",
      width: "44px",
      height: "35px",
      borderRadius: "0px 40px",
      transform: "matrix(0.71, 0.71, 0.71, -0.71, 0, 0)",
      backgroundColor: "#2B9C03",
    },
    "&::after": {
      content: "''",
      position: "absolute",
      top: "-56px",
      right: "-58px",
      width: "64px",
      height: "58px",
      borderRadius: "0px 40px",
      transform: "matrix(-1, 0, 0, 1, 0, 0)",
      backgroundColor: "#2B9C03",
    },
  });

  export const Shadow = styled(Box, {
    shouldForwardProp: (prop) => prop !== "leafCount",
  })<{ leafCount: number }>(({ leafCount }) => ({
    position: "absolute",
    left: "260px",
    top: `calc(210px + ${100 * leafCount}px)`,
    width: "276px",
    height: "15px",
    backgroundColor: "#e6e6e6",
    borderRadius: "100%",

    "&::after": {
      content: "''",
      width: "60%",
      height: "60%",
      backgroundColor: "#D5D5D5",
      borderRadius: "50%",
      position: "absolute",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
    },
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

    height: "35px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  }));

  export const ButtonsBar = styled(Box)({});

  export const InvisibleBox = styled(Box)({
    display: "none",
  });

  export const ViewBtn = styled(Button)({
    padding: ".2rem 2rem",
    fontSize: ".7rem",
  });

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
    color: theme.palette.text.secondary,
    opacity: theme.palette.shadeOpacity,
    position: "absolute",
    top: "-28px",
    [placement]: "-10px",
  }));

  export const NodataMessage = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "1.2rem",
    color: theme.palette.text.secondaryLight,
    fontWeight: "500",
  }));
}

export default S;
