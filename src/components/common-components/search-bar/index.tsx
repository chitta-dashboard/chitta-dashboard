import React, { forwardRef, MutableRefObject, useContext, useRef } from "react";
import { mdDetailsContext, useMdDetailsContext } from "../../../utils/context/mdDetails";

import { IconGreen } from "../../dashboard/dashboard-cards/common-styles/commonStyles.styled";
import S from "./dashboardSearch.styled";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

const SearchBar = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { filterMdDetail } = useMdDetailsContext();

  return (
    <>
      <S.SearchBarPaper>
        <IconGreen onClick={props.onClick}>search</IconGreen>
        <S.SearchBar
          ref={ref}
          placeholder="  Search..."
          onChange={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            filterMdDetail && filterMdDetail((ref as MutableRefObject<HTMLInputElement | undefined>)?.current?.value as string);
          }}
        />
      </S.SearchBarPaper>
    </>
  );
});
export default SearchBar;
