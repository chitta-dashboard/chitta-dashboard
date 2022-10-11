import { styled, Box } from "@mui/material";
import { Theme } from "@mui/material";

namespace S {
  export const Layout = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "grid",
    gridAutoRows: "auto 1fr auto",
    backgroundColor: theme.palette.bg.light,
    height: "100vh",
    width: "100%",
    position: "fixed",
    overflow: "hidden",
  }));
}

export default S;
