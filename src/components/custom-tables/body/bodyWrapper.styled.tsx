import { styled, TableBody } from "@mui/material";

namespace S {
  export const Content = styled(TableBody)(({ theme }) => ({
    "& tr": {
      borderBottom: "0.2rem solid #F3F3F3",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: theme.palette.custom.backgroundLight,
      },

      "& td": {
        color: theme.palette.text.secondaryLight,
        fontSize: "1.1rem",
        fontWeight: 500,
        padding: "1rem 0",

        "&::before": {
          color: theme.palette.text.primary,
          fontWeight: 600,
        },

        [theme.breakpoints.down("md")]: {
          padding: "0.8rem 0", //common padding for tablet table cell

          "&:first-of-type": {
            padding: "0.8rem 2rem",
          },
          "&:nth-last-of-type(2)": {
            paddingBottom: "1rem",
          },
        },
      },
    },

    "& .MuiSvgIcon-root": {
      color: theme.palette.text.primaryDark,
    },
  }));
}

export default S;
