import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popover } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import MdDetailsForm from "../MdDetailsForm";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import IconWrapper from "../../../utils/iconWrapper";
import { useAuthContext } from "../../../utils/context/auth";
import { IMdDetails } from "../../../utils/context/mdDetails";
import { FarmersGroup } from "../../../utils/context/farmersGroup";
import { ENDPOINTS, fileValidation, imageCompressor, Message } from "../../../utils/constants";
import { useDelete, useEdit, useFetch } from "../../../utils/hooks/query";
import Toast from "../../../utils/toast";
import FarmersDetailsModal from "../../../components/modals/farmers-details-modal";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
import DeleteModal from "../../../components/modals/delete-modal";
import profilePlaceholder from "../../../assets/images/profile-placeholder.jpg";
import { AdminFormInputs } from "../../admin-panel";
import { S } from "./mdDetails-form-preview.styled";
import { deleteProfile, uploadProfile } from "../../../services/s3-client";
import { s3ConfigTypes } from "../../../types";
import { extractProfileName, generateProfileName } from "../../../utils/helpers";

const MdFormPreviewLeft = () => {
  //constructors
  const navigate = useNavigate();

  //constants
  const {
    formatChangeSuccess: isSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);

  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);

  const {
    formatChangeSuccess: isSuccessAdmin,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const { name: titleName, address, coordinatorAddress } = isSuccessAdmin && Object.values(adminDetails as AdminFormInputs)[0];

  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { mutate: editMdDetail } = useEdit(ENDPOINTS.mdDetails);
  const { mutate: editFarmer } = useEdit(ENDPOINTS.farmerDetails);
  const { mutate: deleteMdDetail } = useDelete(ENDPOINTS.mdDetails);

  //state values
  const { addNotification } = useAuthContext();
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState<IMdDetails | null>(null);
  const mdFormPdf = useRef<HTMLDivElement>();
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const { mdId } = useParams();

  //functions
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

  const handleCroppedImage = async (image: string) => {
    if (!image) return;
    const targetMd = mdDetailsById[userId];
    const targetMdProfile = targetMd.profile;
    if (targetMdProfile) {
      const deleteRes = await deleteProfile(extractProfileName(targetMdProfile), s3ConfigTypes.farmer);
      if (!deleteRes) return;
    }
    const profileName = `${s3ConfigTypes.farmer}_${userId}_${Date.now()}`;
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedProfile = await imageCompressor(profileBlob);
    const namedProfile = generateProfileName(compressedProfile, profileName);
    const profile = await uploadProfile(namedProfile, s3ConfigTypes.farmer);
    const farmerEditData = { ...targetMd, id: targetMd.farmerId, profile } as IMdDetails;
    const MdEditData = { ...targetMd, profile } as IMdDetails;
    delete farmerEditData.farmerId;
    editFarmer({
      editedData: farmerEditData,
      successCb: () => {
        editMdDetail({
          editedData: MdEditData,
          successCb: () => Toast({ message: "MD Edited Successfully.", type: "success" }),
          errorCb: () => Toast({ message: "Request failed! Please try again.", type: "error" }),
        });
      },
    });
  };

  //Update MdDetail Handler
  const updateMdDetail = (data: IMdDetails) => setOpenConfirmationModal(data);

  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
  const removeGroupMember = (id: string, group: string) => {
    let removeMemberIndex = -1;
    const isCountUpdate = farmersGroupData.find((list, index) => {
      if (list?.members.includes(id)) {
        removeMemberIndex = index;
      }
      if (list.groupName === group && list?.members.includes(id)) {
        return list;
      }
    });
    if (!isCountUpdate) {
      const updatedMember = farmersGroupData[removeMemberIndex]?.members.filter((member: string) => member !== id);
      const updatedFarmerGroup = { ...farmersGroupData[removeMemberIndex] };
      updatedFarmerGroup.members = updatedMember;
      updatedFarmerGroup.members &&
        editFarmerGroup({
          editedData: updatedFarmerGroup,
          successCb: (data) => {
            setTimeout(() => addGroupMember(id, group, Object.values(data)), 0);
          },
        });
      !updatedFarmerGroup.members && addGroupMember(id, group, farmersGroupData);
    }
  };

  const addGroupMember = (id: string, group: string, data: FarmersGroup[]) => {
    const groupIndex = data.findIndex((list) => list.groupName === group);
    const newGroupMember = JSON.parse(JSON.stringify(data[groupIndex]));
    newGroupMember.members.push(id);
    newGroupMember.members &&
      editFarmerGroup({
        editedData: newGroupMember,
      });
  };

  return (
    <>
      <S.InvisibleBox>
        <MdDetailsForm ref={mdFormPdf} />
      </S.InvisibleBox>
      {Object.values(isSuccess && isSuccessAdmin && (mdDetailsById as IMdDetails[]))
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
                  <>
                    {titleName} உழவர் <br />
                    உற்பத்தியாளர் நிறுவனம்
                  </>
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
              <S.MdImg src={user.profile ? user.profile : profilePlaceholder} alt="profie-picture" />
              <S.EditBox
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(user.id);
                }}
              >
                <S.EditIcon>edit</S.EditIcon>
                <S.HiddenInput type="file" accept="image/png, image/jpeg" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
              </S.EditBox>
            </S.MdImgContainer>
            <S.HeaderText>
              உறுப்பினர் எண் : {user.membershipId} <br />
              நாள்: {current.getDate()}/{current.getMonth() + 1}/{current.getFullYear()}
            </S.HeaderText>
            <S.HeaderText>
              ஒருங்கிணைப்பாளர்:{" "}
              {coordinatorAddress ? (
                coordinatorAddress
              ) : (
                <>
                  நேச்சர் ஃபார்ம் & ரூரல் டெவல்மென்ட் சொசைட்டிஎண், 453,பவர் ஆபீஸ் மெயின் ரோடு, சடையம்பட்டு,சோமண்டார்குடி அஞ்சல்,கள்ளக்குறிச்சி
                  தாலுக்கா&மாவட்டம், 606213
                </>
              )}
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
            {/* {openDeleteModal && (
              <DeleteModal
                openModal={true}
                handleClose={() => setOpenDeleteModal(false)}
                handleDelete={() => {
                  deleteMdDetail({
                    id: user.id,
                    successCb: () => {
                      addNotification({ id: `delete${user.id}`, image: user.profile, message: Message(user.name).deleteFarmDetail });
                      Toast({ message: "MD Deleted Successfully", type: "success" });
                      navigate(-1);
                    },
                    errorCb: () => {
                      Toast({ message: "Request failed! Please try again", type: "error" });
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
                yesAction={async () => {
                  await removeGroupMember(user.farmerId, openConfirmationModal.group);
                  const farmerEditData = { ...openConfirmationModal, id: openConfirmationModal.farmerId } as IMdDetails;
                  delete farmerEditData.farmerId;
                  editFarmer({
                    editedData: farmerEditData,
                    successCb: () => {
                      editMdDetail({ editedData: openConfirmationModal });
                      Toast({ message: "MD Edited Successfully.", type: "success" });
                    },
                    errorCb: () => {
                      Toast({ message: "Request failed! Please try again.", type: "error" });
                    },
                  });
                  setOpenConfirmationModal(null);
                  setOpenEditModal(false);
                }}
              />
            )} */}
            {openDeleteModal && (
              <DeleteModal
                openModal={true}
                handleClose={() => setOpenDeleteModal(false)}
                handleDelete={() => {
                  deleteMdDetail({
                    id: user.id,
                    successCb: () => {
                      addNotification({ id: user.id, image: user.profile ? user.profile : profilePlaceholder, message: Message(user.name).deleteMd });
                      Toast({ message: "MD Deleted Successfully", type: "success" });
                      navigate(-1);
                    },
                    errorCb: () => Toast({ message: "Request failed! Please try again", type: "error" }),
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
                  const farmerEditData = { ...openConfirmationModal, id: openConfirmationModal.farmerId };
                  delete farmerEditData.farmerId;
                  editFarmer({
                    editedData: farmerEditData,
                    successCb: () => {
                      editMdDetail({
                        editedData: openConfirmationModal,
                        successCb: () => {
                          user.farmerId && removeGroupMember(user.farmerId, openConfirmationModal.group);
                          Toast({ message: "MD Edited Successfully", type: "success" });
                        },
                        errorCb: () => Toast({ message: "Request failed! Please try again", type: "error" }),
                      });
                    },
                  });
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
