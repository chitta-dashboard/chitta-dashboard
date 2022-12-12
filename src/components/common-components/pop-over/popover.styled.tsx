import { Popover, styled } from "@mui/material";

namespace S {
  export const Pop = styled(Popover)({
    margin: "0.5rem  -0.5rem",
  });

  export const Option = styled("p")<{ select: boolean }>(({ theme, select }) => ({
    cursor: "pointer",
    textAlign: "center",
    padding: "0.5rem 2rem",
    borderBottom: `0.1rem solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,
    color: select ? theme.palette.text.secondaryDark : theme.palette.text.secondaryLight,
    backgroundColor: select ? theme.palette.bg.light : "",
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
      color: theme.palette.text.secondaryDark,
    },
  }));
}

export default S;
