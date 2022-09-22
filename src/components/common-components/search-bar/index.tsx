
import React from "react";

import { IconGreen } from "../../dashboard/dashboard-cards/common-styles/commonStyles.styled";
import S from "./dashboardSearch.styled";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <>
      <S.SearchBarPaper>
        <IconGreen>search</IconGreen>
        <S.SearchBar placeholder="  Search..." />
      </S.SearchBarPaper>
    </>
  );
};

export default SearchBar;
