import { styled, TextField } from "@mui/material";

namespace S {
  export const InputText = styled(TextField)({
    width: "100%",
    "& .MuiOutlinedInput-root": {
      height: "2.7rem",
    },
  });

  InputText.defaultProps = {
    variant: "outlined",
    size: "small",
    InputProps: { style: { fontSize: ".9rem" } },
    InputLabelProps: { style: { fontSize: ".9rem" }, shrink: true },
  };
}

export default S;
