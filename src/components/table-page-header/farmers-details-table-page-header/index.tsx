import React from "react";

import LeftSection from "./left-section";
import RightSection from "./right-section";

import S from "./farmersDetailsTablePageHeader.styled";

const FarmersDetailsTablePageHeader = () => {
  return (
    <S.PageHeaderContainer>
      <LeftSection />
      <RightSection />
    </S.PageHeaderContainer>
  );
};

export default FarmersDetailsTablePageHeader;
