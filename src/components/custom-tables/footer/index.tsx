import React, { FC, useState } from "react";
import { TableRow, TableCell, Pagination } from "@mui/material";
import S from "./footerWrapper";
import { PagesRounded } from "@mui/icons-material";

interface pageHandlerProps {
  count: number;
  page?: number | undefined;
  totalCount: number;
  rowsPerPage: number;
  handlePageCount?: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const FooterWrapper: FC<pageHandlerProps> = ({ count, page, totalCount, rowsPerPage, handlePageCount }) => {
  return (
    <S.Footer>
      <TableRow>
        <TableCell colSpan={5}>
          <S.PageStack>
            <S.PageNoDetails>
              Showing {((page as number) - 1) * rowsPerPage + 1} -
              {((page as number) - 1) * rowsPerPage + rowsPerPage > totalCount ? totalCount : (page as number - 1) * rowsPerPage + rowsPerPage} out of{" "}
              {totalCount}
            </S.PageNoDetails>
            <Pagination page={page} count={count} onChange={handlePageCount} variant="outlined" shape="rounded" size="medium" />
          </S.PageStack>
        </TableCell>
      </TableRow>
    </S.Footer>
  );
};

export default FooterWrapper;
