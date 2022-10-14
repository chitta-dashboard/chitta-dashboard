import React, { FC } from "react";
import { ASCENDING, DESCENDING, NORMAL, SortOrder } from "../../../utils/constants";
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
        onClick={() => {
          sortHandler && sortHandler(sortFilter === NORMAL ? ASCENDING : sortFilter === ASCENDING ? DESCENDING : NORMAL);
        }}
        tooltip={sortFilter}
      >
        {sortFilter === NORMAL ? "sort" : sortFilter === ASCENDING ? "ascending" : "descending"}
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
