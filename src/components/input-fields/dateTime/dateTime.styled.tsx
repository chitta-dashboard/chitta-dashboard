import { styled, TextField } from "@mui/material";

namespace S {
  export const ChooseDateTime = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": {
        color: theme.palette.text.secondaryDark,
      },
      color: theme.palette.text.secondaryLight,
      height: "2.65rem",
    },

    width: "100%",
  }));

  ChooseDateTime.defaultProps = {
    size: "small",
    type: "datetime-local",
    InputProps: { style: { fontSize: ".9rem" } },
    InputLabelProps: { style: { fontSize: ".9rem" }, shrink: true },
  };
}

export default S;
