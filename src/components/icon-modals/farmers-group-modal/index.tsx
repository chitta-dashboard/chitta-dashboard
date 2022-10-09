import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";
import S from "../iconModals.styled";

const FarmersGroupModal = (props: CommonModalProps) => {
  return (
    <CommonIconModal open={props.open} handleClose={props.handleClose}>
      <S.IconStack direction={"row"}>
        <S.IconBox
          onClick={() => {
            if (props.handleDelete) props.handleDelete();
          }}
        >
          <S.Icon>delete</S.Icon>
          <S.IconText>Delete</S.IconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => {
            if (props.handleEdit) props.handleEdit();
          }}
        >
          <S.Icon>edit</S.Icon>
          <S.IconText>Edit</S.IconText>
        </S.IconBox>
      </S.IconStack>
    </CommonIconModal>
  );
};

export default FarmersGroupModal;
