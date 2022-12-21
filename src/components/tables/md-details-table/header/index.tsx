import { TableHead, TableRow } from "@mui/material";
import { useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { sortFilterHandler, sortIconHandler } from "../../../../utils/constants";
import IconWrapper from "../../../../utils/iconWrapper";
import S from "./header.styled";

const Header = () => {
  const { sortFilter, setSortFilter } = useMdDetailsContext();
  return (
    <TableHead>
      <TableRow>
        <S.WebTableCell>
          <span onClick={() => setSortFilter && setSortFilter(sortFilterHandler(sortFilter))}>
            பெயர்
            <i>{sortIconHandler(sortFilter)}</i>
          </span>
        </S.WebTableCell>
        <S.WebTableCell>பிறந்த தேதி</S.WebTableCell>
        <S.WebTableCell>கைபேசி எண்</S.WebTableCell>
        <S.WebTableCell>தகுதி</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>
          <p>MD Details</p>
          <IconWrapper onClick={() => setSortFilter && setSortFilter(sortFilterHandler(sortFilter))}>{sortIconHandler(sortFilter)}</IconWrapper>
        </S.TabTableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
