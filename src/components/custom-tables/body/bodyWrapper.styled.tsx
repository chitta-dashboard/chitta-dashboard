import { styled, TableBody } from "@mui/material";

namespace S {
  export const Content = styled(TableBody)(({ theme }) => ({
    "& tr": {
      borderBottom: "0.2rem solid #F3F3F3",
    },
    [theme.breakpoints.down("md")]: {
      "& td:nth-last-of-type(2)": {
        paddingBottom: "1.25rem",
      },
    },
  }));
}

export default S;
