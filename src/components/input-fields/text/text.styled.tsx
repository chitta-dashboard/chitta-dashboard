import { styled, TextField } from "@mui/material";

namespace S {
  export const InputText = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      height: "2.7rem",
    },

    width: "100%",
  }));

  InputText.defaultProps = {
    variant: "outlined",
    size: "small",
    InputProps: { style: { fontSize: ".9rem" } },
    InputLabelProps: { style: { fontSize: ".9rem" } },
  };
}

export default S;
