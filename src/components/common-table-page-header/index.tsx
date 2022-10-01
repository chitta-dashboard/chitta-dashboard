import { FC } from "react";

import LeftSection from "./left-section";
import RightSection from "./right-section";

import S from "./tablePageHeader.styled";
interface TablePageHeaderProps {
  addModalHandler?: () => void;
  searchHandler?: (searchText: string) => void;
}

const TablePageHeader: FC<TablePageHeaderProps> = ({ searchHandler, addModalHandler }) => {
  return (
    <S.PageHeaderContainer>
      <LeftSection searchHandler={searchHandler} />
      <RightSection addModalHandler={addModalHandler} />
    </S.PageHeaderContainer>
  );
};

export default TablePageHeader;
