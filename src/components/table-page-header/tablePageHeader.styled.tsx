import { styled, Stack } from "@mui/material";

namespace S {
  export const PageHeaderContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1rem",
  }));
}
export default S;
