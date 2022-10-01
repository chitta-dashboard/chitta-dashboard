import React from "react";

import { S } from "./optionCard.styled";

type Props = {};

const OptionCard = (props: Props) => {
  return (
    <>
      <S.OptionCardBox>
        <S.Options>Today</S.Options>
        <S.Options>Week</S.Options>
        <S.Options>Month</S.Options>
        <S.Options>Year</S.Options>
        <S.Options>All</S.Options>
      </S.OptionCardBox>
    </>
  );
};

export default OptionCard;
