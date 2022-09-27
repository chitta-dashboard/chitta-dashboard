import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { LightTheme } from "../../../../utils/theme";

export namespace S {
  export const StatCardWrapper = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1.5rem 1.5rem",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "1.25rem",
    [theme.breakpoints.up("xl")]: {
      minHeight: "25rem",
      padding: "2.5rem",
    },
  }));

  export const StatBodyContainer = styled(Grid)(({ theme }: any) => ({
    width: "100%",
  }));

  export const StatBody = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "0.7rem 0",
  }));

  export const StatBodyFont = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.9rem",
    fontWeight: "400",
    color: LightTheme.palette.text.secondaryLight,
  }));

  export const StatBodyNumberFont = styled(Typography)(({ theme }: any) => ({
    fontSize: "1.4rem",
    fontWeight: "500",
    color: LightTheme.palette.text.secondary,
    marginTop: "0.3rem",
  }));

  export const Span = styled("span")(({ theme }: any) => ({
    fontSize: "1.1rem",
  }));
}

export default S;
