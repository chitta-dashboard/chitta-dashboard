import { FC } from "react";
import IconWrapper from "../../../../utils/iconWrapper";
import SearchBar from "../../../common-components/search-bar";
import S from "./leftSection.styled";

interface CustomProps {
  sortFilter?: "ascending" | "descending";
  sortHandler?: (sortOrder: "ascending" | "descending") => void;
  searchHandler?: (searchText: string) => void;
}

const LeftSection: FC<CustomProps> = ({ searchHandler, sortFilter, sortHandler }) => {
  return (
    <S.LeftSectionContainer>
      <SearchBar searchHandler={searchHandler} />
      <IconWrapper
        isGreen={sortFilter === "descending"}
        onClick={() => {
          sortHandler && sortHandler(sortFilter === "ascending" ? "descending" : "ascending");
        }}
        tooltip={sortFilter}
      >
        sort
      </IconWrapper>
    </S.LeftSectionContainer>
  );
};

export default LeftSection;
