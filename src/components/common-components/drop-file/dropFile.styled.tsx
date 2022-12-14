import { CSSInterpolation, styled } from "@mui/material";
import { DropTargetState } from "./index";

namespace S {
  export const DropBox = styled("div")<{ state: DropTargetState }>(({ theme, state }) => {
    const style: CSSInterpolation = {
      width: "100%",
      height: "250px",
      borderRadius: "3px",
      border: `3px solid ${theme.palette.addAlpha(theme.palette.border.primary, 0.9)}`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: ".8rem",
      transition: "all .3s",
    };

    if (state === ("inValidDrag" as DropTargetState)) {
      style.borderColor = theme.palette.error.light;
      style.backgroundColor = theme.palette.addAlpha(theme.palette.error.light, 0.3);
      style.color = theme.palette.error.dark;
    } else if (state === ("validDrag" as DropTargetState)) {
      style.backgroundColor = theme.palette.addAlpha(theme.palette.primary.light, 0.3);
    } else if (state === ("completedDrag" as DropTargetState)) {
      style.backgroundColor = theme.palette.primary.light;
      style.color = theme.palette.text.white;
    }

    return style;
  });

  export const HiddenInput = styled("input")(() => ({
    display: "none",
  }));
  HiddenInput.defaultProps = {
    type: "file",
  };

  export const Message = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: ".5rem",
    pointerEvents: "none",
  }));
}

export default S;
