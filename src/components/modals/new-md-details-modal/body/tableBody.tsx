import { FC } from "react";
import S from "./tableData.styled";
import placeHolderImg from "../../../../assets/images/profile-placeholder.jpg";
import { decryptText } from "../../../../utils/constants";
import { farmerDetail } from "../../../../utils/context/farmersDetails";

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
        <S.MdDetailsTableProfileImg src={farmerData.profile ? decryptText(farmerData.profile) : placeHolderImg} alt="profile" />
        <S.MdDetailsTableHeadTitle>{farmerData.name}</S.MdDetailsTableHeadTitle>
      </S.MdDetailsTableBodyNameContainer>
      <S.MdDetailsTableHeadTitle>{farmerData.phoneNumber}</S.MdDetailsTableHeadTitle>
    </S.MdDetailsTableBodyContainer>
  );
};

export default TableBody;
