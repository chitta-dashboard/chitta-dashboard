import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { Popover } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import MdDetailsForm from "../MdDetailsForm";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import IconWrapper from "../../../utils/iconWrapper";
// import { useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { editFarmerDetail } from "../../../utils/store/slice/farmerDetails";
// import { useFarmersGroupContext } from "../../../utils/context/farmersGroup";
import { useAuthContext } from "../../../utils/context/auth";
import { decryptText, ENDPOINTS, fileValidation, Message } from "../../../utils/constants";
import { useDelete, useEdit, useFetch } from "../../../utils/hooks/query";
import FarmersDetailsModal from "../../../components/modals/farmers-details-modal";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
import DeleteModal from "../../../components/modals/delete-modal";
import profilePlaceholder from "../../../assets/images/profile-placeholder.jpg";
import { mdDetail } from "../../../utils/context/mdDetails";
import { S } from "./mdDetails-form-preview.styled";

const MdFormPreviewLeft = () => {
  const {
    formatChangeSuccess: isSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);

  const { mutate: editMdDetail } = useEdit(ENDPOINTS.mdDetails);
  const { mutate: editFarmer } = useEdit(ENDPOINTS.farmerDetails);
  const { mutate: deleteMdDetail } = useDelete(ENDPOINTS.mdDetails);
  // const { addGroupMember, removeGroupMember } = useFarmersGroupContext();
  const { addNotification, titleName, address } = useAuthContext();
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState<mdDetail | null>(null);
  // const AddNewMember = { id: openConfirmationModal?.farmerId, group: openConfirmationModal?.group };
  const mdFormPdf = useRef<HTMLDivElement>();
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const { mdId } = useParams();
  const navigate = useNavigate();

  // popover open
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  // popover close
  const handleClose = () => setAnchorEl(null);

  const current = new Date();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // to generate Md detail form
  const generateMdDetailsPDF = useReactToPrint({
    // documentTitle: `${isSuccess && mdId && mdDetailsById[mdId].name}_MD_Detail_form`,
    content: () => mdFormPdf.current as HTMLDivElement,
  });

  const handleIconClick = (id: string) => {
    hiddenFileInput && hiddenFileInput.current.click();
    setUserId(id);
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

  const handleCroppedImage = (image: string) => {
    if (!image) return;
    let result = mdDetailsById[userId];
    result.profile = image;
    editMdDetail({ editedData: result });
    const farmerEditData = { ...result, id: result.farmerId } as mdDetail;
    delete farmerEditData.farmerId;
    editFarmer({ editedData: farmerEditData });
  };

  //Update MdDetail Handler
  const updateMdDetail = (data: mdDetail) => setOpenConfirmationModal(data);

  return (
    <>
      <S.InvisibleBox>
        <MdDetailsForm ref={mdFormPdf} />
      </S.InvisibleBox>
      {Object.values(isSuccess && (mdDetailsById as mdDetail[]))
        .filter((name) => [mdId].includes(name.id))
        .map((user) => (
          <S.MdFormPreviewLeft key={user.id}>
            <S.CustomBackIcon onClick={() => navigate(-1)}>
              <IconWrapper>back</IconWrapper>
            </S.CustomBackIcon>
            <S.CustomThreeDotsIcon aria-describedby={id} onClick={handleClick}>
              <IconWrapper>three-dots</IconWrapper>
            </S.CustomThreeDotsIcon>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <S.CustomPopoverList
                onClick={() => {
                  generateMdDetailsPDF();
                  handleClose();
                }}
              >
                Download
              </S.CustomPopoverList>
              <S.CustomPopoverList
                onClick={() => {
                  setOpenEditModal(true);
                  handleClose();
                }}
              >
                Edit
              </S.CustomPopoverList>
              <S.CustomPopoverList
                onClick={() => {
                  setOpenDeleteModal(true);
                  handleClose();
                }}
              >
                Delete
              </S.CustomPopoverList>
            </Popover>
            <S.FormHeading>
              <S.Text1>
                {titleName ? (
                  titleName
                ) : (
                  <>
                    நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
                  </>
                )}
              </S.Text1>
              <S.Text2>
                {address ? (
                  address
                ) : (
                  <>
                    நபார்டு,கள்ளக்குறிச்சி மாவட்டம் <br /> உறுப்பினர் விண்ணப்பம்
                  </>
                )}
              </S.Text2>
            </S.FormHeading>
            <S.MdImgContainer>
              <S.MdImg src={user.profile ? decryptText(user.profile) : profilePlaceholder} alt="profie-picture" />
              <S.EditBox
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(user.id);
                }}
              >
                <S.EditIcon>edit</S.EditIcon>
                <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
              </S.EditBox>
            </S.MdImgContainer>
            <S.HeaderText>
              உறுப்பினர் எண் : {user.membershipId} <br />
              நாள்: {current.getDate()}/{current.getMonth()}/{current.getFullYear()}
            </S.HeaderText>
            <S.HeaderText>
              ஒருங்கிணைப்பாளர்: நேச்சர் ஃபார்ம் & ரூரல் டெவல்மென்ட் சொசைட்டிஎண், 453,பவர் ஆபீஸ் மெயின் ரோடு, சடையம்பட்டு,சோமண்டார்குடி
              அஞ்சல்,கள்ளக்குறிச்சி தாலுக்கா&மாவட்டம், 606213
            </S.HeaderText>
            {openEditModal && (
              <FarmersDetailsModal
                openModal={true}
                handleClose={() => setOpenEditModal(false)}
                cb={updateMdDetail}
                editMode={true}
                id={user.farmerId}
                mdId={user.id}
              />
            )}
            {openDeleteModal && (
              <DeleteModal
                openModal={true}
                handleClose={() => setOpenDeleteModal(false)}
                handleDelete={() => {
                  deleteMdDetail({
                    id: user.id,
                    successCb: () => {
                      addNotification({ id: user.id, image: user.profile, message: Message(user.name).deleteFarmDetail });
                      navigate(-1);
                    },
                  });
                }}
                deleteMessage={
                  <span>
                    Do you want to remove <S.DeleteName>{mdDetailsById[user.id].name}</S.DeleteName> from MD Details?
                  </span>
                }
              />
            )}
            {openConfirmationModal && (
              <ConfirmationModal
                openModal={true}
                handleClose={() => {
                  setOpenConfirmationModal(null);
                }}
                yesAction={() => {
                  editMdDetail({ editedData: openConfirmationModal });
                  const farmerEditData = { ...openConfirmationModal, id: openConfirmationModal.farmerId } as mdDetail;
                  delete farmerEditData.farmerId;
                  editFarmer({ editedData: farmerEditData });
                  editFarmerDetail(openConfirmationModal);
                  // removeGroupMember(openConfirmationModal.farmerId);
                  // addGroupMember(AddNewMember);
                  setOpenConfirmationModal(null);
                  setOpenEditModal(false);
                }}
              />
            )}
          </S.MdFormPreviewLeft>
        ))}
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default MdFormPreviewLeft;
