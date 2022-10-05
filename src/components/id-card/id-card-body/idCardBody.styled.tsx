import { Box, styled, Typography } from "@mui/material";
import { LightTheme } from "../../../utils/theme";

export namespace S {
  export const IdCardWrapper = styled(Box)(({ theme }) => ({
    maxWidth: "34.5rem",
    backgroundColor: "#fff",
    borderRadius: "1.25rem",
    padding: "0.3rem 0.6rem 0 0.6rem",
    border: "1px solid #6868684D",
    height: "fit-content",
    width: "fit-content",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "start !important",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    margin: "1rem 2rem",
  }));

  export const IdImage = styled("img")(({ theme }) => ({
    width: "8.3rem",
    height: "9.5rem",
  }));

  export const IdCardBodyWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingTop: "1.3rem",
    gap: "1.5rem",
    alignItems: "start !important",
    overflow: "hidden",
  }));

  export const IdDetailsWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  }));
  export const IdDetailBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "start !important",
  }));
  export const IdDescriptionBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
  }));

  export const IdDetails = styled(Typography)(({ theme }) => ({
    fontSize: "0.75rem",
    fontWeight: "500",
    marginBottom: "0.1rem",
    marginTop: "0.5rem",
    color: LightTheme.palette.text.secondaryLight,
  }));

  export const IdDetailsName = styled(Typography)(({ theme }) => ({
    fontSize: "0.8rem",
    fontWeight: "500",
    marginBottom: "0.1rem",
    marginTop: "0.5rem",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    color: LightTheme.palette.text.secondaryLight,
  }));

  export const QrCode = styled(Box)(({ theme }) => ({
    marginTop: "1rem",
  }));

  export const MiddleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    marginBottom: "-0.5rem",
  }));

  export const Signature = styled("img")(({ theme }) => ({
    height: "5.3rem",
    width: "8.3rem",
    margin: "0 auto",
  }));
}

export default S;
