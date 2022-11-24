import React, { useState, useRef, FC } from "react";
import { TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mdDetail } from "../../../../utils/context/mdDetails";
import { useAuthContext } from "../../../../utils/context/auth";
import { decryptText, encryptText, ENDPOINTS, fileValidation, imageCompressor, Message } from "../../../../utils/constants";
import { useDelete, useEdit } from "../../../../utils/hooks/query";
import Toast from "../../../../utils/toast";
import MdDetailsIconModal from "../../../icon-modals/md-details-icon-modal";
import FarmersDetailsModal from "../../../modals/farmers-details-modal";
import IdCardModal from "../../../modals/id-download-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import placeHolderImg from "../../../../assets/images/profile-placeholder.jpg";

interface MdDetailsRowProps {
  user: mdDetail;
  removeGroupMember: (id: string, group: string) => void;
}

const MdDetailsRow: FC<MdDetailsRowProps> = ({ user, removeGroupMember }) => {
  const { mutate: deleteMdDetail } = useDelete(ENDPOINTS.mdDetails);
  const { mutate: editMdDetail } = useEdit(ENDPOINTS.mdDetails);
  const { mutate: editFarmer } = useEdit(ENDPOINTS.farmerDetails);
  const { addNotification } = useAuthContext();
  const navigate = useNavigate();
  const [image, setImage] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<mdDetail>();
  const [idCard, setIdCard] = useState(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const hiddenFileInput: any = useRef<HTMLInputElement>();

  // Tab IconModal Open & Close Handler
  const iconModalHandler = () => setIconModal(!iconModal);

  //Edit MdDetail Handler
  const editMdDetailHandler = () => setEditMode(!editMode);

  //Update MdDetail Handler
  const updateMdDetail = (data: mdDetail) => {
    setEditData(data);
    confirmModalHandler();
  };

  // ID Card Modal Handler
  const idCardhandler = () => setIdCard(!idCard);

  // confirm Modal Handler
  const confirmModalHandler = () => setConfirmModal(!confirmModal);

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
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedBase64 = await imageCompressor(profileBlob);
    if (!image) return;
    user["profile"] = await encryptText(compressedBase64);
    const farmerEditData = { ...user, id: user.farmerId } as mdDetail;
    delete farmerEditData.farmerId;
    editFarmer({
      editedData: farmerEditData,
      successCb: () => {
        editMdDetail({
          editedData: user,
          successCb: () => {
            Toast({ message: "MD Edited Successfully.", type: "success" });
          },
          errorCb: () => {
            Toast({ message: "Request failed! Please try again.", type: "error" });
          },
        });
      },
    });
  };

  const NavigateToMdDetailForm = (mdId: string) => {
    navigate(`/md-details/${mdId}`);
  };

  return (
    <TableRow onClick={() => NavigateToMdDetailForm(user.id)}>
      <S.TabCell
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CS.Icon onClick={iconModalHandler}>three-dots</CS.Icon>
      </S.TabCell>
      <S.Cell title="பெயர்">
        <S.NameStack
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
          <S.AvatarBox>
            <S.AvatarImg alt="User-img" src={user.profile ? decryptText(user.profile) : placeHolderImg} />
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
      <S.WebTableCell
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <S.IconBox>
          <CS.Icon onClick={idCardhandler}>id-card</CS.Icon>
          <CS.Icon onClick={editMdDetailHandler}>edit</CS.Icon>
          <S.Toggle checked={!!user.id} onChange={confirmModalHandler} />
        </S.IconBox>
        <MdDetailsIconModal
          open={iconModal}
          handleClose={() => setIconModal(false)}
          handleEdit={() => setEditMode(true)}
          check={user.id}
          handleConfirm={() => setConfirmModal(true)}
          handleIdCard={() => setIdCard(true)}
        />
        <FarmersDetailsModal
          openModal={editMode}
          handleClose={() => setEditMode(false)}
          cb={updateMdDetail}
          editMode={editMode}
          id={user.farmerId}
          mdId={user.id}
        />
        <IdCardModal cardData={user} openModal={idCard} handleClose={idCardhandler} />
        <ConfirmationModal
          openModal={confirmModal}
          handleClose={() => setConfirmModal(false)}
          yesAction={async () => {
            !editMode &&
              deleteMdDetail({
                id: user.id,
                successCb: () => {
                  addNotification({ id: `delete${user.id}`, image: user.profile, message: Message(user.name).deleteMd });
                  Toast({ message: "MD Deleted Successfully", type: "success" });
                },
                errorCb: () => {
                  Toast({ message: "Request failed! Please try again", type: "error" });
                },
              });
            editData && user.farmerId && (await removeGroupMember(user.farmerId, editData.group));
            const farmerEditData = { ...editData, id: editData?.farmerId };
            delete farmerEditData.farmerId;
            editData &&
              editFarmer({
                editedData: farmerEditData,
                successCb: () => {
                  editMdDetail({ editedData: editData });
                  Toast({ message: "MD Edited Successfully", type: "success" });
                },
                errorCb: () => {
                  Toast({ message: "Request failed! Please try again", type: "error" });
                },
              });
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
      </S.WebTableCell>
    </TableRow>
  );
};

export default MdDetailsRow;
