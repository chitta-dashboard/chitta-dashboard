import { FC, useRef, useState } from "react";
import { TableRow } from "@mui/material";
import { Founders } from "../../../../utils/context/founders";
import { useAuthContext } from "../../../../utils/context/auth";
import { extractProfileName, generateProfileName } from "../../../../utils/helpers";
import { s3ConfigTypes } from "../../../../types";
import { deleteProfile, uploadProfile } from "../../../../services/s3-client";
import { encryptText, ENDPOINTS, fileValidation, imageCompressor, Message } from "../../../../utils/constants";
import { useDelete, useEdit } from "../../../../utils/hooks/query";
import Toast from "../../../../utils/toast";
import FounderDetailsIconModal from "../../../icon-modals/founder-details-icon-modal";
import FoundersModal from "../../../modals/founders-modal";
import IdCardModal from "../../../modals/id-download-modal";
import DeleteModal from "../../../modals/delete-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import placeHolderImg from "../../../../assets/images/profile-placeholder.jpg";

interface FoundersRowProp {
  user: Founders;
}

const FoundersRow: FC<FoundersRowProp> = ({ user }) => {
  const { addNotification } = useAuthContext();
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const [image, setImage] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<Founders>();
  const [idCard, setIdCard] = useState(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  // hook for edit and delete mutation
  const { mutate: founderMutateUpdate } = useEdit(ENDPOINTS.founders);
  const { mutate: founderMutateDelete } = useDelete(ENDPOINTS.founders);

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

  const handleCroppedImage = async (image: string) => {
    if (!image) return;
    const targetFounderProfile = user.profile;
    targetFounderProfile && deleteProfile(extractProfileName(targetFounderProfile), s3ConfigTypes.founder);
    const profileName = `${s3ConfigTypes.founder}_${user.id}_${Date.now()}`;
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedProfile = await imageCompressor(profileBlob);
    const namedProfile = generateProfileName(compressedProfile, profileName);
    const profile = await uploadProfile(namedProfile, s3ConfigTypes.founder);
    founderMutateUpdate({ editedData: { ...user, profile } });
  };

  return (
    <TableRow>
      <S.TabCell>
        <CS.Icon onClick={iconModalHandler}>three-dots</CS.Icon>
      </S.TabCell>
      <S.Cell title="பெயர்">
        <S.NameStack>
          {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
          <S.AvatarBox>
            <S.AvatarImg alt="User-img" src={getURL(user) ? getURL(user) : placeHolderImg} />
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
          handleDelete={async () => {
            user.profile && (await deleteProfile(extractProfileName(user.profile), s3ConfigTypes.founder));
            founderMutateDelete({
              id: user.id,
              successCb: () => {
                addNotification({ id: `delete_${user.id}`, image: user.profile, message: Message(user.name).deleteFoundersDetails });
                Toast({ message: "Founder Deleted Successfully", type: "success" });
              },
              errorCb: () => {
                Toast({ message: "Request failed! Please try again", type: "error" });
              },
            });
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
            editMode &&
              editData &&
              founderMutateUpdate({
                editedData: editData,
                successCb: () => {
                  Toast({ message: "Founder Edited Successfully", type: "success" });
                },
                errorCb: () => {
                  Toast({ message: "Request failed! Please try again", type: "error" });
                },
              });
            setEditMode(false);
            setConfirmModal(false);
            setIconModal(false);
          }}
        />
      </S.WebTableCell>
    </TableRow>
  );
};

export default FoundersRow;
