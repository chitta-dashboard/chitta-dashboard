import { styled, Stack, Box } from "@mui/material";

namespace S {
  export const InputContainer = styled(Stack)(({ theme }) => ({
    marginLeft: "2rem",
    marginRight: "2rem",
    marginBottom: "1rem",
    width: "30rem",
  }));

  export const Title = styled("div")(({ theme }) => ({
    display: "contents",
  }));

  export const ButtonContainer = styled(Box)(({ theme }) => ({
    marginTop: "1rem",
    marginBottom: "1rem",

    "& .MuiButton-root": {
      paddingLeft: "3rem",
      paddingRight: "3rem",
      marginBottom: "1rem",
      backgroundColor: theme.palette.primary.light,
    },
  }));
  export const ChipContainer = styled(Stack)(({ theme }) => ({
    marginLeft: "1rem",
  }));
}

export default S;
