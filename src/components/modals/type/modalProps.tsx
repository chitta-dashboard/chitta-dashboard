import React from "react";

interface Props {
  openModal: boolean;
  handleClose?: () => void;
  label?: string;
  profile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default Props;
