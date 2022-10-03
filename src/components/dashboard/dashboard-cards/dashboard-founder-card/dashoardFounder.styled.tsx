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
      minHeight: "25rem",
      padding: "2.5rem",
    },
    [theme.breakpoints.down("lg")]: {
      minHeight: "20rem",
    },
  }));

  export const FounderCard = styled(Box)(({ theme }: any) => ({
    width: "100%",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "1.25rem",
    padding: "1rem 2rem",
    [theme.breakpoints.down("lg")]: {
      width: "70%",
      margin: "0 auto",
    },
  }));

  export const FounderCardHeader = styled(Box)(({ theme }: any) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid",
    borderColor: "rgba(104, 104, 104, 0.1)",
  }));

   export const FounderImg = styled("img")(({ theme }: any) => ({
     width: "6rem",
     height: "6rem",
     borderRadius: "50%"
   }));

  export const FounderCardHeaderDetails = styled(Box)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    paddingTop: "0.5rem"
  }));

   export const FounderName = styled(Typography)(({ theme }: any) => ({
     fontSize: "1.2rem",
     fontWeight: "500",
     color: theme.palette.text.primary
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
     padding: "0 2rem",
     color: theme.palette.text.secondary,
   }));

    export const FounderCardBodyLeft = styled(Typography)(({ theme }: any) => ({
      fontSize: "0.9rem",
      fontWeight: "500"
    }));
}

export default S;
