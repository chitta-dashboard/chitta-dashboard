import { FC } from "react";
import SearchBar from "../../common-components/search-bar";
import S from "./leftSection.styled";

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
