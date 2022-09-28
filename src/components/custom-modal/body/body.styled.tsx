import { Stack, styled } from "@mui/material";

namespace S {
  export const Container = styled(Stack)(({ theme }) => ({
    display: "flex",
    justtifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
    padding: "2rem",
  }));
}
export default S;