import React from "react";

import S from "./rightSection.styled";
import SelectDropDown from "../../../common-components/select-dropdown";

const RightSection = () => {
  return (
    <S.RightSectionContainer>
      <S.DropdownStack>
        <SelectDropDown />
      </S.DropdownStack>
      <S.ButtonStack>
        <S.CustomButton>Share Holder</S.CustomButton>
        <S.CustomButton>Export Farmers</S.CustomButton>
        <S.CustomButton>Add</S.CustomButton>
      </S.ButtonStack>
    </S.RightSectionContainer>
  );
};

export default RightSection;
