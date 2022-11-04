import { useState, useRef, FC, useEffect } from "react";
import { Checkbox, Stack, TableRow } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import { useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { useAuthContext } from "../../../../utils/context/auth";
import { ENDPOINTS, fileValidation, Message } from "../../../../utils/constants";
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
import { farmerDetail, editFarmerDetail, deleteFarmerDetail, checkBoxSelect } from "../../../../utils/store/slice/farmerDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDelete, useEdit, useFetch } from "../../../../utils/hooks/query";
import { IMdDetails } from "../../../../utils/store/slice/mdDetails";

interface FarmersDetailsRowProps {
  user: farmerDetail | any;
}

const FarmersDetailsRow: FC<FarmersDetailsRowProps> = ({ user }) => {
  // const { editFarmerDetail, deleteFarmerDetail, checkboxSelect, selectedFarmers } = useFarmerDetailsContext();
  const { selectedFarmers } = useSelector((state: RootState) => state.farmerDetails);
  const { addGroupMember, removeGroupMember } = useFarmersGroupContext();
  // const { mdDetailsById, editMdDetail, deleteMdDetail } = useMdDetailsContext();
  const {
    formatChangeSuccess: isSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);
  const { mutate: mutateEdit } = useEdit(ENDPOINTS.farmerDetails);
  const { mutate: mutateDelete } = useDelete(ENDPOINTS.farmerDetails);
  const { mutate: mutateDeleteMdDetail } = useDelete(ENDPOINTS.mdDetails);
  const { addNotification } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<mdDetail>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const idCardRef = useRef<HTMLDivElement>();
  const farmerDetailFormRef = useRef<HTMLDivElement>();
  const [image, setImage] = useState("");
  const [farmerIdtoPrint, setFarmerIdtoPrint] = useState<number | string | null>(null);
  const [idCard, setIdCard] = useState(false);
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const AddNewMember = { id: editData?.id, group: editData?.group };

  useEffect(() => {
    if (farmerIdtoPrint !== null || undefined) {
      generateFarmerDetailForm();
    }
    setFarmerIdtoPrint(null);
  }, [farmerIdtoPrint]);

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
    documentTitle: `${user.name}_FarmerDetail_form`,
    content: () => farmerDetailFormRef.current as HTMLDivElement,
  });

  const NavigateToFarmerDetailForm = (farmerId: string) => {
    navigate(`/farmers-details/${farmerId}`);
  };

  const handleCroppedImage = (image: string) => {
    if (!image) return;
    let farmerData = { ...user };
    farmerData["profile"] = image;
    user = { ...farmerData };
    dispatch(editFarmerDetail({ ...user }));
    // let getMdData = Object.values(mdDetailsById).find((data: mdDetail) => data.farmerId === user.id);
    let getMdData = mdDetailsById[user.id];
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
              dispatch(checkBoxSelect(user.id));
            }}
            checked={selectedFarmers.includes(user.id)}
          />
        </S.RowCheckCell>
        <S.WebTableCell>{user.membershipId}</S.WebTableCell>
        {/* for tablet view*/}
        <S.TabCell onClick={(e) => e.stopPropagation()}>
          <Checkbox onChange={() => dispatch(checkBoxSelect(user.id))} checked={selectedFarmers.includes(user.id)} />
          <Stack>
            <CS.Icon onClick={iconModalHandler}>three-dots</CS.Icon>
          </Stack>
        </S.TabCell>
        <S.Cell title="பெயர்">
          <S.NameStack>
            <S.AvatarBox
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
              <S.AvatarImg alt="User-img" src={getURL(user) ? getURL(user) : userPic} />
              <S.EditBox
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick();
                }}
              >
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
              onClick={() => {
                setFarmerIdtoPrint(user.id);
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
            handlePdfDownload={() => {
              setFarmerIdtoPrint(user.id);
            }}
          />
          <FarmersDetailsModal
            openModal={editMode}
            handleClose={() => setEditMode(false)}
            cb={updateFarmerDetail}
            editMode={editMode}
            id={user.id}
            mdId={isSuccess ? (Object.values(mdDetailsById) as IMdDetails[]).find((data) => data.farmerId === user.id)?.id : ""}
          />
          <IdCardModal cardData={user} openModal={idCard} handleClose={idCardhandler} />
          <DeleteModal
            openModal={deleteModal}
            handleClose={() => setDeleteModal(false)}
            handleDelete={() => {
              const isFarmerInMd = isSuccess ? (Object.values(mdDetailsById) as IMdDetails[]).find((data) => data.farmerId === user.id)?.id : "";
              // dispatch(deleteFarmerDetail(user.id));
              mutateDelete({ id: user.id });
              isFarmerInMd && mutateDeleteMdDetail({ id: isFarmerInMd });
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
              // editData && dispatch(editFarmerDetail(editData));
              editData?.farmerId && mutateEdit({ editedData: editData });
              editMode && removeGroupMember(user.id);
              editMode && addGroupMember(AddNewMember);
              setEditMode(false);
              setConfirmModal(false);
              setIconModal(false);
            }}
          />
        </S.WebTableCell>
      </TableRow>
    </>
  );
};

export default FarmersDetailsRow;
