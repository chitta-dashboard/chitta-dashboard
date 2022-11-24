import { styled, Typography } from "@mui/material";

namespace S {
  export const Header = styled("div")({
    display: "flex",
    alignItems: "center",
    position: "relative",
    gap: "2rem",
    justifyContent: "space-between",
  });

  export const Description = styled("div")({
    whiteSpace: "nowrap",
  });

  export const DescriptionHeader = styled(Typography)(({ theme }) => ({
    fontSize: "1.125rem",
    fontWeight: "500",
    color: theme.palette.text.secondaryDark,
  }));

  export const DescriptionText = styled(Typography)(({ theme }) => ({
    fontSize: ".875rem",
    // fontWeight: "400",
    color: theme.palette.text.secondary,
  }));

  export const Action = styled("div")({
    display: "grid",
    gridTemplateColumns: "12rem 5rem",
    columnGap: "1.5rem",
  });
}

export default S;
