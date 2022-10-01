import { Stack, styled } from "@mui/material";

namespace S {
  export const Container = styled(Stack)(({ theme }) => ({
    display: "flex",
    justtifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
    padding: "2rem 1.875rem 0 1.875rem",
  }));
}
export default S;
