import { TableHead, TableRow } from "@mui/material";
import { useFounderContext } from "../../../../utils/context/founders";
import { ASCENDING, DESCENDING, NORMAL } from "../../../../utils/constants";
import IconWrapper from "../../../../utils/iconWrapper";
import S from "./header.styled";

const Header = () => {
  const { sortFilter, setSortFilter } = useFounderContext();
  return (
    <TableHead>
      <TableRow>
        <S.WebTableCell>
          <span
            onClick={() => {
              setSortFilter && setSortFilter(sortFilter === NORMAL ? ASCENDING : sortFilter === ASCENDING ? DESCENDING : NORMAL);
            }}
          >
            பெயர்
            <i>{sortFilter === NORMAL ? "sort" : sortFilter === ASCENDING ? "ascending" : "descending"}</i>
          </span>
        </S.WebTableCell>
        <S.WebTableCell>பிறந்த தேதி</S.WebTableCell>
        <S.WebTableCell>கைபேசி எண்</S.WebTableCell>
        <S.WebTableCell>தகுதி</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>
          <p>Founder Details</p>
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
