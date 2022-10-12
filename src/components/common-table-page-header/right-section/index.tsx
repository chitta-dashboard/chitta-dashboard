import React, { FC } from "react";
import { ASCENDING, DESCENDING, SortOrder } from "../../../utils/constants";
import IconWrapper from "../../../utils/iconWrapper";
import S from "./rightSection.styled";

interface RightSectionProps {
  addModalHandler?: () => void;
  sortHandler?: (sortOrder: SortOrder) => void;
  sortFilter?: SortOrder;
  popOverHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RightSection: FC<RightSectionProps> = ({ addModalHandler, sortFilter, sortHandler, popOverHandler }) => {
  return (
    <S.RightSectionContainer>
      <IconWrapper onClick={popOverHandler}>filter</IconWrapper>
      <IconWrapper
        isGreen={sortFilter === DESCENDING}
        onClick={() => {
          sortHandler && sortHandler(sortFilter === ASCENDING ? DESCENDING : ASCENDING);
        }}
        tooltip={sortFilter}
      >
        sort
      </IconWrapper>
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
