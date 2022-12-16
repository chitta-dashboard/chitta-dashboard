import { TableHead, TableRow } from "@mui/material";
import { useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { ASCENDING, DESCENDING, NORMAL } from "../../../../utils/constants";
import IconWrapper from "../../../../utils/iconWrapper";
import S from "./header.styled";

const Header = () => {
  const { sortFilter, setSortFilter } = useFarmersGroupContext();
  return (
    <TableHead>
      <TableRow>
        <S.WebTableCell>
          <span
            onClick={() => {
              setSortFilter && setSortFilter(sortFilter === NORMAL ? ASCENDING : sortFilter === ASCENDING ? DESCENDING : NORMAL);
            }}
          >
            குழுபெயர்
            <i>{sortFilter === NORMAL ? "sort" : sortFilter === ASCENDING ? "ascending" : "descending"}</i>
          </span>
        </S.WebTableCell>
        <S.WebTableCell>எண்ணிக்கை</S.WebTableCell>
        <S.WebTableCell>குழு விவரங்கள்</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>
          <p>MD Farmers Group</p>
          <IconWrapper
            onClick={() => {
              setSortFilter && setSortFilter(sortFilter === NORMAL ? ASCENDING : sortFilter === ASCENDING ? DESCENDING : NORMAL);
            }}
          >
            {sortFilter === NORMAL ? "sort" : sortFilter === ASCENDING ? "ascending" : "descending"}
          </IconWrapper>
        </S.TabTableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
