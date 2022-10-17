import { MenuItem, styled, TextField } from "@mui/material";
namespace S {
  export const SelectInput = styled(TextField)(({ theme }) => ({
    width: "18rem",
    borderRadius: "3.5rem",
    backgroundColor: theme.palette.bg.main,
    color: theme.palette.text.primary,
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-select": {
      fontSize: "0.9rem",
      padding: "0.6rem 1.5rem",
    },

    // "& .css-fvo6vx-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
    //   /* background-color: rgba(48, 111, 84, 0.08); */
    //   backgroundColor: "blue !important",
    // },
    [theme.breakpoints.down("lg")]: {
      width: "96%",
    },
    [theme.breakpoints.down("md")]: {
      width: "91.5%",
    },
  }));

  export const Option = styled(MenuItem)<{ selectfilter?: number }>(({ theme, selectfilter }) => ({
    textAlign: "center",
    padding: "0.5rem 1rem",
    backgroundColor: selectfilter ? "red" : theme.palette.bg.main,
    color: theme.palette.text.primary,
    borderBottom: `0.1rem solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,

    // "&.css-fvo6vx-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
    //   backgroundColor: "red",
    //   // backgroundColor: "none !important",
    // },
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
      color: theme.palette.text.secondaryDark,
    },
  }));
}
export default S;
