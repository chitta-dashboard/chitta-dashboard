import S from "./tableData.styled";

const TableData = () => {
  return (
    <S.MdDetailsTableContainer>
      <S.MdDetailsTableHeadContainer container>
        <S.MdDetailsTableCheckBox />
        <S.MdDetailsTableHeadTitle>பெயர்</S.MdDetailsTableHeadTitle>
        <S.MdDetailsTableHeadTitle>கைபேசி என்</S.MdDetailsTableHeadTitle>
      </S.MdDetailsTableHeadContainer>
    </S.MdDetailsTableContainer>
  );
};

export default TableData;
