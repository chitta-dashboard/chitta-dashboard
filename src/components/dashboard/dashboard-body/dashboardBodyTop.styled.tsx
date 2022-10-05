import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { LightTheme } from "../../../utils/theme";

export namespace S {
  export const StasticsCardContainer = styled(Box)(({ theme }: any) => ({
    width: "calc(100% - 8.4rem)",
    maxWidth: "100vw",
    position: "relative",
    ".slick-slide": {
      maxWidth: "calc(250px + 1rem) !important",
    },
    ".slick-prev": {
      top: "105% !important",
      left: "43%",
      zIndex: 5,
      width: "50px",
      height: "50px",
      transform: "rotate(-180deg)",
      background: "white",
      borderRadius: "50%",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      [theme.breakpoints.down("xl")]: {
        left: "35%",
      },
      [theme.breakpoints.down("md")]: {
        left: "30%",
      },
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.primary,
        fontSize: "30px",
      },
    },
    ".slick-next": {
      right: "43%",
      top: "115% !important",
      width: "50px",
      height: "50px",
      background: "white",
      borderRadius: "50%",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      zIndex: "5",
      [theme.breakpoints.down("xl")]: {
        right: "35%",
      },
      [theme.breakpoints.down("md")]: {
        right: "30%",
      },
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
    height: "230px !important",
    width: "250px !important",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "1.3rem",
    background: "#fff",
    borderRadius: "1.25rem",
    display: "flex !important",
    flexDirection: "column",
    justifyContent:"space-between",
    gap: "0.8rem",
    [theme.breakpoints.down("xl")]: {
      height: "200px !important",
      width: "220px !important",
      padding: "1rem",
      gap: "0.5rem",
    },
  }));

  export const StatCardHeader = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }));

  export const StatCardBody = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "2.5rem !important",
    fontWeight: "500",
    color: LightTheme.palette.text.primary,
    [theme.breakpoints.down("xl")]: {
      fontSize: "1rem !important",
    },
  }));

  export const StatCardFooter = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.1rem",
    fontWeight: "500",
    color: LightTheme.palette.text.secondaryLight,
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
    background: neg ? "rgba(255, 0, 0, 0.1)" : LightTheme.palette.custom.backgroundLight,
    fontSize: "0.8rem",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.3rem",
    color: neg ? "red" : LightTheme.palette.text.primary,
    [theme.breakpoints.down("xl")]: {
      height: "1.2rem",
      width: "3.5rem",
      fontSize: "0.7rem",
    },
  }));
}

export default S;
