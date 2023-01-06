import { Checkbox, TableHead, TableRow, Stack } from "@mui/material";
import S from "./header.styled";
import { sortFilterHandler, sortIconHandler } from "../../../../utils/constants";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import IconWrapper from "../../../../utils/iconWrapper";

const Header = () => {
  // state values
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
              setSortFilter(sortFilterHandler(sortFilter));
            }}
          >
            பெயர்
            <i>{sortIconHandler(sortFilter)}</i>
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
