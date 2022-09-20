import styled from "@emotion/styled";
import { Box } from "@mui/material";

import { LightTheme } from "../../../../utils/theme";

export const CardHeader = styled(Box)(({ theme }: any) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  color: LightTheme.palette.primary.light,
  fontWeight: "500",
  fontSize: "1.1rem",
  marginBottom: "0.3rem",
  position: "relative",
}));

export const CardIconContainer = styled(Box)(({ theme }: any) => ({
  height: "1.2rem",
  width: "1.3rem",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export const IconGreen = styled("i")(({ theme }: any) => ({
  fontSize: "1.2rem",
  color: LightTheme.palette.primary.light,
  cursor: "pointer",
}));

export const NotifyIcons = styled("i")(({ theme }: any) => ({
  fontSize: "1.1rem",
  color: LightTheme.palette.text.secondaryDark,
  cursor: "pointer",
}));