import { TableHead, TableRow } from "@mui/material";
import { useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { ASCENDING, DESCENDING, NORMAL, sortFilterHandler, sortIconHandler } from "../../../../utils/constants";
import IconWrapper from "../../../../utils/iconWrapper";
import S from "./header.styled";

const Header = () => {
  const { sortFilter, setSortFilter } = useFarmersGroupContext();
  return (
    <TableHead>
      <TableRow>
        <S.WebTableCell>
          <span onClick={() => setSortFilter && setSortFilter(sortFilterHandler(sortFilter))}>
            குழுபெயர்
            <i>{sortIconHandler(sortFilter)}</i>
          </span>
        </S.WebTableCell>
        <S.WebTableCell>எண்ணிக்கை</S.WebTableCell>
        <S.WebTableCell>குழு விவரங்கள்</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>
          <p>MD Farmers Group</p>
          <IconWrapper onClick={() => setSortFilter && setSortFilter(sortFilterHandler(sortFilter))}>{sortIconHandler(sortFilter)}</IconWrapper>
        </S.TabTableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
