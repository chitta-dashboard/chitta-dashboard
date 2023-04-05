import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";

export namespace S {
  export const SummaryCardWrapper = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    padding: "1.5rem",
    backgroundColor: theme.palette.bg.main,
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
    borderRadius: "1.25rem",
    [theme.breakpoints.up("xl")]: {
      padding: "2.5rem",
    },
  }));
}

export default S;
