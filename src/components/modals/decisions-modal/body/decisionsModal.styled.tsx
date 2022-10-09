import { styled, Stack, Grid } from "@mui/material";

namespace S {
  export const InputContainer = styled(Stack)({});
  InputContainer.defaultProps = {
    width: "100%",
  };

  export const Title = styled("div")({
    display: "contents",
  });

  export const ChildContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
  }));

  ChildContainer.defaultProps = {
    md: 6,
  };

  export const RadioContainer = styled(Stack)({
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  });

  export const DateContainer = styled(Stack)({});

  export const QualificationContainer = styled(Stack)({});

  QualificationContainer.defaultProps = {
    width: "100%",
  };
}

export default S;
