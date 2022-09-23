import { styled, Stack, Grid, Typography } from "@mui/material";
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

  export const RichTextBoxWrapper = styled(Typography)(({ theme }) => ({
    border: "1px solid green",
    borderRadius: "10px",
    position: "relative",
    marginRight: "0.5rem",
    [theme.breakpoints.down("md")]: {
      margin: "0",
    },
  }));
}

export default S;
