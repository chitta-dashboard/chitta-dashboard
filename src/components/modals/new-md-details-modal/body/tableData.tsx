import S from "./tableData.styled";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import React, { FC } from "react";
import MdDetailsTableBody from "./tableBody";

type TableDataPropsType = {
  mdListData: mdDetail[];
};

const TableData: FC<TableDataPropsType> = ({ mdListData }) => {
  const { checkboxSelectAll } = useMdDetailsContext();
  return (
    <S.MdDetailsTableContainer>
      <S.MdDetailsTableHeadContainer container>
        <S.MdDetailsTableCheckBox onChange={() => checkboxSelectAll()} />
        <S.MdDetailsTableHeadTitle>பெயர்</S.MdDetailsTableHeadTitle>
        <S.MdDetailsTableHeadTitle>கைபேசி என்</S.MdDetailsTableHeadTitle>
      </S.MdDetailsTableHeadContainer>
      {mdListData.map((item) => (
        <React.Fragment key={item.id}>
          <MdDetailsTableBody mdData={item} />
        </React.Fragment>
      ))}
    </S.MdDetailsTableContainer>
  );
};

export default TableData;
