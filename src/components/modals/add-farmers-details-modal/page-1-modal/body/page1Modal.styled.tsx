import { styled, Stack, Avatar } from "@mui/material";

namespace S {
  export const InputContainer = styled(Stack)(({ theme }) => ({
    width: "30rem",
  }));

  export const Title = styled("div")(({ theme }) => ({
    display: "contents",
  }));

  export const PageNumber = styled(Avatar)(({ theme }) => ({
    width: "2rem",
    height: "2rem",
    marginTop: "1rem",
  }));

  export const ButtonContainer = styled(Stack)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    paddingBottom: "1rem",
    paddingLeft: "1rem",
    marginTop: ".5rem",
  }));

  ButtonContainer.defaultProps = {
    direction: "row",
    spacing: 3,
  };
}

export default S;
