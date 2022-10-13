import { FC } from "react";
import { Switch } from "@mui/material";
import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";
import S from "../iconModals.styled";

const MdDetailModal: FC<CommonModalProps> = ({ ...props }) => {
  const { check, open, handleClose, handleDelete, handleEdit, handleConfirm } = props;
  return (
    <CommonIconModal open={open} handleClose={handleClose}>
      <S.IconStack direction={"row"}>
        <S.IconBox onClick={handleDelete}>
          <S.Icon>delete</S.Icon>
          <S.IconText>Delete</S.IconText>
        </S.IconBox>
        <S.IconBox>
          <S.Icon>id-card</S.Icon>
          <S.IconText>ID</S.IconText>
        </S.IconBox>
        <S.IconBox onClick={handleEdit}>
          <S.Icon>edit</S.Icon>
          <S.IconText>Edit</S.IconText>
        </S.IconBox>
        <S.IconBox onClick={handleConfirm}>
          <Switch size="small" checked={!!check} />
          <S.IconText>Active</S.IconText>
        </S.IconBox>
      </S.IconStack>
    </CommonIconModal>
  );
};

export default MdDetailModal;
