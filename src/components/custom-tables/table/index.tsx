import React from "react";

import { Props } from "../header";

import S from "./tableWrapper.styled";

const TableWrapper = ({ children }: Props) => {
  return (
    <S.PaperBox>
      <S.TableContainerBox>
        <S.TableBox stickyHeader aria-label="sticky table">
          {children}
        </S.TableBox>
      </S.TableContainerBox>
    </S.PaperBox>
  );
};
export default TableWrapper;
