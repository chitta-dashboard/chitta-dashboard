import { FC } from "react";
import S from "../iconModals.styled";
import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";

const FarmersDetailsIconModal: FC<CommonModalProps> = (props) => {
  const { open, handleClose, handleDelete, handleIdCard, handleEdit, handlePdfDownload } = props;
  return (
    <CommonIconModal open={open} handleClose={handleClose}>
      <S.IconStack direction={"row"}>
        <S.IconBox onClick={handleDelete}>
          <S.Icon>delete</S.Icon>
          <S.IconText>Delete</S.IconText>
        </S.IconBox>
        <S.IconBox onClick={handleIdCard}>
          <S.Icon onClick={handleIdCard}>id-card</S.Icon>
          <S.IconText>ID</S.IconText>
        </S.IconBox>
        <S.IconBox onClick={handleEdit}>
          <S.Icon>edit</S.Icon>
          <S.IconText>Edit</S.IconText>
        </S.IconBox>
        <S.IconBox onClick={handlePdfDownload}>
          <S.Icon>download</S.Icon>
          <S.IconText>PDF</S.IconText>
        </S.IconBox>
      </S.IconStack>
    </CommonIconModal>
  );
};

export default FarmersDetailsIconModal;
