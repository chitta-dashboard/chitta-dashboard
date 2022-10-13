import S from "./tableData.styled";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import React, { FC, useState } from "react";
import MdDetailsTableBody from "./tableBody";
import { farmerDetail } from "../../../../utils/context/farmersDetails";

type TableDataPropsType = {
  farmerDetails: farmerDetail[];
  handleCheckBox: (id: string) => void;
  handleCheckBoxAll: () => void;
  selectedFarmerKeys: string[];
};

const TableData: FC<TableDataPropsType> = (props) => {
  const { farmerDetails, handleCheckBoxAll, handleCheckBox, selectedFarmerKeys } = props;
  return (
    <S.MdDetailsTableContainer>
      <S.MdDetailsTableHeadContainer container>
        <S.MdDetailsTableCheckBox checked={selectedFarmerKeys.length === Object.values(farmerDetails).length} onChange={handleCheckBoxAll} />
        <S.MdDetailsTableHeadTitle>பெயர்</S.MdDetailsTableHeadTitle>
        <S.MdDetailsTableHeadTitle>கைபேசி என்</S.MdDetailsTableHeadTitle>
      </S.MdDetailsTableHeadContainer>
      {farmerDetails.map((item) => (
        <React.Fragment key={item.id}>
          <MdDetailsTableBody farmerData={item} selectedFarmerKeys={selectedFarmerKeys} handleCheckBox={handleCheckBox} />
        </React.Fragment>
      ))}
    </S.MdDetailsTableContainer>
  );
};

export default TableData;
