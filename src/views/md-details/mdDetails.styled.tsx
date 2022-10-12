import { Box, styled, Typography } from "@mui/material";

namespace S {
  export const MdDetailsContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    [theme.breakpoints.down("md")]: {
      gap: "1rem",
    },
  }));

  export const CustomMessageDetails = styled("span")({
    fontSize: "1.5rem",
  });

  export const CustomMessage = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
  }));
}

export default S;
