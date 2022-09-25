import React from "react";
import { Checkbox, TableHead, TableRow, Stack } from "@mui/material";

import S from "./header.styled";

interface Props {
  users: any;
  setUsers: any;
  handleChange: any;
}

const Header = (props: Props) => {
  return (
    <TableHead>
      <TableRow>
        <S.ColCheckCell>
          <Checkbox name="allSelect" onChange={props.handleChange} checked={!props.users.some((user: any) => user?.isChecked !== true)} />
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
