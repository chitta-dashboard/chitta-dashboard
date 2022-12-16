import { Checkbox, TableHead, TableRow, Stack } from "@mui/material";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { ASCENDING, DESCENDING, NORMAL } from "../../../../utils/constants";
import IconWrapper from "../../../../utils/iconWrapper";
import S from "./header.styled";

const Header = () => {
  const { farmerId, selectedFarmers, sortFilter, setSortFilter, checkboxSelectAll } = useFarmerDetailsContext();
  return (
    <TableHead>
      <TableRow>
        <S.ColCheckCell>
          <Checkbox onChange={() => checkboxSelectAll()} checked={selectedFarmers.length === farmerId.length && selectedFarmers.length !== 0} />
        </S.ColCheckCell>
        <S.WebTableCell>உறுப்பினர் எண்</S.WebTableCell>
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
        <S.WebTableCell>குழு பெயர்</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>
          <Stack>
            <Checkbox onChange={() => checkboxSelectAll()} checked={selectedFarmers.length === farmerId.length && selectedFarmers.length !== 0} />
          </Stack>
          <Stack>Farmers Details</Stack>
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
