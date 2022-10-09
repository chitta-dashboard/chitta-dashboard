import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";
import S from "../iconModals.styled";

const FarmersDetailsModal = (props: CommonModalProps) => {
  return (
    <CommonIconModal
      open={props.open}
      handleClose={props.handleClose}
      generateIdCard={props.generateIdCard}
      generateFarmerDetailForm={props.generateFarmerDetailForm}
    >
      <S.IconStack direction={"row"}>
        <S.IconBox
          onClick={() => {
            if (props.handleDelete) props.handleDelete();
          }}
        >
          <S.Icon>delete</S.Icon>
          <S.IconText>Delete</S.IconText>
        </S.IconBox>
        <S.IconBox onClick={props.generateIdCard}>
          <S.Icon>id-card</S.Icon>
          <S.IconText>ID</S.IconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => {
            if (props.handleEdit) props.handleEdit();
          }}
        >
          <S.Icon>edit</S.Icon>
          <S.IconText>Edit</S.IconText>
        </S.IconBox>
        <S.IconBox onClick={props.generateFarmerDetailForm}>
          <S.Icon>download</S.Icon>
          <S.IconText>PDF</S.IconText>
        </S.IconBox>
      </S.IconStack>
    </CommonIconModal>
  );
};

export default FarmersDetailsModal;
