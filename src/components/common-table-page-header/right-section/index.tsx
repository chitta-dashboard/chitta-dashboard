import React, { FC } from "react";
import IconWrapper from "../../../utils/iconWrapper";
import S from "./rightSection.styled";

interface RightSectionProps {
  addModalHandler?: () => void;
  sortHandler?: (sortOrder: "ascending" | "descending") => void;
  sortFilter?: "ascending" | "descending";
  popOverHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RightSection: FC<RightSectionProps> = ({ addModalHandler, sortFilter, sortHandler, popOverHandler }) => {
  return (
    <S.RightSectionContainer>
      <IconWrapper onClick={popOverHandler}>filter</IconWrapper>
      <IconWrapper
        isGreen={sortFilter === "descending"}
        onClick={() => {
          sortHandler && sortHandler(sortFilter === "ascending" ? "descending" : "ascending");
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
