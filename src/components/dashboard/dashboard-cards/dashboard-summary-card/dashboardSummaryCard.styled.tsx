import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import { LightTheme } from "../../../../utils/theme";

export namespace S {
  export const SummaryCardWrapper = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    padding: "1.5rem 1.5rem",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "1.25rem",
  }));

  export const SummaryHeader = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    color: LightTheme.palette.primary.light,
    fontWeight: "500",
    fontSize: "1.1rem",
    marginBottom: "0.3rem",
  }));
}

export default S;