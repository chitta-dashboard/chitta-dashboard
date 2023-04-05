import React, { useState, useRef, FC, useEffect } from "react";
import { TableRow } from "@mui/material";
import { IMdDetails } from "../../../../utils/context/mdDetails";
import { useAuthContext } from "../../../../utils/context/auth";
import { ENDPOINTS, fileValidation, imageCompressor, Message } from "../../../../utils/constants";
import { s3ConfigTypes } from "../../../../types";
import { deleteProfile, uploadProfile } from "../../../../services/s3-client";
import { extractProfileName, generateProfileName } from "../../../../utils/helpers";
import { useDelete, useEdit } from "../../../../utils/hooks/query";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import Toast from "../../../../utils/toast";
import MdDetailsIconModal from "../../../icon-modals/md-details-icon-modal";
import FarmersDetailsModal from "../../../modals/farmers-details-modal";
import FarmerBankDetailModal from "../../../modals/farmer-bank-detail-confirmation-modal";
import IdCardModal from "../../../modals/id-download-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import placeHolderImg from "../../../../assets/images/profile-placeholder.jpg";

interface MdDetailsRowProps {
  user: IMdDetails;
  removeGroupMember: (id: string, group: string) => void;
}

const MdDetailsRow: FC<MdDetailsRowProps> = ({ user, removeGroupMember }) => {
  //state values
  const { setFarmerBankDetail } = useFarmerDetailsContext();
  const { addNotification } = useAuthContext();
  const [image, setImage] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<IMdDetails>();
  const [idCard, setIdCard] = useState(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [openFarmerRowModal, setOpenFarmerRowModal] = useState<string | null>(null);

  //constants
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const { mutate: deleteMdDetail } = useDelete(ENDPOINTS.mdDetails);
  const { mutate: editMdDetail } = useEdit(ENDPOINTS.mdDetails);
  const { mutate: editFarmer } = useEdit(ENDPOINTS.farmerDetails);

  //functions
  // Tab IconModal Open & Close Handler
  const iconModalHandler = () => setIconModal(!iconModal);

  //Edit MdDetail Handler
  const editMdDetailHandler = () => {
    setEditMode(!editMode);
    setFarmerBankDetail(true);
  };

  //Update MdDetail Handler
  const updateMdDetail = (data: IMdDetails) => {
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
    if (!image) return;
    const targetMdProfile = user.profile;
    targetMdProfile && deleteProfile(extractProfileName(targetMdProfile), s3ConfigTypes.farmer);
    const profileName = `${s3ConfigTypes.farmer}_${user.id}_${Date.now()}`;
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedProfile = await imageCompressor(profileBlob);
    const namedProfile = generateProfileName(compressedProfile, profileName);
    const profile = await uploadProfile(namedProfile, s3ConfigTypes.founder);
    user["profile"] = profile;
    const farmerEditData = { ...user, id: user.farmerId } as IMdDetails;
    delete farmerEditData.farmerId;
    editFarmer({
      editedData: farmerEditData,
      successCb: () => {
        editMdDetail({
          editedData: user,
        });
      },
    });
  };

  const NavigateToMdDetailForm = (mdId: string) => setOpenFarmerRowModal(mdId);

  useEffect(() => {
    setFarmerBankDetail(false);
  }, []);

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
            <S.AvatarImg alt="User-img" src={user.profile ? user.profile : placeHolderImg} />
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
          handleClose={() => {
            setEditMode(false);
            setFarmerBankDetail(false);
          }}
          cb={updateMdDetail}
          editMode={editMode}
          id={user.farmerId}
          mdId={user.id}
        />
        <IdCardModal cardData={user} openModal={idCard} handleClose={idCardhandler} />
        <ConfirmationModal
          openModal={confirmModal}
          handleClose={() => setConfirmModal(false)}
          yesAction={() => {
            !editMode &&
              deleteMdDetail({
                id: user.id,
                successCb: () => {
                  addNotification({ id: `delete${user.id}`, image: user.profile, message: Message(user.name).deleteMd });
                  Toast({ message: "MD Deleted Successfully", type: "success" });
                },
                errorCb: () => Toast({ message: "Request failed! Please try again", type: "error" }),
              });

            const farmerEditData = { ...editData, id: editData?.farmerId };
            delete farmerEditData.farmerId;
            editMode &&
              editData &&
              editFarmer({
                editedData: farmerEditData,
                successCb: () => {
                  editMdDetail({
                    editedData: editData,
                    successCb: () => {
                      user.farmerId && removeGroupMember(user.farmerId, editData.group);
                      Toast({ message: "MD Edited Successfully", type: "success" });
                    },
                    errorCb: () => Toast({ message: "Request failed! Please try again", type: "error" }),
                  });
                },
              });
            setEditMode(false);
            setFarmerBankDetail(false);
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
        {openFarmerRowModal && (
          <>
            <FarmerBankDetailModal
              openModal={true}
              navigateId={openFarmerRowModal}
              handleClose={() => {
                setOpenFarmerRowModal(null);
              }}
              mdPage={true}
            />
          </>
        )}
      </S.WebTableCell>
    </TableRow>
  );
};

export default MdDetailsRow;
