import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";

namespace S {
  export const DashBoaderContainer = styled(Box)(({ theme }: any) => ({
    width: "100%",
    height: "92%",
    margin: "0 auto",
    backgroundColor: "#DEEFE9",
    [theme.breakpoints.up("xl")]: {
      width: "calc(100% - 15rem)",
    },
  }));

  export const DashBoaderBodyWrapper = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    width: "100%",
    marginTop: "4rem",
  }));
}

export default S;
