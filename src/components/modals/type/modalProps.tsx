import React from "react";

interface Props {
  openModal: boolean;
  handleClose?: any;
  label?: string;
  profile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  error?: any;
  helperText?: string;
  submit?: () => void;
  multiSelectLabel?: string;
  multiSelectKey?: string;
  dropDownIcon?: () => void;
  addDecision?: boolean;
  signature?: string;
  image?: string;
  deleteId?: number;
  onChange?: () => void;
}

export default Props;
