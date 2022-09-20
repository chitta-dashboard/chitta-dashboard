import { styled, Stack, Button } from "@mui/material";

namespace S {
  export const RightSectionContainer = styled(Stack)(({ theme }) => ({
    width: "100%",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "end",

    // [theme.breakpoints.down("md")]: {},
  }));
  export const CustomButton = styled(Button)(({ theme }) => ({
    width: "15%",
  }));
}
export default S;
