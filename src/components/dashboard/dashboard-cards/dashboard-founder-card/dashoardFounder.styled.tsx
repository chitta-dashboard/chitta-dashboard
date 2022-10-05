import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";

export namespace S {
  export const FounderWrapper = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "1.5rem",
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
      top: "41%",
      left: "-4%",
      zIndex: 5,
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
      right: "-4%",
      width: "35px",
      height: "35px",
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
  }));

  export const FounderCard = styled(Box)(({ theme }: any) => ({
    width: "100% !important",
    height: "250px !important",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    // border:"1px solid red",
    borderRadius: "1.25rem",
    padding: "1rem 2rem",
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
    borderBottom: "1px solid",
    borderColor: "rgba(104, 104, 104, 0.1)",
  }));

  export const FounderImg = styled("img")(({ theme }: any) => ({
    width: "6rem",
    height: "6rem",
    borderRadius: "50%",
  }));

  export const FounderCardHeaderDetails = styled(Box)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    paddingTop: "0.5rem",
  }));

  export const FounderName = styled(Typography)(({ theme }: any) => ({
    fontSize: "1.2rem",
    fontWeight: "500",
    color: theme.palette.text.primary,
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
    color: theme.palette.text.secondary,
  }));

  export const FounderCardBodyLeft = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.9rem",
    fontWeight: "500",
  }));
}

export default S;
