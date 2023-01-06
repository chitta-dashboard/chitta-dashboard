import React, { FC } from "react";
import S from "./rightSection.styled";
import IconWrapper from "../../../utils/iconWrapper";

interface RightSectionProps {
  addModalHandler?: () => void;
  popOverHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RightSection: FC<RightSectionProps> = ({ addModalHandler, popOverHandler }) => {
  return (
    <S.RightSectionContainer>
      <IconWrapper onClick={popOverHandler}>filter</IconWrapper>

      <S.CustomButton
        onClick={() => {
          addModalHandler && addModalHandler();
        }}
      >
        Add
      </S.CustomButton>
    </S.RightSectionContainer>
  );
};

export default RightSection;
