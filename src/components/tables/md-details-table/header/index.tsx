import React from "react";
import { TableCell } from "@mui/material";

import HeaderWrapper from "../../../custom-tables/header";

const Header = () => {
  return (
    <HeaderWrapper>
      <TableCell>#</TableCell>
      <TableCell>பெயர்</TableCell>
      <TableCell>கைபேசி எண்</TableCell>
      <TableCell>தகுதி</TableCell>
      <TableCell></TableCell>
    </HeaderWrapper>
  );
};

export default Header;
