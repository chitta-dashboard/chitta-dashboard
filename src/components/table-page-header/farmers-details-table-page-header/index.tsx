import { FC } from "react";
import LeftSection from "./left-section";
import RightSection from "./right-section";

import S from "./farmersDetailsTablePageHeader.styled";

interface TablePageHeaderProps {
  addModalHandler?: () => void;
}

const FarmersDetailsTablePageHeader: FC<TablePageHeaderProps> = (props) => {
  return (
    <S.PageHeaderContainer>
      <LeftSection />
      <RightSection addModalHandler={props.addModalHandler} />
    </S.PageHeaderContainer>
  );
};

export default FarmersDetailsTablePageHeader;
