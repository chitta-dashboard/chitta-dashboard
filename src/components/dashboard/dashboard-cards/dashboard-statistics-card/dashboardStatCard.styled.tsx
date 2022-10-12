import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";

export namespace S {
  export const StatCardWrapper = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1.5rem 1.5rem",
    backgroundColor: theme.palette.bg.main,
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
    borderRadius: "1.25rem",
    [theme.breakpoints.up("xl")]: {
      minHeight: "25rem",
      padding: "2.5rem",
    },
  }));

  export const StatBodyContainer = styled(Grid)({
    width: "100%",
  });

  export const StatBody = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "0.7rem 0",
  });

  export const StatBodyFont = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.9rem",
    fontWeight: "400",
    color: theme.palette.text.secondaryLight,
  }));

  export const StatBodyNumberFont = styled(Typography)(({ theme }: any) => ({
    fontSize: "1.4rem",
    fontWeight: "500",
    color: theme.palette.text.secondary,
    marginTop: "0.3rem",
  }));

  export const Span = styled("span")({
    fontSize: "1.1rem",
  });
}

export default S;
