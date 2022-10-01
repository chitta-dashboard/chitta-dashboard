import { FC } from "react";
import IconWrapper from "../../../../utils/iconWrapper";
import SearchBar from "../../../common-components/search-bar";

import S from "./leftSection.styled";

interface CustomProps {
  searchHandler?: (searchText: string) => void;
}

const LeftSection: FC<CustomProps> = ({ searchHandler }) => {
  return (
    <S.LeftSectionContainer>
      <SearchBar searchHandler={searchHandler} />
      <IconWrapper>sort</IconWrapper>
    </S.LeftSectionContainer>
  );
};

export default LeftSection;
