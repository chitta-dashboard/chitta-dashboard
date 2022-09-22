import { styled, Stack, Button } from "@mui/material";

namespace S {
  export const RightSectionContainer = styled(Stack)(({ theme }) => ({
    width: "100%",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "end",
  }));
  export const CustomButton = styled(Button)(({ theme }) => ({
    minWidth: "7rem",
  }));
  export const ButtonStack = styled(Stack)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
  }));
}
export default S;
