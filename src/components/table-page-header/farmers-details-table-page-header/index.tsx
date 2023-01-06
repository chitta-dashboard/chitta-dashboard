import { FC } from "react";
import S from "./farmersDetailsTablePageHeader.styled";
import LeftSection from "./left-section";
import RightSection from "./right-section";

interface TablePageHeaderProps {
  addModalHandler?: () => void;
  searchHandler?: (searchText: string) => void;
  shareAmountModalHandler?: () => void;
}

const FarmersDetailsTablePageHeader: FC<TablePageHeaderProps> = ({ addModalHandler, searchHandler }) => {
  return (
    <S.PageHeaderContainer>
      <LeftSection searchHandler={searchHandler} />
      <RightSection addModalHandler={addModalHandler} />
    </S.PageHeaderContainer>
  );
};

export default FarmersDetailsTablePageHeader;
