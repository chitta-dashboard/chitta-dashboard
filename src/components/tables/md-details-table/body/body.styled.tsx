import { styled, Stack, TableCell } from "@mui/material";

namespace S {
  export const TabCell = styled(TableCell)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "1rem",
      padding: "0 2rem",
      paddingTop: "1rem",
    },
  }));

  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    fontWeight: 500,

    width: "25%",
    padding: "1rem 0",

    "&:first-of-type": {
      width: "7%",
      textAlign: "center",
    },
    "&:last-of-type": {
      width: "20%",
      padding: "1rem 0",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const Cell = styled(TableCell)<{ title: string }>(({ theme, title }) => ({
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    fontWeight: 500,
    borderBottom: "1rem solid red",
    width: "25%",
    padding: "1rem 0",
    [theme.breakpoints.up("md")]: {
      "&:nth-of-type(5)": {
        width: "32%",
      },
    },

    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      fontSize: "1rem",
      width: "100%",
      padding: "0.8rem",
      position: "relative",
      left: "50%",

      //Create Table head for Tab view
      "&::before": {
        content: `"${title}"`,
        color: theme.palette.text.primary,
        fontSize: "1rem",
        fontWeight: 600,
        position: "absolute",
        left: "-45%",
      },
    },
  }));

  export const NameStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
  }));

  export const IconBox = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));
}

export default S;
