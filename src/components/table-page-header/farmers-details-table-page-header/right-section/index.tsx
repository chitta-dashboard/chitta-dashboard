import React from "react";
import { Stack } from "@mui/material";

import S from "./rightSection.styled";
import SelectDropDown from "../../../common-components/select-dropdown";

const RightSection = () => {
  return (
    <S.RightSectionContainer>
      <Stack>
        <SelectDropDown />
      </Stack>
      <S.ButtonStack>
        <S.CustomButton>Share Holder</S.CustomButton>
        <S.CustomButton>Export Farmers</S.CustomButton>
        <S.CustomButton>Add</S.CustomButton>
      </S.ButtonStack>
    </S.RightSectionContainer>
  );
};

export default RightSection;
