import { Stack, styled, Box, TableCell } from "@mui/material";

namespace S {
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
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    "&:last-of-type": {
      width: "16%",
    },
  }));

  export const Cell = styled(TableCell)<{ title: string }>(({ theme, title }) => ({
    [theme.breakpoints.up("md")]: {
      "&:nth-of-type(2)": {
        paddingLeft: "1.25rem",
      },
      "&:nth-of-type(3)": {
        width: "15%",
      },
      "&:nth-of-type(4)": {
        width: "16%",
      },
      [theme.breakpoints.down("lg")]: {
        "&:nth-of-type(5)": {
          width: "20%",
        },
      },
    },

    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      position: "relative",
      left: "50%",
      //Create Table Title for Tablet view
      "&::before": {
        content: `"${title}"`,
        position: "absolute",
        left: "-45%",
      },
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

  export const AvatarImg = styled("img")({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  });

  export const AvatarBox = styled(Box)({
    borderRadius: "50%",
    height: "2.5rem",
    width: "2.5rem",
    position: "relative",
    cursor: "pointer",
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

  export const HiddenInput = styled("input")({
    display: "none",
  });
}

export default S;
