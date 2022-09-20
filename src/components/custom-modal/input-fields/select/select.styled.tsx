import { styled, InputLabel, TextField } from "@mui/material";

namespace S {
  export const SelectField = styled(TextField)(({ theme }) => ({
    "& .MuiSelect-outlined": {
      height: ".4rem",
      width: "7.2rem",
      padding: "0.44rem",
      fontSize: ".8rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: ".8rem",
      position: "absolute",
    },
    width: "100%",
  }));

  export const Label = styled(InputLabel)(({ theme }) => ({}));
}

export default S;
