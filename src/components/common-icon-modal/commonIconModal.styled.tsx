import { styled, Dialog } from "@mui/material";

namespace S {
  export const CustomModalContainer = styled(Dialog)(({ theme }) => ({
    "& .MuiBackdrop-root": {
      backgroundColor: theme.palette.custom.backdrop,
    },
    "& .MuiPaper-root": {
      borderRadius: "2.25rem",
      width: "max-content",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
  }));
}
export default S;
