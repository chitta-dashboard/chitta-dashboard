import { TableHead, TableRow } from "@mui/material";
import S from "./header.styled";
import { sortFilterHandler, sortIconHandler } from "../../../../utils/constants";
import { useFounderContext } from "../../../../utils/context/founders";
import IconWrapper from "../../../../utils/iconWrapper";

const Header = () => {
  // state values
  const { sortFilter, setSortFilter } = useFounderContext();
  return (
    <TableHead>
      <TableRow>
        <S.WebTableCell>
          <span
            onClick={() => {
              setSortFilter(sortFilterHandler(sortFilter));
            }}
          >
            பெயர்
            <i>{sortIconHandler(sortFilter)}</i>
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
              setSortFilter(sortFilterHandler(sortFilter));
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
