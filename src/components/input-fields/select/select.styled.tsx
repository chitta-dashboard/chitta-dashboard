import { styled, TextField } from "@mui/material";

namespace S {
  export const SelectField = styled(TextField)(({ theme }) => ({
    "& .MuiSelect-outlined": {
      height: ".4rem",
      width: "7.2rem",
      padding: "0.425rem",
      fontSize: ".8rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: ".8rem",
    },
    width: "100%",
  }));

  SelectField.defaultProps = {
    inputProps: {
      style: {
        justifyContent: "center",
      },
    },
  };
}

export default S;
