import React from "react";

import SearchBar from "../../common-components/search-bar";

import S from "./leftSection.styled";

const LeftSection = () => {
  return (
    <S.LeftSectionContainer>
      <SearchBar />
    </S.LeftSectionContainer>
  );
};

export default LeftSection;
