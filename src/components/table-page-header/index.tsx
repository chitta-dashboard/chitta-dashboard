import React from "react";

import LeftSection from "./left-section";
import RightSection from "./right-section";

import S from "./tablePageHeader.styled";

const TablePageHeader = () => {
  return (
    <S.PageHeaderContainer>
      <LeftSection />
      <RightSection />
    </S.PageHeaderContainer>
  );
};

export default TablePageHeader;
