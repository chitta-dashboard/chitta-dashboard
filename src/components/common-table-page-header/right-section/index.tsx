import { FC } from "react";

import IconWrapper from "../../../utils/iconWrapper";

import S from "./rightSection.styled";
interface RightSectionProps {
  addModalHandler?: () => void;
}

const RightSection: FC<RightSectionProps> = (props) => {
  return (
    <S.RightSectionContainer>
      <IconWrapper>filter</IconWrapper>
      <IconWrapper>sort</IconWrapper>
      <S.CustomButton
        onClick={() => {
          if (props.addModalHandler) props.addModalHandler();
        }}
      >
        Add
      </S.CustomButton>
    </S.RightSectionContainer>
  );
};

export default RightSection;
