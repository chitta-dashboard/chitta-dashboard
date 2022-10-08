import { Stack, styled } from "@mui/material";

namespace S {
  export const Container = styled(Stack)(({ theme }) => ({
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
    padding: "2rem 1.875rem 1.875rem 1.875rem ",
  }));
}
export default S;
