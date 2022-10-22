import { useState, useRef, FC } from "react";
import { Checkbox, Stack, TableRow } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { useAuthContext } from "../../../../utils/context/auth";
import { fileValidation, Message } from "../../../../utils/constants";
import FarmersDetailsIconModal from "../../../icon-modals/farmers-detail-icon-modal";
import FarmersDetailsModal from "../../../modals/farmers-details-modal";
import DeleteModal from "../../../modals/delete-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import FarmerDetailsForm from "../../../../views/farmer-detail-page/FarmerDetailsForm";
import IdCardBody from "../../../id-card/id-card-body";
import IdCardModal from "../../../modals/id-download-modal";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import userPic from "../../../../assets/images/user.png";

interface FarmersDetailsRowProps {
  user: farmerDetail;
}
const FarmersDetailsRow: FC<FarmersDetailsRowProps> = ({ user }) => {
  const { editFarmerDetail, deleteFarmerDetail, checkboxSelect, selectedFarmers } = useFarmerDetailsContext();
  const { addGroupMember, removeGroupMember } = useFarmersGroupContext();
  const { mdDetailsById, editMdDetail, deleteMdDetail } = useMdDetailsContext();
  const { addNotification } = useAuthContext();
  const navigate = useNavigate();
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<mdDetail>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const idCardRef = useRef<HTMLDivElement>();
  const farmerDetailFormRef = useRef<HTMLDivElement>();
  const [image, setImage] = useState("");
  const [farmerIdtoPrint, setFarmerIdtoPrint] = useState<number | string>();
  const [idCard, setIdCard] = useState(false);
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const AddNewMember = { id: editData?.id, group: editData?.group };

  // Tab IconModal Open & Close Handler
  const iconModalHandler = () => setIconModal(!iconModal);

  //Edit Farmers Details Handler
  const editFarmerDetailHandler = () => setEditMode(!editMode);

  //Update Farmers Details Handler
  const updateFarmerDetail = (data: farmerDetail) => {
    setEditData(data);
    confirmModalHandler();
  };

  // ID Card Modal Handler
  const idCardhandler = () => setIdCard(!idCard);

  // Delete Modal Handler
  const deleteModalHandler = () => setDeleteModal(!deleteModal);

  // confirm Modal Handler
  const confirmModalHandler = () => setConfirmModal(!confirmModal);

  const getURL = (data: farmerDetail) => data["profile"];

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

  const generateFarmerDetailForm = useReactToPrint({
    documentTitle: `Nerkathir_User_Form_${+new Date()}`,
    content: () => farmerDetailFormRef.current as HTMLDivElement,
  });

  const NavigateToFarmerDetailForm = (farmerId: string) => {
    navigate(`/farmers-details/${farmerId}`);
  };

  const handleCroppedImage = (image: string) => {
    if (!image) return;
    user["profile"] = image;
    let getMdData = Object.values(mdDetailsById).find((data) => data.farmerId === user.id);
    if (getMdData?.farmerId) {
      getMdData["profile"] = image;
    }
  };

  return (
    <>
      <tr>
        <td style={{ display: "none" }}>
          <IdCardBody ref={idCardRef} />
          <FarmerDetailsForm ref={farmerDetailFormRef} farmerIdtoPrint={farmerIdtoPrint} />
        </td>
      </tr>
      <TableRow key={user.id} onClick={() => NavigateToFarmerDetailForm(user.id)}>
        <S.RowCheckCell
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Checkbox
            onChange={(e) => {
              checkboxSelect(user.id);
            }}
            checked={selectedFarmers.includes(user.id)}
          />
        </S.RowCheckCell>
        <S.WebTableCell>{user.membershipId}</S.WebTableCell>
        {/* for tablet view*/}
        <S.TabCell onClick={(e) => e.stopPropagation()}>
          <Checkbox onChange={() => checkboxSelect(user.id)} checked={selectedFarmers.includes(user.id)} />
          <Stack>
            <CS.Icon onClick={iconModalHandler}>three-dots</CS.Icon>
          </Stack>
        </S.TabCell>
        <S.Cell title="பெயர்">
          <S.NameStack>
            <S.AvatarBox>
              <S.AvatarImg alt="User-img" src={getURL(user) ? getURL(user) : userPic} />
              <S.EditBox
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick();
                }}
              >
                {user.profile}
                <S.EditIcon>edit</S.EditIcon>
                <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
              </S.EditBox>
            </S.AvatarBox>
            {user.name}
          </S.NameStack>
        </S.Cell>
        <S.Cell title="உறுப்பினர் எண்">{user.membershipId}</S.Cell>
        <S.Cell title="பிறந்த தேதி">{user.dob}</S.Cell>
        <S.Cell title="கைபேசி எண்">{user.phoneNumber}</S.Cell>
        <S.Cell title="குழு பெயர்">{user.group}</S.Cell>
        <S.WebTableCell onClick={(e) => e.stopPropagation()}>
          <S.IconBox>
            <CS.Icon onClick={deleteModalHandler}>delete</CS.Icon>
            <CS.Icon onClick={idCardhandler}>id-card</CS.Icon>
            <CS.Icon onClick={editFarmerDetailHandler}>edit</CS.Icon>
            <CS.Icon
              onClick={async () => {
                await setFarmerIdtoPrint(user.id);
                generateFarmerDetailForm();
              }}
            >
              download
            </CS.Icon>
          </S.IconBox>
          <FarmersDetailsIconModal
            open={iconModal}
            handleClose={() => setIconModal(false)}
            handleDelete={() => setDeleteModal(true)}
            handleEdit={() => setEditMode(true)}
            handleIdCard={() => setIdCard(true)}
            handlePdfDownload={async () => {
              await setFarmerIdtoPrint(user.id);
              generateFarmerDetailForm();
            }}
          />
          <FarmersDetailsModal
            openModal={editMode}
            handleClose={() => setEditMode(false)}
            cb={updateFarmerDetail}
            editMode={editMode}
            id={user.id}
            mdId={Object.values(mdDetailsById).find((data) => data.farmerId === user.id)?.id}
          />
          <IdCardModal cardData={user} openModal={idCard} handleClose={idCardhandler} />
          <DeleteModal
            openModal={deleteModal}
            handleClose={() => setDeleteModal(false)}
            handleDelete={() => {
              const isFarmerInMd = Object.values(mdDetailsById).find((data) => data.farmerId === user.id)?.id;
              deleteFarmerDetail(user.id);
              isFarmerInMd && deleteMdDetail(isFarmerInMd);
              setDeleteModal(false);
              setIconModal(false);
              addNotification({ id: user.id, image: user.profile, message: Message(user.name).deleteFarmDetail });
              removeGroupMember(user.id);
            }}
            deleteMessage={
              <>
                Do you want to remove <CS.Bold>{user.name}</CS.Bold> from Farmers Details?
              </>
            }
          />
          <ConfirmationModal
            openModal={confirmModal}
            handleClose={() => setConfirmModal(false)}
            yesAction={() => {
              editData && editFarmerDetail(editData);
              editData?.farmerId && editMdDetail(editData);
              editMode && removeGroupMember(user.id);
              editMode && addGroupMember(AddNewMember);
              setEditMode(false);
              setConfirmModal(false);
              setIconModal(false);
            }}
          />
          {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
        </S.WebTableCell>
      </TableRow>
    </>
  );
};

export default FarmersDetailsRow;
