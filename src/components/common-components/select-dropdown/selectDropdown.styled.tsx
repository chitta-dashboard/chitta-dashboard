import { MenuItem, styled, TextField } from "@mui/material";
namespace S {
  export const SelectInput = styled(TextField)(({ theme }) => ({
    width: "15rem",
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
    [theme.breakpoints.down("lg")]: {
      width: "96%",
    },
    [theme.breakpoints.down("md")]: {
      width: "91.5%",
    },
  }));

  export const Option = styled(MenuItem)<{ selectfilter?: number }>(({ theme }) => ({
    borderBottom: `0.1rem solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,
    "&.MuiMenuItem-root": {
      color: theme.palette.text.primary,
      padding: "0.5rem 1rem",
      "&.Mui-selected": {
        backgroundColor: theme.palette.bg.light,
        color: theme.palette.text.secondaryDark,
      },
      "&:hover": {
        backgroundColor: theme.palette.bg.light,
        color: theme.palette.text.secondaryDark,
      },
    },
  }));
}
export default S;
