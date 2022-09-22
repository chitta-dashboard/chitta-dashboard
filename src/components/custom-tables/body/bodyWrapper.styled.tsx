import { styled, TableBody } from "@mui/material";

namespace S {
  export const Content = styled(TableBody)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      "& tr": {
        borderBottom: "0.2rem solid #F3F3F3",
      },
      "& td:nth-last-of-type(2)": {
        paddingBottom: "1.25rem",
      },
    },
    [theme.breakpoints.up("md")]: {
      "& tr": {
        borderBottom: "0.2rem solid #F3F3F3",
      },
      // "& td": {
      //   width: "25%",
      //   padding: "1rem 0",
      // },
      // "& td:first-of-type": {
      //   padding: "1rem 0",
      //   width: "7%",
      //   textAlign: "center",
      // },
      // "& td:nth-of-type(5)": {
      //   width: "32%",
      // },
      // "& td:last-of-type": {
      //   width: "20%",
      //   padding: "0 1rem",
      // },
    },
  }));
}

export default S;
