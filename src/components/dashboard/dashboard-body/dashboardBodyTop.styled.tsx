import styled from "@emotion/styled";
import { Box } from "@mui/material";

export namespace S {
  export const StasticsCardContainer = styled(Box)(({ theme }: any) => ({
    width: "calc(100% - 8.4rem)",
    maxWidth: "100vw",
    height: "130px !important",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      width: "calc(100% - 4rem)",
    },
    ".slick-slide": {
      maxWidth: "calc(278px + 1rem) !important",
    },
    ".slick-prev": {
      top: "32% !important",
      left: "-1%",
      zIndex: "3",
      width: "50px",
      height: "50px",
      transform: "rotate(-180deg)",
      background: theme.palette.bg.main,
      borderRadius: "50%",
      boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.primary,
        fontSize: "30px",
      },
    },
    ".slick-next": {
      right: "-1%",
      top: "50% !important",
      width: "50px",
      height: "50px",
      background: theme.palette.bg.main,
      borderRadius: "50%",
      boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
      zIndex: "3",
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.primary,
        fontSize: "30px",
      },
    },
    ".slick-dots": {
      bottom: "-50px",
    },
  }));

  export const StasticsCard = styled(Box)(({ theme }: any) => ({
    height: "130px !important",
    width: "278px !important",
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
    padding: "0.5rem 1.3rem",
    background: theme.palette.bg.main,
    borderRadius: "20px",
    display: "flex !important",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "0.8rem",
    [theme.breakpoints.down("xl")]: {
      height: "130px !important",
      width: "200px !important",
      padding: "1rem",
      gap: "0.5rem",
    },
  }));

  export const StatCardHeader = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  export const StatCardHeaderLeft = styled(Box)({
    display: "flex",
    alignItems: "center",
  });

  export const StatCardHeaderRight = styled(Box)({
    display: "flex",
    alignItems: "center",
  });

  export const StatCardBody = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "2.1rem !important",
    fontWeight: "500",
    margin: "0 0.5rem",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("xl")]: {
      fontSize: "1rem !important",
    },
  }));

  export const StatCardFooter = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.1rem",
    fontWeight: "500",
    color: theme.palette.text.secondaryLight,
    [theme.breakpoints.down("xl")]: {
      fontSize: "0.9rem",
    },
  }));

  export const StatCardIcon = styled("div")(({ theme }: any) => ({
    i: {
      fontSize: "2.6rem",
      [theme.breakpoints.down("xl")]: {
        fontSize: "2.3rem",
      },
    },
  }));

  export const StatCardHeaderCount = styled(Box, {
    shouldForwardProp: (prop) => prop !== "neg",
  })(({ theme, neg }: any) => ({
    width: "4rem",
    height: "1.5rem",
    background: neg ? theme.palette.addAlpha(theme.palette.text.red, 0.1) : theme.palette.bg.light,
    fontSize: "0.8rem",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.3rem",
    color: neg ? "red" : theme.palette.text.primary,
    [theme.breakpoints.down("xl")]: {
      height: "1.2rem",
      width: "3.5rem",
      fontSize: "0.7rem",
    },
  }));
}

export default S;
