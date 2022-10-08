import { TableHead, TableRow } from "@mui/material";
import S from "./header.styled";

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <S.WebTableCell>குழுபெயர்</S.WebTableCell>
        <S.WebTableCell>எண்ணிக்கை</S.WebTableCell>
        <S.WebTableCell>குழு விவரங்கள்</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>Farmers Group</S.TabTableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
