import React from "react";
import { TableRow } from "@mui/material";

import S from "./headerWrapper.styled";

export type Props = {
  children: React.ReactNode;
};

const HeaderWrapper = ({ children }: Props) => {
  return (
    <S.Head>
      <TableRow>{children}</TableRow>
    </S.Head>
  );
};

export default HeaderWrapper;
