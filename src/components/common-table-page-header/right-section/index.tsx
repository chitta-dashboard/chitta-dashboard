import React, { FC } from "react";

import IconWrapper from "../../../utils/iconWrapper";

import S from "./rightSection.styled";
interface TableProps {
  addMdDetailsModalHandler?: () => void;
  addFarmersGroupModalHandler?: () => void;
}

const RightSection: FC<TableProps> = ({ addMdDetailsModalHandler, addFarmersGroupModalHandler }) => {
  return (
    <S.RightSectionContainer>
      <IconWrapper>filter</IconWrapper>
      <IconWrapper>sort</IconWrapper>
      <S.CustomButton
        onClick={() => {
          if (addMdDetailsModalHandler) addMdDetailsModalHandler();
          if (addFarmersGroupModalHandler) addFarmersGroupModalHandler();
        }}
      >
        Add
      </S.CustomButton>
    </S.RightSectionContainer>
  );
};

export default RightSection;
