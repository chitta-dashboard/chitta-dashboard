import { styled, TableBody } from "@mui/material";

namespace S {
  export const Content = styled(TableBody)(({ theme }) => ({
    "& td": {
      color: theme.palette.text.secondary,
      fontSize: "1.1rem",
      fontWeight: 500,
      padding: "1rem 0",
      borderBottom: "0.1rem solid grey",
    },
    "& td:first-of-type": {
      textAlign: "center",
    },
  }));
}

export default S;
