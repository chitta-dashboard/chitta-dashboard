import { Box } from "@mui/material";
import { styled, Typography, Button as MuiButton } from "@mui/material";

namespace S {
  export const Header = styled("div")({
    display: "flex",
    alignItems: "center",
    position: "relative",
    gap: "2rem",
    justifyContent: "space-between",
  });

  export const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1.6rem",
    fontWeight: "500",
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  }));

  export const Button = styled(MuiButton)({
    width: "7em",
  });

  export const ButtonBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  });
}

export default S;
