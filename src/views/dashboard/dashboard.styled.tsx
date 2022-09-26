import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";

namespace S {
  export const DashBoaderContainer = styled(Box)(({ theme }: any) => ({
    width: "100%",
    height: "100%",
    margin: "0 auto",
    backgroundColor: "#DEEFE9",
  }));

  export const DashBoaderBodyWrapper = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
    width: "100%",
    marginTop: "4rem",
  }));
}

export default S;
