import React from "react";

import IconWrapper from "../../../utils/iconWrapper";

import S from "./rightSection.styled";

const RightSection = () => {
  return (
    <S.RightSectionContainer>
      <IconWrapper>filter</IconWrapper>
      <IconWrapper>sort</IconWrapper>
      <S.CustomButton variant="contained">Add</S.CustomButton>
    </S.RightSectionContainer>
  );
};

export default RightSection;
