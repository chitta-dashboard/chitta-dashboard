import { styled, TextField } from "@mui/material";

namespace S {
  export const InputNumber = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      height: "2rem",
    },
    width: "100%",
  }));
  InputNumber.defaultProps = {
    inputProps: {
      inputMode: "numeric",
      pattern: "[0-9]*",
      style: { fontSize: ".8rem" },
    },
    InputLabelProps: {
      style: { fontSize: ".8rem" },
    },
  };
}

export default S;
