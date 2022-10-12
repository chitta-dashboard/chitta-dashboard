import { FC } from "react";
import IconWrapper from "../../../../utils/iconWrapper";
import SearchBar from "../../../common-components/search-bar";
import { ASCENDING, DESCENDING, SortOrder } from "../../../../utils/constants";
import S from "./leftSection.styled";

interface CustomProps {
  sortFilter?: SortOrder;
  sortHandler?: (sortOrder: SortOrder) => void;
  searchHandler?: (searchText: string) => void;
}

const LeftSection: FC<CustomProps> = ({ searchHandler, sortFilter, sortHandler }) => {
  return (
    <S.LeftSectionContainer>
      <SearchBar searchHandler={searchHandler} />
      <IconWrapper
        isGreen={sortFilter === DESCENDING}
        onClick={() => {
          sortHandler && sortHandler(sortFilter === ASCENDING ? DESCENDING : ASCENDING);
        }}
        tooltip={sortFilter}
      >
        sort
      </IconWrapper>
    </S.LeftSectionContainer>
  );
};

export default LeftSection;
