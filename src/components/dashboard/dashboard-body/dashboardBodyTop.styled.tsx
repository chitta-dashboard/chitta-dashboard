import styled from "@emotion/styled";
import { Rotate90DegreesCcw } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { LightTheme } from "../../../utils/theme";

export namespace S {
  export const StasticsCardContainer = styled(Box)(({ theme }: any) => ({
    width: "91vw",
    position: "relative",
    ".slick-prev": {
      top: "41%",
      left: "-2%",
      zIndex: 5,
      width: "50px",
      height: "50px",
      transform: "rotate(-180deg)",
      background: "white",
      borderRadius: "50%",
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.primary,
        fontSize: "30px",
      },
    },
    ".slick-next": {
      right: "-2%",
      width: "50px",
      height: "50px",
      background: "white",
      borderRadius: "50%",
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.primary,
        fontSize: "30px",
      },
    },
  }));
  export const StasticsCard = styled(Box)(({ theme }: any) => ({
    height: "230px !important",
    width: "250px !important",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "1.3rem",
    background: "#fff",
    borderRadius: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    margin: "0 5rem",
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
    fontSize: "4.2rem",
    fontWeight: "500",
    color: LightTheme.palette.text.primary,
    [theme.breakpoints.down("xl")]: {
      fontSize: "3.8rem",
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

  export const StatCardIcon = styled("img")(({ theme }: any) => ({
    height: "2.6rem",
    width: "3.1rem",
    [theme.breakpoints.down("xl")]: {
      height: "2.3rem",
      width: "2.8rem",
    },
  }));

  export const StatCardHeaderCount = styled(Box)(({ theme, neg }: any) => ({
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
