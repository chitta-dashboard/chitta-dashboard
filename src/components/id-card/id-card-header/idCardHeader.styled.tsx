import { Box, styled, Typography } from "@mui/material";

export namespace S {
  export const IdHeaderWrapper = styled(Box)({
    display: "flex",
    width: "100%",
    height: "108px",
    justifyContent: "flex-start !important",
  });

  export const HeaderLeft = styled(Box)({
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  export const LogoImage = styled("img")({
    height: "5.3rem",
    width: "5.3rem",
    borderRadius: "50%",
  });

  export const HeaderRight = styled(Box)({
    width: "47%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });

  export const IdHeading = styled(Typography)(({ theme }: any) => ({
    fontSize: "1.1rem",
    fontWeight: "600",
    textAlign: "center",
    paddingTop: "1rem",
    color: theme.palette.primary.light,
  }));

  export const IdSubHeading = styled(Box)(({ theme }: any) => ({
    fontSize: "0.8rem",
    color: theme.palette.text.secondaryLight,
  }));
}

export default S;
