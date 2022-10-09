import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const CardHeader = styled(Box)(({ theme }: any) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  color: theme.palette.primary.light,
  fontWeight: "600",
  fontSize: "1.2rem",
  marginBottom: "0.3rem",
  position: "relative",
  padding: "0.2rem 0 0 0",
}));

export const CardIconContainer = styled(Box)({
  height: "1.2rem",
  width: "1.3rem",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const IconGreen = styled("i")(({ theme }: any) => ({
  fontSize: "1.2rem",
  color: theme.palette.primary.light,
  cursor: "pointer",
}));

export const NotifyIcons = styled("i")(({ theme }: any) => ({
  fontSize: "1.1rem",
  color: theme.palette.text.secondaryDark,
  cursor: "pointer",
  marginRight: "0.4rem",
  [theme.breakpoints.up("xl")]: {
    marginRight: "1rem",
  },
}));
