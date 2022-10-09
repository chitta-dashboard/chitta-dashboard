import { styled, TextField } from "@mui/material";

namespace S {
  export const SelectField = styled(TextField)(({ theme }) => ({
    width: "100%",
    "& .MuiSelect-outlined": {
      height: "1.5rem",
      width: "7.2rem",
      padding: "0.6rem",
      fontSize: ".9rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: ".9em",
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.light,
      height: "1.5rem",
      width: "1.5rem",
    },
    "& .MuiSelect-select": {
      width: "100%",
    },
  }));

  SelectField.defaultProps = {
    inputProps: {
      style: {
        justifyContent: "center",
      },
    },
    InputLabelProps: { shrink: true },
  };
}

export default S;
