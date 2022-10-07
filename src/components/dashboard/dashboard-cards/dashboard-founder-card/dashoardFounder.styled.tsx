import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";

export namespace S {
  export const FounderWrapper = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    // gap: "2rem",
    padding: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "1.25rem",
    [theme.breakpoints.up("xl")]: {
      minHeight: "15vh",
      padding: "2.5rem",
    },
    [theme.breakpoints.down("lg")]: {
      minHeight: "10vh",
    },
    ".slick-prev": {
      top: "96%",
      left: "25%",
      zIndex: "3",
      width: "35px",
      height: "35px",
      transform: "rotate(-180deg)",
      background: "white",
      borderRadius: "50%",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.primary,
        fontSize: "20px",
      },
    },
    ".slick-next": {
      top: "103%",
      right: "25%",
      width: "35px",
      height: "35px",
      zIndex: "3",
      background: "white",
      borderRadius: "50%",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.primary,
        fontSize: "20px",
      },
    },
    a: {
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
    ".slick-dots": {
      bottom: "-15px",
      button: {
        "&:before": {
          fontSize: "10px",
        },
      },
      ".slick-active": {
        button: {
          "&:before": {
            color: theme.palette.text.primary,
          },
        },
      },
    },
  }));

  export const FounderCard = styled(Box)(({ theme }: any) => ({
    width: "100% !important",
    height: "250px !important",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: "#fff",
    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    // border:"1px solid red",
    borderRadius: "1.25rem",
    padding: "1rem 0.2rem",
    [theme.breakpoints.down("lg")]: {
      // width: "70% !important",
      margin: "0 auto",
    },
  }));

  export const FounderCardContainer = styled(Box)(({ theme }: any) => ({
    width: "calc(100% - 10rem)",
    // height: "250px !important",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: "#fff",
    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    // border:"1px solid red",
    borderRadius: "1.25rem",
    paddingLeft: "2rem",
    [theme.breakpoints.down("lg")]: {
      // width: "70% !important",
      margin: "0 auto",
    },
  }));

  export const FounderCardHeader = styled(Box)(({ theme }: any) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "1rem",
    paddingBottom: "1rem",
  }));

  export const FounderCardHeaderRight = styled(Box)(({ theme }: any) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid",
    borderColor: "rgba(104, 104, 104, 0.1)",
  }));

  export const FounderImg = styled("img")(({ theme }: any) => ({
    width: "10rem",
    height: "10rem",
    borderRadius: "10%",
    // border: "1px solid red",
    float: "left",
  }));

  export const FounderCardHeaderDetails = styled(Box)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    paddingTop: "0.5rem",
    width: "30%",
  }));

  export const FounderName = styled(Typography)(({ theme }: any) => ({
    fontSize: "1.2rem",
    fontWeight: "500",
    color: theme.palette.text.primary,
    whiteSpace: "nowrap",
  }));

  export const FounderAge = styled(Typography)(({ theme }: any) => ({
    fontSize: "1.1rem",
    fontWeight: "500",
    color: theme.palette.text.secondaryLight,
  }));

  export const FounderJoinDate = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.8rem",
    fontWeight: "500",
    opacity: "0.8",
    color: theme.palette.text.secondaryLight,
  }));

  export const FounderCardBody = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    //  padding: "0 2rem",
    width: "50%",
    color: theme.palette.text.secondary,
    div: {
      flex: "1 !important",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    "div:nth-of-type(1)": {
      alignItems: "flex-start",
    },
  }));

  export const FounderCardBodyLeft = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.9rem",
    fontWeight: "500",
    margin: "0.3rem 0",
  }));

  export const FounderCardDescContainer = styled(Box)(({ theme }: any) => ({
    color: theme.palette.text.secondary,
    textAlign: "justify",
    p: {
      // textOverflow: "ellipsis",
      // overflow: "hidden",
      // whiteSpace: "nowrap",
      display: "-webkit-box",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": "3",
      overflow: "hidden",
    },
  }));
}

export default S;
