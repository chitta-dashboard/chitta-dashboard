import { styled, TextField } from "@mui/material";
namespace S {
  export const ChooseFile = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      fontSize: "small",
      heigth: "2.5rem",
    },
  });
  ChooseFile.defaultProps = {
    InputLabelProps: { shrink: true, style: { fontSize: ".9rem" } },
    InputProps: { style: { fontSize: ".9rem" } },
  };
}

export default S;
