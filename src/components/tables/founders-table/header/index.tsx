import { TableHead, TableRow } from "@mui/material";
import S from "./header.styled";

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <S.WebTableCell>பெயர்</S.WebTableCell>
        <S.WebTableCell>பிறந்த தேதி</S.WebTableCell>
        <S.WebTableCell>கைபேசி எண்</S.WebTableCell>
        <S.WebTableCell>தகுதி</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell colSpan={5}>MD Details</S.TabTableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
