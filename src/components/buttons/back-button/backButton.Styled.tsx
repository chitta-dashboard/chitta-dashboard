import { styled, Button } from "@mui/material";

namespace S {
  export const BackButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    paddingLeft: "3.5rem",
    paddingRight: "3.5rem",
    height: "2.35rem",
  }));

  BackButton.defaultProps = {
    size: "small",
  };
}
export default S;
