import { Box, Grid, styled } from "@mui/material";

export namespace S {
  export const NotificationCardWrapper = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: theme.palette.bg.main,
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
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
    color: theme.palette.primary.light,
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
    padding: "0.5rem",
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "2fr auto",
    color: theme.palette.text.secondaryDark,
  }));

  export const NotifyLeft = styled(Box)(({ theme }: any) => ({
    display: "flex",
    gap: "0.2rem",
    [theme.breakpoints.down("md")]: {
      maxWidth: "70%",
    },
  }));

  export const NotificationDateBox = styled(Box)({
    display: "flex",
    gap: "0.2rem",
  });

  export const NotifyRead = styled(NotificationContent)(({ theme }: any) => ({
    color: theme.palette.text.secondary,
  }));
}

export default S;
