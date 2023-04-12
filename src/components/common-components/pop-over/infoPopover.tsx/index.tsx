import { CSSProperties, FC, ReactNode } from "react";
import { Popover } from "@mui/material";

type CustomPopoverProps = {
  id: string | undefined;
  isOpen: HTMLElement | null;
  onClose: () => void;
  children?: ReactNode;
  customStyle?: CSSProperties;
};

const CustomPopover: FC<CustomPopoverProps> = (props) => {
  //constants
  const { id, isOpen, onClose, children, customStyle } = props;

  return (
    <Popover
      id={id}
      open={Boolean(isOpen)}
      anchorEl={isOpen}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={customStyle}
    >
      {children}
    </Popover>
  );
};

export default CustomPopover;
