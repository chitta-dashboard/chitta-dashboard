import { styled, Box, Typography, Popover, Stack } from "@mui/material";

namespace S {
  export const ModalContainer = styled(Popover)(() => ({
    "& .MuiBackdrop-root": {
      backgroundColor: "none",
    },
    "& .MuiPaper-root": {
      borderRadius: "1.25rem",
      width: "24rem",
      minWidth: "24rem",
      height: "auto",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
  }));

  export const HeadingBox = styled(Box)(() => ({
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 1rem",
    borderBottom: "2px solid rgba(104, 104, 104, 0.1)",
  }));

  export const HeadingText = styled(Typography)(({ theme }) => ({
    fontWeight: "600",
    fontSize: "1.2rem",
    lineHeight: "1.688rem",
    color: theme.palette.text.primary,
  }));

  export const HeadingIcons = styled(Stack)(() => ({
    flexDirection: "row",
    gap: "1rem",
  }));

  export const IconBox = styled("i")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "1.5rem",
    cursor: "pointer",
  }));

  export const BodyContainer = styled(Box)<{ isheight: number }>(({ isheight }) => ({
    maxHeight: isheight ? "31rem" : "18.5rem",
    overflowY: "auto",
    transition: "max-height 0.2s ease-in",
  }));

  export const BodyBox = styled(Box)(() => ({
    display: "flex",
    gap: "2rem",
    padding: "1rem 2rem",
    borderBottom: "2px solid #68686818",
  }));

  export const UserImage = styled("img")(() => ({
    width: "4rem",
    height: "4rem",
  }));

  export const UserText = styled(Typography)(() => ({
    color: "black",
  }));

  export const FooterBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1rem",
  }));

  export const FooterText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: "400",
    fontSize: "0.7rem",
    lineHeight: "0.75rem",
    cursor: "pointer",
  }));
}

export default S;
