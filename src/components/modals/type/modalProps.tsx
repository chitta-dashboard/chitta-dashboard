import React from "react";

interface Props<> {
  openModal: boolean;
  handleClose?: any;
  deleteMdDetails?: any;
  deleteId?: number;
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
}

export default Props;
