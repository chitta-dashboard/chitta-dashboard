import { Box, styled, Typography } from "@mui/material";
import { LightTheme } from "../../../utils/theme";

export namespace S {
  export const IdCardWrapper = styled(Box)(({ theme }) => ({
    maxWidth: "34.5rem",
    backgroundColor: "#fff",
    borderRadius: "1.25rem",
    padding: "0.3rem 0.6rem 0 0.6rem",
    margin: "2rem auto",
    border: "1px solid #6868684D",
  }));

  export const IdImage = styled("img")(({ theme }) => ({
    width: "8.3rem",
    height: "9.5rem",
  }));

  export const IdCardBodyWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    marginTop: "1.3rem",
    gap: "1.5rem",
    padding: "0 .2rem",
  }));

  export const IdDetailsWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "2rem",
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
