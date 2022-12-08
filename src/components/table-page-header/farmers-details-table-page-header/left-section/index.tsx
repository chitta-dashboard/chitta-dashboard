import { FC } from "react";
import SearchBar from "../../../common-components/search-bar";
import SelectDropDown from "../../../common-components/select-dropdown";
import S from "./leftSection.styled";

interface CustomProps {
  searchHandler?: (searchText: string) => void;
}

const LeftSection: FC<CustomProps> = ({ searchHandler }) => {
  return (
    <S.LeftSectionContainer>
      <SearchBar searchHandler={searchHandler} />
      <S.DropdownStack>
        <SelectDropDown />
      </S.DropdownStack>
    </S.LeftSectionContainer>
  );
};

export default LeftSection;
