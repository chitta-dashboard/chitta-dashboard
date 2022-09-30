import { styled, Stack, Button, Typography } from "@mui/material";

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
    backgroundColor: theme.palette.primary.light,
  }));
  export const CustomSpan = styled("span")(({ theme }) => ({
    padding: "0.8rem 0",
  }));
  export const PopoverText = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    padding: "0.625rem 0.9375rem",
    border: "1px solid #6868681A",
    color: "#686868",
    lineHeight: "24px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#DEEFE9",
      color: "#1E1E1E",
    },
  }));
}
export default S;
