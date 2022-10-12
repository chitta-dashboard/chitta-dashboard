import { styled, Stack, TableCell, TableRow } from "@mui/material";

namespace S {
  export const Row = styled(TableRow)<{ select: number }>(({ theme, select }) => ({
    backgroundColor: select ? theme.palette.bg.light : "",
  }));

  export const TabCell = styled(TableCell)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
    },
  }));

  export const NameStack = styled(Stack)({
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
  });

  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: "center",
    "&:last-of-type": {
      width: "12%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const Cell = styled(TableCell)<{ title: string; ismember?: number }>(({ theme, title, ismember }) => ({
    "&:nth-of-type(2)": {
      color: ismember && theme.palette.text.primary,
    },
    [theme.breakpoints.up("md")]: {
      "&:nth-of-type(2)": {
        paddingLeft: "1.25rem",
      },
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      width: "48%",
      position: "relative",
      left: "50%",
      //Create Table head for Tab view
      "&::before": {
        content: `"${title}"`,
        position: "absolute",
        left: "-90%",
      },
    },
  }));

  export const Icon = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    "& > p": {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("md")]: {
      alignItems: "end",
    },
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

  export const EmptyMsg = styled("tbody")(({ theme }) => ({
    position: "relative",
    "> tr > td": {
      color: theme.palette.text.secondaryLight,
      fontSize: "1.2rem",
      textAlign: "center",
      fontWeight: "500",
      padding: "3rem 0",
      translate: "transform(-50%, -50%)",
    },
  }));
}

export default S;
