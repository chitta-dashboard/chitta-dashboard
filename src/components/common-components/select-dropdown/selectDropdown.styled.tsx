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
    "& .css-6hp17o-MuiList-root-MuiMenu-list": {
      padding: "0% !important",
    },
    [theme.breakpoints.down("lg")]: {
      width: "96%",
    },
    [theme.breakpoints.down("md")]: {
      width: "91.5%",
    },
  }));

  export const Option = styled(MenuItem)(({ theme }) => ({
    backgroundColor: theme.palette.bg.main,
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: "0.5rem 1rem",
    borderBottom: `0.1rem solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
      color: theme.palette.text.secondaryDark,
    },
  }));
}
export default S;
