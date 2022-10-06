import { Stack, styled } from "@mui/material";

namespace S {
  export const Container = styled(Stack)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.875rem",
    gap: "1rem",

    ".MuiButton-textPrimary": {
      width: "10rem",
    },
  }));
}

export default S;
