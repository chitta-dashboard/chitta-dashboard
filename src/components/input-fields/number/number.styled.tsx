import { styled, TextField } from "@mui/material";

namespace S {
  export const InputNumber = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      height: "2.7rem",
    },
    width: "100%",
  });

  InputNumber.defaultProps = {
    inputProps: {
      inputMode: "numeric",
      pattern: "[0-9]*",
      style: { fontSize: ".9em" },
    },
    InputLabelProps: {
      style: { fontSize: ".9rem" },
      shrink: true,
    },
    variant: "outlined",
    size: "small",
    type: "tel",
  };
}

export default S;
