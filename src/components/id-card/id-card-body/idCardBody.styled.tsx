import { Box, styled, Typography } from "@mui/material";

export namespace S {
  export const IdCardWrapper = styled(Box)(({ theme }) => ({
    width: "33rem",
    height: "20.7rem",
    backgroundColor: theme.palette.bg.main,
    borderRadius: "1.25rem",
    border: `1px solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.3)}`,
    padding: "0rem 1rem",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "start !important",
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
    margin: "0.2rem 0.2rem 0rem 0.2rem",
  }));

  export const IdImage = styled("img")({
    width: "8.3rem",
    height: "9.5rem",
    borderRadius: "1.25rem",
  });

  export const DescriptionBox = styled(Box)({
    display: "flex !important",
    gap: "0.3rem !important",
    width: "100%",
  });

  export const UserBox = styled(Box)({
    width: "42%",
    display: "flex",
    justifyContent: "start !important",
  });

  export const UserDetailBox = styled(Box)({
    width: "58%",
    display: "flex",
    justifyContent: "start !important",
  });

  export const IdCardBodyWrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingTop: "1.3rem",
    gap: "0.5rem",
    alignItems: "start !important",
    overflow: "hidden",
    paddingBottom: "1rem",
  });

  export const IdDetailsWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    justifyContent: "flex-start",
    // alignItems: "start !important",
    width: "13rem",
  });

  export const IdDetails = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.75rem",
    fontWeight: "500",
    color: theme.palette.text.secondaryLight,
  }));

  export const IdDetailsName = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.8rem",
    fontWeight: "500",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    color: theme.palette.text.secondaryLight,
  }));

  export const QrCode = styled(Box)({
    marginTop: "1rem",
  });

  export const MiddleBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    marginBottom: "-0.5rem",
  });

  export const Signature = styled("img")({
    height: "5.3rem",
    width: "8.3rem",
  });
}

export default S;
