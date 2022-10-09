import { styled, Stack } from "@mui/material";

namespace S {
  export const PageHeaderContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap: "1rem",
    },
  }));
}
export default S;
