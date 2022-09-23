import { Box, Grid, styled } from "@mui/material";
import { LightTheme } from "../../../../utils/theme";

export namespace S {
  export const NotificationCardWrapper = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "1.25rem",
    [theme.breakpoints.up("xl")]: {
      padding: "1.2rem",
    },
  }));

  export const NotificationHeader = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    padding: "1.5rem 1.5rem 1.5rem",
    width: "100%",
    color: LightTheme.palette.primary.light,
    fontWeight: "500",
    fontSize: "1.1rem",
    height: "3.5rem",
  }));

  export const NotificationBody = styled(Box)(({ theme }: any) => ({
    fontSize: "0.8rem",
    margin: "-0.4rem 0 0.5rem 0",
    padding: "0 0.6rem 2rem 0.6rem",
    fontWeight: "500",
    width: "100%",
    maxHeight: "245px",
    overflowY: "hidden",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.85rem",
    },
    // [theme.breakpoints.up("xl")]: {
    //   fontSize: "1rem",
    // },
  }));

  export const NotificationContent = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "0.5rem",
    // [theme.breakpoints.up("md")]: {
    //   gap: "1rem",
    // },
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
      gap: "2rem",
      padding: "0 1.5rem",
    },
    // [theme.breakpoints.up("xl")]: {
    //   justifyContent: "flex-start",
    //   paddingLeft: "1rem",
    // },
  }));

  export const NotificationDateBox = styled(Box)(({ theme }: any) => ({
    display: "flex",
    gap: "0.7rem",
    marginBottom: "0.6rem",
    // [theme.breakpoints.down("md")]: {
    //   gap: "0.7rem",
    // },
    // [theme.breakpoints.up("md")]: {
    //   gap: "0.5rem",
    // },
    // [theme.breakpoints.up("xl")]: {
    //   marginLeft: "3rem",
    //   gap: "0.3rem",
    // },
  }));

  export const NotifyRead = styled(NotificationContent)(({ theme }: any) => ({
    color: LightTheme.palette.text.secondary,
  }));
}

export default S;
