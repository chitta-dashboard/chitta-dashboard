import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";

namespace S {
  export const DashBoardContainer = styled(Box)(({ theme }: any) => ({
    width: "100%",
    height: "100%",
    margin: "0 auto",
    backgroundColor: theme.palette.bg.light,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }));

  export const DashBoardBodyWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  });

  export const DashBoardBottom = styled(Grid)({
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    width: "100%",
    marginBottom: "1rem",
  });

  export const DashBoardStatisticsWrapper = styled(Box)({
    width: "100%",
    display: "grid",
    flexDirection: "row",
    gap: "1rem",
  });
}

export default S;
