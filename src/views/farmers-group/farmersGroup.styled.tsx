import { Box, Popover, styled, Typography } from "@mui/material";

namespace S {
  export const FarmersGroupContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    [theme.breakpoints.down("md")]: {
      gap: "1rem",
    },
  }));

  export const Pop = styled(Popover)({
    margin: "0.5rem  -0.2rem",
  });

  export const PopItems = styled(Typography)<{ selectfilter: number }>(({ theme, selectfilter }) => ({
    cursor: "pointer",
    textAlign: "center",
    padding: "0.6rem 1rem",
    borderBottom: `0.1rem solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,
    color: selectfilter ? theme.palette.text.secondaryDark : theme.palette.text.secondaryLight,
    backgroundColor: selectfilter ? theme.palette.bg.light : "",
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
      color: theme.palette.text.secondaryDark,
    },
  }));
}

export default S;
