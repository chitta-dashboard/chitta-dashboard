import IconWrapper from "../../../../utils/iconWrapper";
import SearchBar from "../../../common-components/search-bar";

import S from "./leftSection.styled";

const LeftSection = () => {
  return (
    <S.LeftSectionContainer>
      <SearchBar />
      <IconWrapper>sort</IconWrapper>
    </S.LeftSectionContainer>
  );
};

export default LeftSection;
