import { styled, Stack } from "@mui/material";
namespace S {
  export const LeftSectionContainer = styled(Stack)(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      justifyContent: "space-between",
    },
    "& .MuiPaper-root": {
      width: "75%",
      [theme.breakpoints.down("lg")]: {
        width: "50%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  }));
}

export default S;
