import { FC } from "react";
import S from "./leftSection.styled";
import SearchBar from "../../common-components/search-bar";

interface CustomProps {
  searchHandler?: (searchString: string) => void;
}

const LeftSection: FC<CustomProps> = ({ searchHandler }) => {
  return (
    <S.LeftSectionContainer>
      <SearchBar searchHandler={searchHandler} />
    </S.LeftSectionContainer>
  );
};

export default LeftSection;
