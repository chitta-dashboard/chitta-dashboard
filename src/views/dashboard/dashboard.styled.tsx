import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";

namespace S {
  export const DashBoardContainer = styled(Box)(({ theme }: any) => ({
    width: "100%",
    height: "100%",
    margin: "0 auto",
    backgroundColor: "#DEEFE9",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }));

  export const DashBoardBodyWrapper = styled(Box)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    // overflowY: "auto",
  }));

  export const DashBoardBottom = styled(Grid)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    width: "100%",
  }));

  export const DashBoardStatisticsWrapper = styled(Box)(({ theme }: any) => ({
    width: "100%",
    display: "grid",
    flexDirection: "row",
    gap: "1rem",
    //gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  }));
}

export default S;
