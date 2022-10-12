import { FC } from "react";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import S from "./tableData.styled";

interface Props {
  mdData: mdDetail;
}

const TableBody: FC<Props> = ({ mdData }) => {
  const { selectedMdListData, checkboxSelect } = useMdDetailsContext();
  return (
    <S.MdDetailsTableBodyContainer key={mdData.id}>
      <S.MdDetailsTableCheckBox onChange={() => checkboxSelect(mdData.id)} checked={selectedMdListData.includes(mdData.id)} />
      <S.MdDetailsTableBodyNameContainer>
        <S.MdDetailsTableProfileImg src={mdData.profile} alt="profile" />
        <S.MdDetailsTableHeadTitle>{mdData.name}</S.MdDetailsTableHeadTitle>
      </S.MdDetailsTableBodyNameContainer>
      <S.MdDetailsTableHeadTitle>{mdData.phoneNumber}</S.MdDetailsTableHeadTitle>
    </S.MdDetailsTableBodyContainer>
  );
};

export default TableBody;
