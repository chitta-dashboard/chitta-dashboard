import { FC } from "react";
import LeftSection from "./left-section";
import RightSection from "./right-section";
import S from "./farmersDetailsTablePageHeader.styled";

interface TablePageHeaderProps {
  addModalHandler?: () => void;
  sortFilter?: "ascending" | "descending";
  sortHandler?: (sortOrder: "ascending" | "descending") => void;
  searchHandler?: (searchText: string) => void;
  shareAmountModalHandler?: () => void;
}

const FarmersDetailsTablePageHeader: FC<TablePageHeaderProps> = ({
  addModalHandler,
  searchHandler,
  sortHandler,
  sortFilter,
  shareAmountModalHandler,
}) => {
  return (
    <S.PageHeaderContainer>
      <LeftSection searchHandler={searchHandler} sortHandler={sortHandler} sortFilter={sortFilter} />
      <RightSection addModalHandler={addModalHandler} shareAmountModalHandler={shareAmountModalHandler} />
    </S.PageHeaderContainer>
  );
};

export default FarmersDetailsTablePageHeader;
