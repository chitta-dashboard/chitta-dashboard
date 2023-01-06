import { FC } from "react";
import S from "./tablePageHeader.styled";
import { SortOrder } from "../../utils/constants";
import LeftSection from "./left-section";
import RightSection from "./right-section";

interface TablePageHeaderProps {
  addModalHandler?: () => void;
  searchHandler?: (searchText: string) => void;
  sortHandler?: (sortOrder: SortOrder) => void;
  sortFilter?: SortOrder;
  popOverHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TablePageHeader: FC<TablePageHeaderProps> = (props) => {
  const { searchHandler, addModalHandler, popOverHandler } = props;
  return (
    <S.PageHeaderContainer>
      <LeftSection searchHandler={searchHandler} />
      <RightSection addModalHandler={addModalHandler} popOverHandler={popOverHandler} />
    </S.PageHeaderContainer>
  );
};

export default TablePageHeader;
