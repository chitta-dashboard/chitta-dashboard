import { ChangeEvent, FC } from "react";
import { TableRow, TableCell, Pagination } from "@mui/material";

import S from "./footerWrapper";

interface pageHandlerProps {
  pageHandler: (e: ChangeEvent<unknown>, pageNo: number) => void;
  count: number;
  page: number;
  totalCount: number;
  rowsPerPage: number;
}

const FooterWrapper: FC<pageHandlerProps> = ({ pageHandler, count, page, totalCount, rowsPerPage }) => {
  return (
    <S.Footer>
      <TableRow>
        <TableCell colSpan={5}>
          <S.PageStack>
            <S.PageNoDetails>
              Showing {(page - 1) * rowsPerPage + 1} -{" "}
              {(page - 1) * rowsPerPage + rowsPerPage > totalCount ? totalCount : (page - 1) * rowsPerPage + rowsPerPage} out of {totalCount}
            </S.PageNoDetails>
            <Pagination page={page} count={count} variant="outlined" shape="rounded" size="medium" onChange={pageHandler} />
          </S.PageStack>
        </TableCell>
      </TableRow>
    </S.Footer>
  );
};

export default FooterWrapper;
