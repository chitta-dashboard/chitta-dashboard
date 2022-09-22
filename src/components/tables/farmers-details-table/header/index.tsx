import React from "react";
import { Checkbox, TableHead, TableRow, Stack } from "@mui/material";

import S from "./header.styled";

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <S.ColCheckCell>
          <Checkbox />
        </S.ColCheckCell>
        <S.WebTableCell>#</S.WebTableCell>
        <S.WebTableCell>பெயர்</S.WebTableCell>
        <S.WebTableCell>கைபேசி எண்</S.WebTableCell>
        <S.WebTableCell>தகுதி</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>
          <Stack>
            <Checkbox />
          </Stack>
          <Stack>Farmers Details</Stack>
        </S.TabTableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
