import { TableHead, TableRow } from "@mui/material";
import S from "./header.styled";
import { sortFilterHandler, sortIconHandler } from "../../../../utils/constants";
import { useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import IconWrapper from "../../../../utils/iconWrapper";

const Header = () => {
  // state values
  const { sortFilter, setSortFilter } = useFarmersGroupContext();
  return (
    <TableHead>
      <TableRow>
        <S.WebTableCell>
          <span
            onClick={() => {
              setSortFilter(sortFilterHandler(sortFilter));
            }}
          >
            குழுபெயர்
            <i>{sortIconHandler(sortFilter)}</i>
          </span>
        </S.WebTableCell>
        <S.WebTableCell>எண்ணிக்கை</S.WebTableCell>
        <S.WebTableCell>குழு விவரங்கள்</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>
          <p>MD Farmers Group</p>
          <IconWrapper
            onClick={() => {
              setSortFilter && setSortFilter(sortFilterHandler(sortFilter));
            }}
          >
            {sortIconHandler(sortFilter)}
          </IconWrapper>
        </S.TabTableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
