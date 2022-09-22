import { styled, TextField } from "@mui/material";

namespace S {
  export const InputText = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      height: "2rem",
    },
    width: "100%",
  }));

  InputText.defaultProps = {
    variant: "outlined",
    size: "small",
    InputProps: { style: { fontSize: ".8rem" } },
    InputLabelProps: { style: { fontSize: ".8rem" } },
  };
}

export default S;
