import React, { FC } from "react";
import MdDetailsTableBody from "./tableBody";
import { farmerDetail } from "../../../../utils/context/farmersDetails";
import S from "./tableData.styled";

type TableDataPropsType = {
  farmerDetails: farmerDetail[];
  handleCheckBox: (id: string) => void;
  handleCheckBoxAll: () => void;
  selectedFarmerKeys: string[];
  representative?: boolean;
};

const TableData: FC<TableDataPropsType> = (props) => {
  //constants
  const { farmerDetails, handleCheckBoxAll, handleCheckBox, selectedFarmerKeys, representative } = props;

  return (
    <S.MdDetailsTableContainer>
      <S.MdDetailsTableHeadContainer container>
        {!representative ? (
          <S.MdDetailsTableCheckBox checked={selectedFarmerKeys.length === farmerDetails.length} onChange={handleCheckBoxAll} />
        ) : (
          <p></p>
        )}
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
