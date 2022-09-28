import { FC } from "react";

import LeftSection from "./left-section";
import RightSection from "./right-section";

import S from "./tablePageHeader.styled";
interface TablePageHeaderProps {
  addModalHandler?: () => void;
}

const TablePageHeader: FC<TablePageHeaderProps> = (props) => {
  return (
    <S.PageHeaderContainer>
      <LeftSection />
      <RightSection addModalHandler={props.addModalHandler} />
    </S.PageHeaderContainer>
  );
};

export default TablePageHeader;
