import React, { FC } from "react";

import IconWrapper from "../../../utils/iconWrapper";
import S from "./rightSection.styled";

interface RightSectionProps {
  addModalHandler?: () => void;
  popOverHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RightSection: FC<RightSectionProps> = (props) => {
  //constants
  const { addModalHandler, popOverHandler } = props;

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
