import { FC } from "react";
import IconWrapper from "../../../../utils/iconWrapper";
import SearchBar from "../../../common-components/search-bar";
import { ASCENDING, DESCENDING, NORMAL, SortOrder } from "../../../../utils/constants";
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
        onClick={() => {
          sortHandler && sortHandler(sortFilter === NORMAL ? ASCENDING : sortFilter === ASCENDING ? DESCENDING : NORMAL);
        }}
        tooltip={sortFilter}
      >
        {sortFilter === NORMAL ? "sort" : sortFilter === ASCENDING ? "ascending" : "descending"}
      </IconWrapper>
    </S.LeftSectionContainer>
  );
};

export default LeftSection;
