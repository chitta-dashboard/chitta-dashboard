import { Stack, styled } from "@mui/material";

namespace S {
  export const Container = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "isPadding",
  })(({ isPadding = true }: { isPadding?: Boolean }) => ({
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
    padding: isPadding ? "2rem 1.875rem 1.875rem 1.875rem" : 0,
  }));
}
export default S;
