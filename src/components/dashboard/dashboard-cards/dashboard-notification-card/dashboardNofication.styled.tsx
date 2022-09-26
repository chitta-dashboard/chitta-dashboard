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
  }));

  export const NotificationContent = styled(Box)(({ theme }: any) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.6rem",
    // [theme.breakpoints.down("md")]: {
    //   justifyContent: "flex-start",
    //   gap: "2rem",
    //   padding: "0 1.5rem",
    // },
  }));

  export const NotifyLeft = styled(Box)(({ theme }: any) => ({
    display: "flex",
    gap: "0.5rem",
    marginLeft: "0.6rem",
    maxWidth: "70%",
  }));

  export const NotificationDateBox = styled(Box)(({ theme }: any) => ({
    display: "flex",
    gap: "0.5rem",
    [theme.breakpoints.down("md")]: {
      marginRight: "2rem",
      marginLeft: "0.5rem",
    },
  }));

  export const NotifyRead = styled(NotificationContent)(({ theme }: any) => ({
    color: LightTheme.palette.text.secondary,
  }));
}

export default S;
