import React, { FC } from "react";
import MdDetailsTableBody from "./tableBody";
import { farmerDetail } from "../../../../utils/store/slice/farmerDetails";
import S from "./tableData.styled";

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
        <S.MdDetailsTableCheckBox checked={selectedFarmerKeys.length === farmerDetails.length} onChange={handleCheckBoxAll} />
        <S.MdDetailsTableHeadTitle>பெயர்</S.MdDetailsTableHeadTitle>
        <S.MdDetailsTableHeadTitle>கைபேசி என்</S.MdDetailsTableHeadTitle>
      </S.MdDetailsTableHeadContainer>
      <S.MdDetailsTableBodyWrapper>
        {farmerDetails.map((item) => (
          <React.Fragment key={item.id}>
            <MdDetailsTableBody farmerData={item} selectedFarmerKeys={selectedFarmerKeys} handleCheckBox={handleCheckBox} />
          </React.Fragment>
        ))}
      </S.MdDetailsTableBodyWrapper>
    </S.MdDetailsTableContainer>
  );
};

export default TableData;
