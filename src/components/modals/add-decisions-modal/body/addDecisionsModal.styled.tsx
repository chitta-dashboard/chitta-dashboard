import { styled, Stack, Grid, Typography, Box } from "@mui/material";
import { LightTheme } from "../../../../utils/theme";

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

  export const RichTextLabel = styled(Typography)(({ theme }) => ({
    fontSize: "0.8rem",
    color: LightTheme.palette.primary.light,
    position: "absolute",
    top: "-3.5%",
    left: "2%",
    zIndex: "1",
    background: "#ffff",
    padding: "0 0.2rem",
  }));

  export const RichTextBoxWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    height: "100%",
    justifyContent: "initial",
  }));
}

export default S;
