import { styled, Avatar, Box, Typography } from "@mui/material";

namespace S {
  export const PageNumber = styled(Box)({
    width: "2rem",
    height: "2rem",
    backgroundColor: "#e0e0e0",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  export const CurrentPage = styled(Typography)({
    color: "grey",
    fontSize: "0.8rem",
  });

  export const ButtonContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
  });
}
export default S;
