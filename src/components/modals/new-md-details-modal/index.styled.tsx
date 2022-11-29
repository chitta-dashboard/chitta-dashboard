import { Button, styled, Typography, Box } from "@mui/material";

namespace S {
  type TableBodyContainerType = {
    isDataAvailable: boolean;
  };

  export const TableBodyContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isDataAvailable",
  })(({ isDataAvailable }: TableBodyContainerType) => ({
    minHeight: "500px",
    minWidth: "600px",
    alignItems: isDataAvailable ? "flex-start !important" : "center !important",
  }));

  export const SearchBarContainer = styled("div")({
    "& .MuiPaper-root": {
      width: "auto",
    },
  });

  export const AddButtonContainer = styled(Box)({
    width: "100%",
    height: "3.5rem",
    position: "relative",
  });

  export const AddButton = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    margin: "0.5rem auto 1rem auto",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    width: "30%",
    color: "white",
    borderColor: theme.palette.primary.light,
    position: "absolute",
    top: "25%",
  }));

  export const NoDataAvailable = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryLight,
    textAlign: "center",
  }));
}

export default S;
