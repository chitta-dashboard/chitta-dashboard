import { Stack, styled } from "@mui/material";

namespace S {
  export const Container = styled(Stack)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: " 0  1.875rem 1.875rem 1.875rem",
    gap: "1rem",
    ".MuiButton-textPrimary": {
      width: "10rem",
    },
    "& .Mui-disabled": {
      // backgroundColor: theme.palette.text.secondaryLight,
      backgroundColor: " #B3B3B3",
    },
  }));
}

export default S;
