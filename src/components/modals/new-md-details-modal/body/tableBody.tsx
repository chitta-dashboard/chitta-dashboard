import { FC } from "react";
import { farmerDetail } from "../../../../utils/context/farmersDetails";
import S from "./tableData.styled";

interface Props {
  farmerData: farmerDetail;
  selectedFarmerKeys: string[];
  handleCheckBox: (id: string) => void;
}

const TableBody: FC<Props> = (props) => {
  const { farmerData, selectedFarmerKeys, handleCheckBox } = props;
  return (
    <S.MdDetailsTableBodyContainer key={farmerData.id}>
      <S.MdDetailsTableCheckBox onChange={() => handleCheckBox(farmerData.id)} checked={selectedFarmerKeys.includes(farmerData.id)} />
      <S.MdDetailsTableBodyNameContainer>
        <S.MdDetailsTableProfileImg src={farmerData.profile} alt="profile" />
        <S.MdDetailsTableHeadTitle>{farmerData.name}</S.MdDetailsTableHeadTitle>
      </S.MdDetailsTableBodyNameContainer>
      <S.MdDetailsTableHeadTitle>{farmerData.phoneNumber}</S.MdDetailsTableHeadTitle>
    </S.MdDetailsTableBodyContainer>
  );
};

export default TableBody;
