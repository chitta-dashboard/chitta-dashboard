import { FC } from "react";
import LeftSection from "./left-section";
import RightSection from "./right-section";
import S from "./farmersDetailsTablePageHeader.styled";

interface TablePageHeaderProps {
  addModalHandler?: () => void;
  searchHandler?: (searchText: string) => void;
  shareAmountModalHandler?: () => void;
}

const FarmersDetailsTablePageHeader: FC<TablePageHeaderProps> = (props) => {
  //constants
  const { addModalHandler, searchHandler } = props;

  return (
    <S.PageHeaderContainer>
      <LeftSection searchHandler={searchHandler} />
      <RightSection addModalHandler={addModalHandler} />
    </S.PageHeaderContainer>
  );
};

export default FarmersDetailsTablePageHeader;
