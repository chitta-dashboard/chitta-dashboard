import React, { useState, useRef, FC } from "react";
import { TableRow } from "@mui/material";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { fileValidation } from "../../../../utils/constants";
import MdDetailModal from "../../../icon-modals/md-detail-modal";
import MdDetailsModal from "../../../modals/md-details-modal";
import DeleteModal from "../../../modals/delete-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import userPic from "../../../../assets/images/user.png";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";

interface MdDetailsRowProps {
  user: mdDetail;
}

const MdDetailsRow: FC<MdDetailsRowProps> = ({ user }) => {
  const { editMdDetail, deleteMdDetail } = useMdDetailsContext();
  const [image, setImage] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<mdDetail>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const hiddenFileInput: any = useRef<HTMLInputElement>();

  // Tab IconModal Open & Close Handler
  const iconModalHandler = () => {
    setIconModal(!iconModal);
  };

  //Edit MdDetail Handler
  const editMdDetailHandler = () => {
    setEditMode(!editMode);
  };

  //Update MdDetail Handler
  const updateMdDetail = (data: mdDetail) => {
    setEditData(data);
    confirmHandler();
  };

  // Delete ModalHandler
  const deleteModalHandler = () => {
    setDeleteModal(!deleteModal);
  };

  // confirm Handler
  const confirmHandler = () => {
    setConfirmModal(!confirmModal);
  };

  const getURL = (data: mdDetail) => {
    return data["profile"];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let isValid = e.target && fileValidation(e.target.files[0].name);
    e.target.files && isValid && setImage(window.URL.createObjectURL(e.target.files[0]));
    return false;
  };

  // this function is to clear the value of input field, so we can upload same file as many time has we want.
  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  const handleIconClick = (id: string) => {
    hiddenFileInput && hiddenFileInput.current.click();
  };

  const handleCroppedImage = (image: string) => {
    if (!image) return;
    user["profile"] = image;
    editMdDetail({ ...user });
  };

  return (
    <>
      <TableRow key={user.id}>
        <S.TabCell>
          <CS.Icon onClick={iconModalHandler}>three-dots</CS.Icon>
        </S.TabCell>
        <S.Cell title="பெயர்">
          <S.NameStack>
            <S.AvatarBox>
              <S.AvatarImg alt="User-img" src={getURL(user) ? getURL(user) : userPic} />
              <S.EditBox onClick={() => handleIconClick(user.id)}>
                <S.EditIcon>edit</S.EditIcon>
                <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
              </S.EditBox>
            </S.AvatarBox>
            {user.name}
          </S.NameStack>
        </S.Cell>
        <S.Cell title="பிறந்த தேதி">{user.dob}</S.Cell>
        <S.Cell title="கைபேசி எண்">{user.phoneNumber}</S.Cell>
        <S.Cell title="தகுதி">{user.qualification}</S.Cell>
        <S.WebTableCell>
          <S.IconBox>
            <CS.Icon onClick={deleteModalHandler}>delete</CS.Icon>
            <CS.Icon>id-card</CS.Icon>
            <CS.Icon onClick={editMdDetailHandler}>edit</CS.Icon>
            <S.Toggle checked={!!user.id} onChange={confirmHandler} />
          </S.IconBox>
        </S.WebTableCell>
        <MdDetailModal
          open={iconModal}
          handleClose={() => setIconModal(false)}
          handleDelete={() => {
            setDeleteModal(true);
          }}
          handleEdit={() => {
            setEditMode(true);
          }}
          check={user.id}
          handleConfirm={() => {
            setConfirmModal(true);
          }}
        />

        <DeleteModal
          openModal={deleteModal}
          handleClose={() => setDeleteModal(false)}
          handleDelete={() => {
            deleteMdDetail(user.id);
            setDeleteModal(false);
            setIconModal(false);
          }}
          deleteMessage={
            <>
              Do you want to remove <CS.Bold>{user.name}</CS.Bold> from MD Details?
            </>
          }
        />
        <MdDetailsModal openModal={editMode} handleClose={() => setEditMode(false)} cb={updateMdDetail} editMode={editMode} id={user.id} />
        <ConfirmationModal
          openModal={confirmModal}
          handleClose={() => setConfirmModal(false)}
          yesAction={() => {
            !editMode && deleteMdDetail(user.id);
            editMode && editData && editMdDetail(editData);
            setEditMode(false);
            setConfirmModal(false);
            setIconModal(false);
          }}
          confirmMessage={
            !editMode && (
              <>
                Do you want to remove <CS.Bold>{user.name}</CS.Bold> from MD Details?
              </>
            )
          }
        />
        {image && (
          <td>
            <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />
          </td>
        )}
      </TableRow>
    </>
  );
};

export default MdDetailsRow;
