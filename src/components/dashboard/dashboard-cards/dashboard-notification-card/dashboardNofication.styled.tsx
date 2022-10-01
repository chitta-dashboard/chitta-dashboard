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
    [theme.breakpoints.down("md")]: {
      marginBottom: "2rem",
    },
  }));

  export const NotificationHeader = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    padding: "1.5rem 1.5rem 1.5rem",
    width: "100%",
    color: LightTheme.palette.primary.light,
    fontWeight: "600",
    fontSize: "1.2rem",
    height: "3.5rem",
  }));

  export const NotificationBody = styled(Box)(({ theme }: any) => ({
    fontSize: "0.85rem",
    margin: "-0.4rem 0 0.5rem 0",
    padding: "0 0.4rem 1rem 0.4rem",
    fontWeight: "500",
    width: "100%",
    maxHeight: "19.8rem",
    overflowY: "auto",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.85rem",
      padding: "0 3rem 1rem 2rem",
    },
  }));

  export const NotificationContent = styled(Box)(({ theme }: any) => ({
    width: "100%",
    // display: "flex",
    // justifyContent: "space-between",
    // marginBottom: "0.6rem",
    padding: "0.5rem",
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "2fr auto",
    color: LightTheme.palette.text.secondaryDark,
  }));

  export const NotifyLeft = styled(Box)(({ theme }: any) => ({
    display: "flex",
    gap: "0.2rem",
    [theme.breakpoints.down("md")]: {
      maxWidth: "70%",
      // marginLeft: "1rem",
    },
  }));

  export const NotificationDateBox = styled(Box)(({ theme }: any) => ({
    display: "flex",
    gap: "0.2rem",
    // [theme.breakpoints.down("md")]: {
    //   marginRight: "2rem",
    //   marginLeft: "0.5rem",
    // },
  }));

  export const NotifyRead = styled(NotificationContent)(({ theme }: any) => ({
    color: LightTheme.palette.text.secondary,
  }));
}

export default S;
