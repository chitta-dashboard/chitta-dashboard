import { styled, TextField } from "@mui/material";
namespace S {
  export const ChooseFile = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": {
        marginLeft: "3rem",
      },
      color: "transparent",
      paddingLeft: "23.1rem",
      fontSize: "small",
      heigth: "2.5rem",
    },
    color: "transparent",
  }));

  ChooseFile.defaultProps = {
    InputLabelProps: { shrink: true, style: { fontSize: ".9rem" } },
    InputProps: { style: { fontSize: ".9rem" } },
  };
}

export default S;
