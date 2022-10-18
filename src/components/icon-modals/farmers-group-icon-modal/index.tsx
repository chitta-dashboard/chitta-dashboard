import { FC } from "react";
import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";
import S from "../iconModals.styled";

const FarmersGroupIconModal: FC<CommonModalProps> = (props) => {
  const { open, handleClose, handleDelete, handleEdit, deleteicon } = props;

  return (
    <CommonIconModal open={open} handleClose={handleClose}>
      <S.IconStack direction={"row"}>
        <S.IconBox onClick={handleDelete} deleteicon={deleteicon}>
          <S.Icon>delete</S.Icon>
          <S.IconText>Delete</S.IconText>
        </S.IconBox>
        <S.IconBox onClick={handleEdit}>
          <S.Icon>edit</S.Icon>
          <S.IconText>Edit</S.IconText>
        </S.IconBox>
      </S.IconStack>
    </CommonIconModal>
  );
};

export default FarmersGroupIconModal;
