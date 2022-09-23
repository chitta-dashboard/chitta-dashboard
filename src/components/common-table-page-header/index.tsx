import React, { FC } from "react";

import LeftSection from "./left-section";
import RightSection from "./right-section";

import S from "./tablePageHeader.styled";
interface TableProps {
  addMdDetailsModalHandler?: () => void;
  addFarmersGroupModalHandler?: () => void;
}
const TablePageHeader: FC<TableProps> = ({ addMdDetailsModalHandler, addFarmersGroupModalHandler }) => {
  return (
    <S.PageHeaderContainer>
      <LeftSection />
      <RightSection addMdDetailsModalHandler={addMdDetailsModalHandler} addFarmersGroupModalHandler={addFarmersGroupModalHandler} />
    </S.PageHeaderContainer>
  );
};

export default TablePageHeader;
