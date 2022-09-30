import React, { forwardRef, MutableRefObject, useContext, useRef } from "react";
import { mdDetailsContext, useMdDetailsContext } from "../../../utils/context/mdDetails";

import { IconGreen } from "../../dashboard/dashboard-cards/common-styles/commonStyles.styled";
import S from "./dashboardSearch.styled";

type Props = {
  searchHandler?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

const SearchBar = forwardRef<HTMLInputElement, Props>(({ onClick, searchHandler }, ref) => {
  const { filterMdDetail } = useMdDetailsContext();

  return (
    <>
      <S.SearchBarPaper>
        <IconGreen onClick={onClick}>search</IconGreen>
        <S.SearchBar ref={ref} placeholder="  Search..." onChange={searchHandler} />
      </S.SearchBarPaper>
    </>
  );
});
export default SearchBar;
