import { styled, Stack, Grid } from "@mui/material";

namespace S {
  export const InputContainer = styled(Stack)(({ theme }) => ({
    padding: "1rem",

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  InputContainer.defaultProps = {
    width: "100%",
  };
  export const Title = styled("div")(({ theme }) => ({
    display: "contents",
  }));
  export const ChildContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
  }));
  ChildContainer.defaultProps = {
    md: 6,
  };
}

export default S;
