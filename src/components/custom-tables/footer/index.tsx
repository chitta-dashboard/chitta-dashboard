import { FC } from "react";
import { TableRow, TableCell, Pagination } from "@mui/material";
import S from "./footerWrapper";

interface pageHandlerProps {
  count: number;
  page: number;
  totalCount: number;
  rowsPerPage: number;
}

const FooterWrapper: FC<pageHandlerProps> = ({ count, page, totalCount, rowsPerPage }) => {
  return (
    <S.Footer>
      <TableRow>
        <TableCell colSpan={5}>
          <S.PageStack>
            <S.PageNoDetails>
              Showing {(page - 1) * rowsPerPage + 1} -
              {(page - 1) * rowsPerPage + rowsPerPage > totalCount ? totalCount : (page - 1) * rowsPerPage + rowsPerPage} out of {totalCount}
            </S.PageNoDetails>
            <Pagination page={page} count={count} variant="outlined" shape="rounded" size="medium" />
          </S.PageStack>
        </TableCell>
      </TableRow>
    </S.Footer>
  );
};

export default FooterWrapper;
