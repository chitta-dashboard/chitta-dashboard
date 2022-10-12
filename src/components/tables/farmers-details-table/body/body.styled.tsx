import { styled, Stack, TableCell, Box } from "@mui/material";

namespace S {
  export const RowCheckCell = styled(TableCell)(({ theme }) => ({
    width: "5%",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const TabCheckboxStack = styled(Stack)({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "15%",
  });

  export const TabCell = styled(TableCell)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "0 2rem",
    },
  }));

  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    [theme.breakpoints.down("xl")]: {
      "&:nth-of-type(2)": {
        width: "12%",
      },
      "&:last-of-type": {
        width: "15%",
      },
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const Cell = styled(TableCell)<{ title: string }>(({ theme, title }) => ({
    [theme.breakpoints.down("xl")]: {
      "&:nth-of-type(6)": {
        width: "14%",
      },
      "&:nth-of-type(7)": {
        width: "15%",
      },
      "&:nth-of-type(8)": {
        width: "15%",
      },
    },
    [theme.breakpoints.up("md")]: {
      "&:nth-of-type(5)": {
        display: "none",
      },
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      width: "100% !important",
      position: "relative",
      left: "50%",
      //Table head for Tab view
      "&::before": {
        content: `"${title}"`,
        position: "absolute",
        left: "-45%",
      },
    },
  }));

  export const NameStack = styled(Stack)({
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
  });

  export const IconBox = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const AvatarImg = styled("img")({
    width: "100%",
  });

  export const AvatarBox = styled(Box)({
    borderRadius: "50%",
    height: "2.5rem",
    width: "2.5rem",
    minWidth: "2.5rem",
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    "&:hover > .MuiBox-root": {
      display: "flex",
    },
  });

  export const EditBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    background: theme.palette.bg.light,
    borderRadius: "50%",
    opacity: "0.8",
    border: "none",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
  }));

  export const EditIcon = styled("i")(({ theme }) => ({
    color: theme.palette.text.primary,
    opacity: "1",
  }));

  export const HiddenInput = styled("input")({
    display: "none",
  });

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
