import { styled, Stack, Button } from "@mui/material";

namespace S {
  export const RightSectionContainer = styled(Stack)(({ theme }) => ({
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1rem",
    [theme.breakpoints.down("lg")]: {
      justifyContent: "space-between",
    },

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
    },
  }));

  export const DropdownStack = styled(Stack)(({ theme }) => ({
    "& MuiInputBase-root": {
      width: "100%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "52%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));

  export const CustomButton = styled(Button)(({ theme }) => ({
    minWidth: "10%",
    [theme.breakpoints.down("md")]: {
      padding: "0.4rem 2.5rem",
    },
  }));

  export const ButtonStack = styled(Stack)({
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
  });
}
export default S;
