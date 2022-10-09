import { styled, Avatar } from "@mui/material";

namespace S {
  export const PageNumber = styled(Avatar)({
    width: "2rem",
    height: "2rem",
  });

  export const ButtonContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
  });
}
export default S;
