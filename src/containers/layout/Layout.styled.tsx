import { styled, Box } from "@mui/material";
import { Theme } from "@mui/material";

export namespace S {
  export const Layout = styled(Box)(({ theme }: { theme: Theme }) => {
    console.log(theme);
    return {
      display: "grid",
      gridAutoRows: "auto 1fr auto",
      backgroundColor: theme.palette.custom.backgroundLight,
      minHeight: "100vh",
      maxHeight: "100vh",
    };
  });
}
