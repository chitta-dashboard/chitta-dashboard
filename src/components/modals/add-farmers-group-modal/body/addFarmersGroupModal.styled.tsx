import { styled, Stack } from "@mui/material";

namespace S {
  export const InputContainer = styled(Stack)(({ theme }) => ({
    marginLeft: "2rem",
    marginRight: "2rem",
    marginBottom: "1rem",
    marginTop: "2rem",
    width: "30rem",
  }));

  export const Title = styled("div")(({ theme }) => ({
    display: "contents",
  }));
}

export default S;
