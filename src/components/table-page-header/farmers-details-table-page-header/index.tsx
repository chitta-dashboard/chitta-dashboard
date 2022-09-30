import { FC } from "react";
import LeftSection from "./left-section";
import RightSection from "./right-section";

import S from "./farmersDetailsTablePageHeader.styled";

interface TablePageHeaderProps {
  addModalHandler?: () => void;
  searchHandler?: (searchText: string) => void;
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
