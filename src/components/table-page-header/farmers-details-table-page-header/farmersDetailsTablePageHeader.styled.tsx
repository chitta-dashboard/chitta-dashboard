import { styled, Stack } from "@mui/material";

namespace S {
  export const PageHeaderContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      gap: "1rem",
    },
  }));
}
export default S;
