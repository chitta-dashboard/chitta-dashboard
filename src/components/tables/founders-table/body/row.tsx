import { FC, useRef, useState } from "react";
import { TableRow } from "@mui/material";
import { Founders, useFounderContext } from "../../../../utils/context/founders";
import { fileValidation } from "../../../../utils/constants";
import FounderDetailsIconModal from "../../../icon-modals/founder-details-icon-modal";
import FoundersModal from "../../../modals/founders-modal";
import IdCardModal from "../../../modals/id-download-modal";
import DeleteModal from "../../../modals/delete-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import userPic from "../../../../assets/images/user.png";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";

interface FoundersRowProp {
  user: Founders;
}

const FoundersRow: FC<FoundersRowProp> = ({ user }) => {
  const { editFounder, deleteFounder } = useFounderContext();
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const [image, setImage] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<Founders>();
  const [idCard, setIdCard] = useState(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  // Tab IconModal Open & Close Handler
  const iconModalHandler = () => setIconModal(!iconModal);

  //Edit Founders Handler
  const editFoundersHandler = () => setEditMode(!editMode);

  //Update Founders Handler
  const updateFounders = (data: Founders) => {
    setEditData(data);
    confirmModalHandler();
  };

  // ID Card Modal Handler
  const idCardhandler = () => setIdCard(!idCard);

  // Delete Modal Handler
  const deleteModalHandler = () => setDeleteModal(!deleteModal);

  // confirm Modal Handler
  const confirmModalHandler = () => setConfirmModal(!confirmModal);

  const getURL = (data: Founders) => data["profile"];

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

  const handleIconClick = () => hiddenFileInput && hiddenFileInput.current.click();

  const handleCroppedImage = (image: string) => {
    if (!image) return;
    user["profile"] = image;
    editFounder({ ...user });
  };

  return (
    <TableRow>
      <S.TabCell>
        <CS.Icon onClick={iconModalHandler}>three-dots</CS.Icon>
      </S.TabCell>
      <S.Cell title="பெயர்">
        <S.NameStack>
          <S.AvatarBox>
            <S.AvatarImg alt="User-img" src={getURL(user) ? getURL(user) : userPic} />
            <S.EditBox onClick={handleIconClick}>
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
          <CS.Icon onClick={idCardhandler}>id-card</CS.Icon>
          <CS.Icon onClick={editFoundersHandler}>edit</CS.Icon>
        </S.IconBox>
        <FounderDetailsIconModal
          open={iconModal}
          handleClose={() => setIconModal(false)}
          handleDelete={() => setDeleteModal(true)}
          handleEdit={() => setEditMode(true)}
          handleIdCard={() => setIdCard(true)}
        />
        <FoundersModal openModal={editMode} handleClose={() => setEditMode(false)} cb={updateFounders} editMode={editMode} id={user.id} />
        <IdCardModal cardData={user} openModal={idCard} handleClose={idCardhandler} />
        <DeleteModal
          openModal={deleteModal}
          handleClose={() => setDeleteModal(false)}
          handleDelete={() => {
            deleteFounder(user.id);
            setDeleteModal(false);
            setIconModal(false);
          }}
          deleteMessage={
            <>
              Do you want to remove <CS.Bold>{user.name}</CS.Bold> from Founder Details?
            </>
          }
        />
        <ConfirmationModal
          openModal={confirmModal}
          handleClose={() => setConfirmModal(false)}
          yesAction={() => {
            !editMode && deleteFounder(user.id);
            editMode && editData && editFounder(editData);
            setEditMode(false);
            setConfirmModal(false);
            setIconModal(false);
          }}
        />
        {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
      </S.WebTableCell>
    </TableRow>
  );
};

export default FoundersRow;
