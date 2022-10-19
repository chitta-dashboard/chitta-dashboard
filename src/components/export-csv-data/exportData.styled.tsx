import { styled, Button } from "@mui/material";

namespace S {
  export const ExportDataButton = styled(Button)(({ theme }) => ({
    minWidth: "10%",
    [theme.breakpoints.down("md")]: {
      padding: "0.4rem 2.5rem",
    },
  }));
}

export default S;
