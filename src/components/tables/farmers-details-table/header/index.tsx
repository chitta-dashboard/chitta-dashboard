import { Checkbox, TableHead, TableRow, Stack } from "@mui/material";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import S from "./header.styled";

const Header = () => {
  const { farmerId, selectedFarmers, checkboxSelectAll } = useFarmerDetailsContext();
  return (
    <TableHead>
      <TableRow>
        <S.ColCheckCell>
          <Checkbox onChange={() => checkboxSelectAll()} checked={selectedFarmers.length === farmerId.length && selectedFarmers.length !== 0} />
        </S.ColCheckCell>
        <S.WebTableCell>உறுப்பினர் எண்</S.WebTableCell>
        <S.WebTableCell>பெயர்</S.WebTableCell>
        <S.WebTableCell>பிறந்த தேதி</S.WebTableCell>
        <S.WebTableCell>கைபேசி எண்</S.WebTableCell>
        <S.WebTableCell>குழு பெயர்</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>
          <Stack>
            <Checkbox onChange={() => checkboxSelectAll()} checked={selectedFarmers.length === farmerId.length && selectedFarmers.length !== 0} />
          </Stack>
          <Stack>Farmers Details</Stack>
        </S.TabTableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
