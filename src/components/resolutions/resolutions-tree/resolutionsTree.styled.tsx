import { Box, Button, IconButton, Theme, Typography } from "@mui/material";
import styled from "@emotion/styled/macro";
import { BRANCH_DURATION, growX, growY, LEAF_DURATION, popIn, slideUp, STEM_DURATION, TOTAL_DURATION } from "./animation.styled";

namespace S {
  export const ResolutionsTreeBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "leafCount",
  })<{ theme?: Theme; leafCount: number }>(({ theme, leafCount }) => ({
    minWidth: "790px",
    position: "relative",
    height: `calc(230px + ${100 * leafCount}px)`,
    margin: "auto 0 15px 0",
    [theme.breakpoints.down("md")]: {
      transform: "scale(.8)",
    },
  }));

  export const LeafContent = styled(Box)<{ theme?: Theme; leafCount: number }>(({ theme, leafCount }) => ({
    backgroundColor: theme.palette.addAlpha(theme.palette.bg.main, 1),
    width: "100%",
    height: "100%",

    ".content": {
      position: "absolute",
      height: "100%",
      width: "100%",
      top: "0",
      left: "0",
      padding: "6px", //10px to overlap border & 6px for actual padding
      animation: `${popIn} ${LEAF_DURATION}s linear both`,
    },
  }));

  const LeafStyles = styled(Box)<{ theme?: Theme; leafCount: number }>(({ theme }) => ({
    width: "265px",
    height: "150px",
    position: "absolute",
    textAlign: "center",
    border: "transparent 11px solid",
    zIndex: "2",
    backgroundColor: theme.palette.bg.main,

    ".branch": {
      display: "inline-block",
      position: "absolute",
      width: "160px",
      height: "11px",
      borderRadius: "20px",
      bottom: "10px",
      "&::before": {
        animation: `${growX} ${BRANCH_DURATION}s linear backwards`,
      },
    },
    ".stem": {
      display: "inline-block",
      position: "absolute",
      width: "12px", //1px extra
      height: "90px",
      bottom: "-148px",
      "&::before": {
        transformOrigin: "bottom",
        animation: `${growY} ${STEM_DURATION}s linear backwards`,
      },
    },
    ".branch::before, .stem::before": {
      content: "''",
      width: "100%",
      height: "100%",
      borderRadius: "inherit",
      position: "absolute",
      top: "0",
      left: "0",
    },
    ".leaf": {
      width: "calc(100% + 22px)",
      height: "calc(100% + 22px)",
      display: "block",
      overflow: "hidden",
      position: "absolute",
      left: "-11px",
      bottom: "-11px",
      borderRadius: "inherit",
      zIndex: "-1",

      "&::before": {
        content: "''",
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        animation: `${growX} ${LEAF_DURATION}s ease-out both`,
      },
    },
  }));

  export const L1 = styled(LeafStyles)<{ theme?: Theme }>(({ theme, leafCount }) => ({
    top: "18px",
    left: "0",
    borderRadius: "0 63px 20px 63px",
    // borderColor: theme.palette.tree.l1,
    ".branch": {
      transform: "rotate(30deg)",
      transformOrigin: "left",
      left: "calc(265px - 17px)", //17px to cope border with and border radius
      "&::before": {
        transformOrigin: "right",
        animationDelay: `${(leafCount - 1) * TOTAL_DURATION + STEM_DURATION}s`,
      },
    },
    ".stem": {
      borderRadius: "40px 40px 80px 0px",
      left: "calc((265px - 17px) + 130px)", //15px to cope border with and border radius
      "&::before": {
        animationDelay: `${(leafCount - 1) * TOTAL_DURATION}s`,
      },
    },
    ".branch::before, .stem::before, .leaf::before": {
      backgroundColor: theme.palette.tree.l1,
    },
    ".leaf": {
      "&::before": {
        transformOrigin: "right",
        animationDelay: `${(leafCount - 1) * TOTAL_DURATION + STEM_DURATION + BRANCH_DURATION}s`,
      },
    },
    [`${LeafContent}`]: {
      borderRadius: "0 53px 10px 53px",
      ".content": {
        animationDelay: `${leafCount * TOTAL_DURATION}s`,
      },
    },
    [`${ResolutionsTimestamp}`]: {
      animationDelay: `${leafCount * TOTAL_DURATION}s`,
    },
  }));

  export const L2 = styled(LeafStyles)<{ theme?: Theme }>(({ theme, leafCount }) => ({
    top: "218px",
    left: "0",
    borderRadius: "0 63px 20px 63px",
    // borderColor: theme.palette.tree.l2,
    ".branch": {
      transform: "rotate(30deg)",
      transformOrigin: "left",
      left: "calc(265px - 17px)", //17px to cope border with and border radius
      "&::before": {
        transformOrigin: "right",
        animationDelay: `${(leafCount - 3) * TOTAL_DURATION + STEM_DURATION}s`,
      },
    },
    ".stem": {
      borderRadius: "40px 40px 80px 0px",
      left: "calc((265px - 17px) + 130px)", //15px to cope border with and border radius
      "&::before": {
        animationDelay: `${(leafCount - 3) * TOTAL_DURATION}s`,
      },
    },
    ".branch::before, .stem::before, .leaf::before": {
      backgroundColor: theme.palette.tree.l2,
    },
    ".leaf": {
      "&::before": {
        transformOrigin: "right",
        animationDelay: `${(leafCount - 3) * TOTAL_DURATION + STEM_DURATION + BRANCH_DURATION}s`,
      },
    },
    [`${LeafContent}`]: {
      borderRadius: "0 53px 10px 53px",
      ".content": {
        animationDelay: `${(leafCount - 2) * TOTAL_DURATION}s`,
      },
    },
    [`${ResolutionsTimestamp}`]: {
      animationDelay: `${(leafCount - 2) * TOTAL_DURATION}s`,
    },
  }));

  export const R1 = styled(LeafStyles)<{ theme?: Theme }>(({ theme, leafCount }) => ({
    top: "118px",
    right: "0",
    borderRadius: "63px 0 63px 20px",
    // borderColor: theme.palette.tree.r1,
    ".branch": {
      transform: "rotate(-30deg)",
      transformOrigin: "right",
      right: "calc(265px - 17px)", //17px to cope border with and border radius
      "&::before": {
        transformOrigin: "left",
        animationDelay: `${(leafCount - 2) * TOTAL_DURATION + STEM_DURATION}s`,
      },
    },
    ".stem": {
      borderRadius: "40px 40px 0px 80px",
      right: "calc((265px - 17px) + 130px)", //15px to cope border with and border radius
      "&::before": {
        animationDelay: `${(leafCount - 2) * TOTAL_DURATION}s`,
      },
    },
    ".branch::before, .stem::before, .leaf::before": {
      backgroundColor: theme.palette.tree.r1,
    },
    ".leaf": {
      "&::before": {
        transformOrigin: "left",
        animationDelay: `${(leafCount - 2) * TOTAL_DURATION + STEM_DURATION + BRANCH_DURATION}s`,
      },
    },
    [`${LeafContent}`]: {
      borderRadius: "53px 0 53px 10px",
      ".content": {
        animationDelay: `${(leafCount - 1) * TOTAL_DURATION}s`,
      },
    },
    [`${ResolutionsTimestamp}`]: {
      animationDelay: `${(leafCount - 1) * TOTAL_DURATION}s`,
    },
  }));

  export const R2 = styled(LeafStyles)<{ theme?: Theme }>(({ theme, leafCount }) => ({
    top: "318px",
    right: "0",
    borderRadius: "63px 0 63px 20px",
    // borderColor: theme.palette.tree.r2,
    ".branch": {
      transform: "rotate(-30deg)",
      transformOrigin: "right",
      right: "calc(265px - 17px)", //17px to cope border with and border radius
      "&::before": {
        transformOrigin: "left",
        animationDelay: `${(leafCount - 4) * TOTAL_DURATION + STEM_DURATION}s`,
      },
    },
    ".stem": {
      borderRadius: "40px 40px 0px 80px",
      right: "calc((265px - 17px) + 130px)", //17px to cope border with and border radius
      "&::before": {
        animationDelay: `${(leafCount - 4) * TOTAL_DURATION}s`,
      },
    },
    ".branch::before, .stem::before, .leaf::before": {
      backgroundColor: theme.palette.tree.r2,
    },
    ".leaf": {
      "&::before": {
        transformOrigin: "left",
        animationDelay: `${(leafCount - 4) * TOTAL_DURATION + STEM_DURATION + BRANCH_DURATION}s`,
      },
    },
    [`${LeafContent}`]: {
      borderRadius: "53px 0 53px 10px",
      ".content": {
        animationDelay: `${(leafCount - 3) * TOTAL_DURATION}s`,
      },
    },
    [`${ResolutionsTimestamp}`]: {
      animationDelay: `${(leafCount - 3) * TOTAL_DURATION}s`,
    },
  }));

  export const Bud = styled(Box)<{ theme?: Theme; leafCount: number }>(({ theme, leafCount }) => ({
    // LEAF STYLING
    position: "absolute",
    top: "105px",
    left: "390px",
    width: "11px",
    height: "100px",
    backgroundColor: theme.palette.tree.bud,
    borderRadius: "0 0 0 80px",
    transformOrigin: "bottom",
    animation: `${growY} ${STEM_DURATION}s linear ${leafCount * TOTAL_DURATION}s backwards`,

    "&::before": {
      content: "''",
      position: "absolute",
      top: "-25px",
      left: "-40px",
      width: "44px",
      height: "35px",
      borderRadius: "0px 40px",
      transform: "matrix(0.71, 0.71, 0.71, -0.71, 0, 0)",
      backgroundColor: theme.palette.tree.bud,
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
      backgroundColor: theme.palette.tree.bud,
    },
    img: {
      position: "absolute",
      top: "-40px",
      left: "-34px",
      zIndex: 1,
    },
  }));

  export const Shadow = styled(Box, {
    shouldForwardProp: (prop) => prop !== "leafCount",
  })<{ theme?: Theme; leafCount: number }>(({ theme, leafCount }) => ({
    position: "absolute",
    left: "260px",
    top: `calc(210px + ${100 * leafCount}px)`,
    width: "276px",
    height: "15px",
    backgroundColor: theme.palette.addAlpha(theme.palette.tree.shadow, 0.3),
    borderRadius: "100%",

    "&::after": {
      content: "''",
      width: "60%",
      height: "60%",
      backgroundColor: theme.palette.addAlpha(theme.palette.tree.shadow, 0.2),
      borderRadius: "50%",
      position: "absolute",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
    },
  }));

  export const ResolutionTitle = styled(Typography)<{ theme?: Theme }>(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "10px",
  }));

  export const ResolutionDescription = styled(Typography)<{ theme?: Theme }>(({ theme }) => ({
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

  export const DownloadBtn = styled(IconButton)<{ theme?: Theme }>(({ theme }) => ({
    width: "1.7rem",
    height: "1.7rem",
    fontSize: "1rem",
    marginLeft: "15px",
    color: theme.palette.text.white,
    "&.MuiButtonBase-root": {
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.addAlpha(theme.palette.primary.light, 0.75),
      },
    },
  }));

  export const ResolutionsTimestamp = styled(ResolutionDescription, { shouldForwardProp: (prop) => prop !== "placement" })<{
    placement: "left" | "right";
    theme?: Theme;
  }>(({ theme, placement }) => ({
    color: theme.palette.addAlpha(theme.palette.text.secondary, 0.8),

    position: "absolute",
    top: "-28px",
    [placement]: "-10px",
    animation: `${slideUp} ${LEAF_DURATION}s linear both`,
  }));

  export const NodataMessage = styled(Typography)<{ theme?: Theme }>(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "1.2rem",
    color: theme.palette.text.secondaryLight,
    fontWeight: "500",
  }));
}

export default S;
