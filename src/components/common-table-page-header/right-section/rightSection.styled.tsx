import { styled, Stack, Button } from "@mui/material";

namespace S {
  export const RightSectionContainer = styled(Stack)({
    width: "100%",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "end",
  });

  export const CustomButton = styled(Button)(({ theme }) => ({
    minWidth: "7rem",
    backgroundColor: theme.palette.primary.light,
  }));
}
export default S;
