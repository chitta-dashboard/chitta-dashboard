import { FC } from "react";
import S from "../iconModals.styled";
import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";

const FounderDetailsIconModal: FC<CommonModalProps> = (props) => {
  const { open, handleClose, handleDelete, handleEdit, handleIdCard } = props;
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
          <S.Icon onClick={handleIdCard}>id-card</S.Icon>
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

export default FounderDetailsIconModal;
