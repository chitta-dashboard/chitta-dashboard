import { FC } from "react";
import LeftSection from "./left-section";
import RightSection from "./right-section";
import S from "./tablePageHeader.styled";

interface TablePageHeaderProps {
  addModalHandler?: () => void;
  searchHandler?: (searchText: string) => void;
  sortHandler?: (sortOrder: "ascending" | "descending") => void;
  sortFilter?: "ascending" | "descending";
}

const TablePageHeader: FC<TablePageHeaderProps> = ({ searchHandler, addModalHandler, sortHandler, sortFilter }) => {
  return (
    <S.PageHeaderContainer>
      <LeftSection searchHandler={searchHandler} />
      <RightSection addModalHandler={addModalHandler} sortHandler={sortHandler} sortFilter={sortFilter} />
    </S.PageHeaderContainer>
  );
};

export default TablePageHeader;
