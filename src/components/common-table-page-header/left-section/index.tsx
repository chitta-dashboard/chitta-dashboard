import React, { Ref, useRef } from "react";
import { useMdDetailsContext } from "../../../utils/context/md-details";

import SearchBar from "../../common-components/search-bar";

import S from "./leftSection.styled";

const LeftSection = () => {
  const { filterMdDetail } = useMdDetailsContext();
  const searchInputRef = useRef<HTMLInputElement>();

  return (
    <S.LeftSectionContainer>
      <SearchBar
        ref={searchInputRef as Ref<HTMLInputElement> | undefined}
        onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          filterMdDetail && filterMdDetail(searchInputRef?.current?.value as string);
        }}
      />
    </S.LeftSectionContainer>
  );
};

export default LeftSection;
