import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Popover } from "@mui/material";
import { S } from "./farmer-form-preview.styled";
import profilePlaceholder from "../../../assets/images/profile-placeholder.jpg";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
import DeleteModal from "../../../components/modals/delete-modal";
import AddFarmersDetailsModal from "../../../components/modals/farmers-details-modal";
import { IAddFarmersDetailsFormInput } from "../../../components/modals/type/formInputs";
import { decryptText, encryptText, ENDPOINTS, fileValidation, imageCompressor, Message } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import { farmerDetail, useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { FarmersGroup } from "../../../utils/context/farmersGroup";
import { useDelete, useDeleteByPage, useEdit, useEditByPage, useFetch, useIdByPage } from "../../../utils/hooks/query";
import IconWrapper from "../../../utils/iconWrapper";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import { IMdDetails } from "../../../utils/store/slice/mdDetails";
import Toast from "../../../utils/toast";
import FarmerDetailsForm from "../FarmerDetailsForm";

const FarmerFormPreviewLeft = () => {
  // constants
  const toastId = "toastId";
  // Queries
  const { currentPage, farmerQuery } = useFarmerDetailsContext();

  const {
    formatChangeSuccess: isMdSuccess,
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

  const { farmerId } = useParams();
  const { name: titleName, address, coordinatorAddress } = isSuccessAdmin && (Object.values(adminDetails)[0] as any);
  const { mutate: editMdDetail } = useEdit(ENDPOINTS.mdDetails);
  const { mutate: editFarmer } = useEditByPage(ENDPOINTS.farmerDetails, currentPage, farmerQuery, farmerId);
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { mutate: farmerDelete } = useDeleteByPage(ENDPOINTS.farmerDetails, currentPage);
  const { mutate: mdDelete } = useDelete(ENDPOINTS.mdDetails);
  // state values
  const { addNotification } = useAuthContext();
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState<(farmerDetail & { farmerId?: string }) | null>(null);
  const farmerFormPdf = useRef<HTMLDivElement>();
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  let {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useIdByPage(ENDPOINTS.farmerDetails, farmerId);

  // popover open
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  // popover close
  const handleClose = () => setAnchorEl(null);
  const current = new Date();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // to generate farmer detail form
  const generateFarmerDetailsPDF = useReactToPrint({
    // documentTitle: `${farmerId && farmersDetailsById[farmerId].name}_FarmerDetail_form`,
    content: () => farmerFormPdf.current as HTMLDivElement,
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
    const user = farmersDetailsById[userId];
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedBase64 = await imageCompressor(profileBlob);
    if (!image) return;
    const encryptedBase64 = encryptText(compressedBase64);
    const isFarmerInMd = Object.values(isMdSuccess && (mdDetailsById as IMdDetails[])).find((data) => data.farmerId === user.id)?.id;
    !isFarmerInMd &&
      editFarmer({
        editedData: { ...user, profile: encryptedBase64 },
        successCb: () => {
          Toast({ message: "Farmer Edited Successfully", type: "success", customId: `${toastId}-farmerEditSuccess` });
        },
        errorCb: () => {
          Toast({ message: "Request failed! Please try again", type: "error", customId: `${toastId}-farmerEditFail` });
        },
      });
    isFarmerInMd &&
      editFarmer({
        editedData: { ...user, profile: encryptedBase64 },
        successCb: async () => {
          editMdDetail({
            editedData: { ...user, profile: encryptedBase64, farmerId: user.id, id: isFarmerInMd },
            successCb: () => {
              Toast({ message: "Farmer Edited Successfully", type: "success", customId: `${toastId}-farmerEditSuccessInmd` });
            },
            errorCb: () => {
              Toast({ message: "Request failed! Please try again", type: "error", customId: `${toastId}-farmerEditFailInmd` });
            },
          });
        },
      });
  };

  //Update FarmerDetail Handler
  const updateFarmerDetail = (data: IAddFarmersDetailsFormInput & { id: string; membershipId: string; farmerId?: string }) => {
    setOpenConfirmationModal(data);
  };

  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
  const removeGroupMember = async (id: string, group: string, isAdd: boolean) => {
    const noCountUpdate = farmersGroupData.findIndex((list) => list.groupName === group);
    const farmerDelete = isAdd ? !farmersGroupData[noCountUpdate]?.members.includes(id) : true;
    if (farmerDelete) {
      const removeMemberIndex = farmersGroupData.map((farmersGroup) => farmersGroup.members).findIndex((members) => members.includes(id));
      const updatedMember = farmersGroupData[removeMemberIndex]?.members.filter((member: string) => member !== id);
      const updatedFarmerGroup = { ...farmersGroupData[removeMemberIndex] };
      updatedFarmerGroup.members = updatedMember;
      isAdd && (await addGroupMember(id, group));
      updatedFarmerGroup.members && editFarmerGroup({ editedData: updatedFarmerGroup });
    }
  };

  const addGroupMember = async (id: string, group: string) => {
    const groupIndex = farmersGroupData.findIndex((list) => list.groupName === group);
    const newGroupMember = farmersGroupData[groupIndex];
    newGroupMember.members.push(id);
    editFarmerGroup({ editedData: newGroupMember });
  };

  return (
    <>
      <S.InvisibleBox>
        <FarmerDetailsForm ref={farmerFormPdf} />
      </S.InvisibleBox>
      {isSuccess &&
        isSuccessAdmin &&
        farmerId &&
        Object.values(farmersDetailsById as farmerDetail[]).map((user) => (
          <S.FarmerFormPreviewLeft key={user.id}>
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
                  generateFarmerDetailsPDF();
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
                Edit{" "}
              </S.CustomPopoverList>
              <S.CustomPopoverList
                onClick={() => {
                  setOpenDeleteModal(true);
                  handleClose();
                }}
              >
                Delete{" "}
              </S.CustomPopoverList>
            </Popover>
            <S.FormHeading>
              <S.Text1>
                {titleName ? (
                  <>
                    {titleName} உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
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
            <S.FarmerImgContainer>
              <S.FarmerImg
                src={farmersDetailsById[user.id].profile ? decryptText(farmersDetailsById[user.id].profile) : profilePlaceholder}
                alt="profie-picture"
              />
              <S.EditBox
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(user.id);
                }}
              >
                <S.EditIcon>edit</S.EditIcon>
                <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
              </S.EditBox>
            </S.FarmerImgContainer>
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
              <AddFarmersDetailsModal
                openModal={true}
                handleClose={() => setOpenEditModal(false)}
                cb={updateFarmerDetail}
                editMode={true}
                id={user.id}
                // mdId={Object.values(mdDetailsById).find((data) => data.farmerId === user.id)?.id}
                mdId={Object.values(isSuccess && (mdDetailsById as IMdDetails[])).find((data) => data.farmerId === user.id)?.id}
              />
            )}
            {openDeleteModal && (
              <DeleteModal
                openModal={true}
                handleClose={() => setOpenDeleteModal(false)}
                handleDelete={async () => {
                  await removeGroupMember(user.id, user.group, false);
                  const isFarmerInMd = Object.values(isSuccess && (mdDetailsById as IMdDetails[])).find((data) => data.farmerId === user.id)?.id;
                  !isFarmerInMd &&
                    farmerDelete({
                      id: user.id,
                      successCb: () => {
                        addNotification({ id: `delete${user.id}`, image: user.profile, message: Message(user.name).deleteFarmDetail });
                        Toast({ message: "Farmer Deleted Successfully", type: "success", customId: `${toastId}-farmerDeleteSuccess` });
                      },
                      errorCb: () => {
                        Toast({ message: "Request failed! Please try again", type: "error", customId: `${toastId}-farmerDeleteFail` });
                      },
                    });
                  isFarmerInMd &&
                    farmerDelete({
                      id: user.id,
                      successCb: async () => {
                        mdDelete({
                          id: isFarmerInMd,
                          successCb: () => {
                            addNotification({ id: `delete${user.id}`, image: user.profile, message: Message(user.name).deleteFarmDetail });
                            Toast({ message: "Farmer Deleted Successfully", type: "success", customId: `${toastId}-farmerDeleteSuccessInmd` });
                          },
                          errorCb: () => {
                            Toast({ message: "Request failed! Please try again", type: "error", customId: `${toastId}-farmerdeleteFailInmd` });
                          },
                        });
                      },
                    });
                  navigate(-1);
                }}
                deleteMessage={
                  <span>
                    Do you want to remove <S.DeleteName>{farmersDetailsById[user.id].name}</S.DeleteName> from Farmers Details?
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
                  const isFarmerInMd = Object.values(isSuccess && (mdDetailsById as IMdDetails[])).find((data) => data.farmerId === user.id)?.id;
                  openConfirmationModal && (await removeGroupMember(user.id, openConfirmationModal.group, true));
                  const farmerEditData = { ...openConfirmationModal, id: openConfirmationModal?.farmerId };
                  delete farmerEditData.farmerId;
                  !isFarmerInMd &&
                    editFarmer({
                      editedData: farmerEditData,
                      successCb: () => {
                        Toast({ message: "MD Edited Successfully", type: "success", customId: `${toastId}-mdEditSuccess` });
                      },
                      errorCb: () => {
                        Toast({ message: "Request failed! Please try again", type: "error", customId: `${toastId}-mdEditFail` });
                      },
                    });
                  isFarmerInMd &&
                    editFarmer({
                      editedData: farmerEditData,
                      successCb: () => {
                        editMdDetail({ editedData: openConfirmationModal });
                        Toast({ message: "MD Edited Successfully", type: "success", customId: `${toastId}-mdEditSuccessInmd` });
                      },
                      errorCb: () => {
                        Toast({ message: "Request failed! Please try again", type: "error", customId: `${toastId}-mdEditFailInmd` });
                      },
                    });
                  setOpenConfirmationModal(null);
                  setOpenEditModal(false);
                }}
              />
            )}
          </S.FarmerFormPreviewLeft>
        ))}
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default FarmerFormPreviewLeft;
