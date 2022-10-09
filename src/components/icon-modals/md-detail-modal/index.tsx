import { FC } from "react";
import { Switch } from "@mui/material";
import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";
import S from "../iconModals.styled";

const MdDetailModal: FC<CommonModalProps> = ({ check, open, handleClose, handleDelete, handleEdit, handleCheck }) => {
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
        <S.IconBox
          onClick={() => {
            if (handleCheck) handleCheck();
          }}
        >
          <Switch size="small" checked={!!check} />
          <S.IconText>Active</S.IconText>
        </S.IconBox>
      </S.IconStack>
    </CommonIconModal>
  );
};

export default MdDetailModal;
