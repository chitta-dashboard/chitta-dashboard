import { Theme } from "@mui/material";

import { styled, Typography, Button as MuiButton } from "@mui/material";

namespace S {
  export const Header = styled("div")(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  }));

  export const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1.6rem",
    fontWeight: "500",
    color: theme.palette.text.primary,
    margin: "0 auto",
  }));

  export const Button = styled(MuiButton)(({ theme }) => ({
    width: "7em",
  }));
}

export default S;
