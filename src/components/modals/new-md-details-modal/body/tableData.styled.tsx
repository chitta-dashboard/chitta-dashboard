// import styled from "@emotion/styled";
import { Box, Grid, Typography, Checkbox, styled } from "@mui/material";

namespace S {
  export const MdDetailsTableContainer = styled(Box)({
    width: "100%",
    height: "100%",
    margin: "0 auto",
  });

  export const MdDetailsTableHeadContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    alignItems: "center",
    backgroundColor: theme.palette.bg.light,
    padding: "10px",
  }));

  export const MdDetailsTableCheckBox = styled(Checkbox)({});

  export const MdDetailsTableHeadTitle = styled(Typography)({
    display: "grid",
  });
}

export default S;
