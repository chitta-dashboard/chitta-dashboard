import React from "react";

import S from "./dashboardSearch.styled";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <S.SearchBarPaper>
      <i>search</i>
      <S.SearchBar placeholder="  Search..." />
    </S.SearchBarPaper>
  );
};

export default SearchBar;
