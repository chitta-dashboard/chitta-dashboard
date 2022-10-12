import { FC } from "react";
import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";
import S from "../iconModals.styled";

const FoundersModal: FC<CommonModalProps> = (props) => {
  const { open, handleClose, handleDelete, handleEdit } = props;
  return (
    <CommonIconModal open={open} handleClose={handleClose}>
      <S.IconStack direction={"row"}>
        <S.IconBox
          onClick={() => {
            if (handleDelete) handleDelete();
          }}
        >
          <S.Icon>delete</S.Icon>
          <S.IconText>Delete</S.IconText>
        </S.IconBox>
        <S.IconBox>
          <S.Icon>id-card</S.Icon>
          <S.IconText>ID</S.IconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => {
            if (handleEdit) handleEdit();
          }}
        >
          <S.Icon>edit</S.Icon>
          <S.IconText>Edit</S.IconText>
        </S.IconBox>
      </S.IconStack>
    </CommonIconModal>
  );
};

export default FoundersModal;
