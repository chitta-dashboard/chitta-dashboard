import { useState } from "react";

import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";
import DeleteModal from "../../modals/delete-modal";

import S from "../iconModals.styled";

const MdDetailModal = (props: CommonModalProps) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteModalHandler = (id: number) => {
    setDeleteModal(!deleteModal);
  };
  return (
    <>
      <CommonIconModal open={props.open} handleClose={props.handleClose}>
        <S.IconStack direction={"row"}>
          <S.IconBox
            onClick={() => {
              setDeleteModal(true);
              //  All below comments has to remove.
              // deleteMdDetail(props.deleteId);
              //   if (props.deleteMdDetails) props.deleteMdDetails(props.deleteId as number);
              //   if (props.deleteFarmersGroup) props.deleteFarmersGroup(props.deleteId as number);
              //   if (props.deleteFarmersDetails) props.deleteFarmersDetails(props.deleteId as number);
            }}
          >
            <S.Icon>delete</S.Icon>
            <S.IconText>Delete</S.IconText>
          </S.IconBox>
          <S.IconBox>
            <S.Icon>id-card</S.Icon>
            <S.IconText>ID</S.IconText>
          </S.IconBox>
          <S.IconBox>
            <S.Icon>edit</S.Icon>
            <S.IconText>Edit</S.IconText>
          </S.IconBox>
        </S.IconStack>
      </CommonIconModal>
      <DeleteModal openModal={deleteModal} handleClose={deleteModalHandler} deleteId={props.deleteId} />
    </>
  );
};

export default MdDetailModal;
