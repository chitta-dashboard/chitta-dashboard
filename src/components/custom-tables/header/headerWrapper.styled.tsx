import { styled, TableHead } from "@mui/material";

namespace S {
  export const Head = styled(TableHead)(({ theme }) => ({
    "& th": {
      backgroundColor: theme.palette.custom.backgroundDark,
      color: theme.palette.text.primaryDark,
      fontSize: "1.25rem",
      fontWeight: 600,
      padding: "1.25rem 0",
      width: "22%",
    },
    "& th:first-of-type": {
      textAlign: "center",
      width: "6%",
    },
    "& th:nth-of-type(4)": {
      width: "35%",
    },
  }));
}

export default S;
