import { styled, Button } from "@mui/material";

namespace S {
  export const BackButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    paddingLeft: "3rem",
    paddingRight: "3rem",
    height: "2.35rem",
  }));

  BackButton.defaultProps = {
    variant: "contained",
    size: "small",
  };
}
export default S;
