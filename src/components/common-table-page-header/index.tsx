import { FC } from "react";
import LeftSection from "./left-section";
import RightSection from "./right-section";
import S from "./tablePageHeader.styled";

interface TablePageHeaderProps {
  addModalHandler?: () => void;
  searchHandler?: (searchText: string) => void;
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
