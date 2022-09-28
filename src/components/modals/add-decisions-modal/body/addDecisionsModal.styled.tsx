import { styled, Stack, Grid, Typography, Box } from "@mui/material";
import { LightTheme } from "../../../../utils/theme";

namespace S {
  export const InputContainer = styled(Stack)(({ theme }) => ({}));

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

  export const RadioContainer = styled(Stack)(({ theme }) => ({
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  }));

  export const DateContainer = styled(Stack)(({ theme }) => ({}));
  export const QualificationContainer = styled(Stack)(({ theme }) => ({}));
  
  QualificationContainer.defaultProps = {
    width: "100%",
  };
}

export default S;
