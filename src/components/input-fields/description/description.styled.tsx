import { styled, TextField } from "@mui/material";

namespace S {
  export const Description = styled(TextField)({
    "& .MuiInputLabel-root": {
      fontSize: ".9rem",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: ".9rem",
      height: "4rem",
      width: "100%",
    },
    width: "100%",
    height: "100%",
  });
  Description.defaultProps = {
    InputLabelProps: { shrink: true },
  };
}

export default S;
