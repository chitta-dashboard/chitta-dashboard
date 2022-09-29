import { Checkbox, TableHead, TableRow, Stack } from "@mui/material";

import S from "./header.styled";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";

const Header = () => {
  const { farmersList, checkboxSelectAll } = useFarmerDetailsContext();

  return (
    <TableHead>
      <TableRow>
        <S.ColCheckCell>
          <Checkbox
            onChange={(e) => {
              checkboxSelectAll(e.target.checked);
            }}
            checked={!farmersList.some((user: farmerDetail) => user?.isChecked !== true)}
          />
        </S.ColCheckCell>
        <S.WebTableCell>உறுப்பினர் எண்</S.WebTableCell>
        <S.WebTableCell>பெயர்</S.WebTableCell>
        <S.WebTableCell>கைபேசி எண்</S.WebTableCell>
        <S.WebTableCell>குழு பெயர்</S.WebTableCell>
        <S.WebTableCell></S.WebTableCell>
        <S.TabTableCell>
          <Stack>
            <Checkbox />
          </Stack>
          <Stack>Farmers Details</Stack>
        </S.TabTableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
