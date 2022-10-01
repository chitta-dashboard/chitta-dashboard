import { styled, TextField } from "@mui/material";
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

    [theme.breakpoints.down("lg")]: {
      width: "96%",
    },

    [theme.breakpoints.down("md")]: {
      width: "91.5%",
    },
  }));
}
export default S;
