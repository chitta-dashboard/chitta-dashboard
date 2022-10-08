import { MenuItem, styled, TextField } from "@mui/material";
namespace S {
  export const SelectInput = styled(TextField)(({ theme }) => ({
    width: "18rem",
    borderRadius: "3.5rem",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: "0.5rem 1rem",
    borderBottom: "0.1rem solid #6868681A",
    // color: theme.palette.text.secondaryLight,
    // cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.custom.backgroundLight,
      color: "#1E1E1E",
    },
  }));
}
export default S;
