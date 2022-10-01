import { TableRow, TableCell, Pagination } from "@mui/material";

import S from "./footerWrapper";

const FooterWrapper = () => {
  return (
    <S.Footer>
      <TableRow>
        <TableCell colSpan={5}>
          <S.PageStack>
            <S.PageNoDetails>Showing 1 - 6 out of 9843</S.PageNoDetails>
            <Pagination count={99} variant="outlined" shape="rounded" size="medium" />
          </S.PageStack>
        </TableCell>
      </TableRow>
    </S.Footer>
  );
};

export default FooterWrapper;
