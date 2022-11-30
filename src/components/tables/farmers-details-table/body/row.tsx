import { useState, useRef, FC, useEffect } from "react";
import { Checkbox, Stack, TableRow } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../utils/context/auth";
import { ENDPOINTS, decryptText, fileValidation, Message, imageCompressor, encryptText } from "../../../../utils/constants";
import FarmersDetailsIconModal from "../../../icon-modals/farmers-detail-icon-modal";
import FarmersDetailsModal from "../../../modals/farmers-details-modal";
import DeleteModal from "../../../modals/delete-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import FarmerDetailsForm from "../../../../views/farmer-detail-page/FarmerDetailsForm";
import IdCardBody from "../../../id-card/id-card-body";
import IdCardModal from "../../../modals/id-download-modal";
import CS from "../../../common-styles/commonStyles.styled";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { useDelete, useEdit, useFetch } from "../../../../utils/hooks/query";
import Toast from "../../../../utils/toast";
import { IMdDetails } from "../../../../utils/context/mdDetails";
import placeHolderImg from "../../../../assets/images/profile-placeholder.jpg";
import S from "./body.styled";

interface FarmersDetailsRowProps {
  user: farmerDetail | any;
  removeGroupMember: (id: string, group: string, isAdd: boolean) => void;
}

const FarmersDetailsRow: FC<FarmersDetailsRowProps> = ({ user, removeGroupMember }) => {
  const { checkboxSelect, selectedFarmers } = useFarmerDetailsContext();
  const {
    formatChangeSuccess: isSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);
  const { mutate: editMdDetail } = useEdit(ENDPOINTS.mdDetails);
  const { mutate: editFarmer } = useEdit(ENDPOINTS.farmerDetails);
  const { mutate: farmerDelete } = useDelete(ENDPOINTS.farmerDetails);
  const { mutate: mdDelete } = useDelete(ENDPOINTS.mdDetails);
  const { addNotification } = useAuthContext();
  const navigate = useNavigate();
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<IMdDetails>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const idCardRef = useRef<HTMLDivElement>();
  const farmerDetailFormRef = useRef<HTMLDivElement>();
  const [image, setImage] = useState("");
  const [farmerIdtoPrint, setFarmerIdtoPrint] = useState<number | string | null>(null);
  const [idCard, setIdCard] = useState(false);
  const hiddenFileInput: any = useRef<HTMLInputElement>();

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

  const handleCroppedImage = async (image: string) => {
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedBase64 = await imageCompressor(profileBlob);
    if (!image) return;
    const encryptedBase64 = await encryptText(compressedBase64);
    const isFarmerInMd = (Object.values(isSuccess && mdDetailsById) as IMdDetails[]).find((data) => data.farmerId === user.id)?.id;
    !isFarmerInMd &&
      editFarmer({
        editedData: { ...user, profile: encryptedBase64 },
        successCb: () => {
          Toast({ message: "Farmer Edited Successfully", type: "success" });
        },
        errorCb: () => {
          Toast({ message: "Request failed! Please try again", type: "error" });
        },
      });
    isFarmerInMd &&
      editFarmer({
        editedData: { ...user, profile: encryptedBase64 },
        successCb: async () => {
          await editMdDetail({
            editedData: { ...user, profile: encryptedBase64, farmerId: user.id, id: isFarmerInMd },
            successCb: () => {
              Toast({ message: "Farmer Edited Successfully", type: "success" });
            },
            errorCb: () => {
              Toast({ message: "Request failed! Please try again", type: "error" });
            },
          });
        },
      });
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
          <Checkbox onChange={() => checkboxSelect(user.id)} checked={selectedFarmers.includes(user.id)} />
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
            <S.AvatarBox
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
              <S.AvatarImg alt="User-img" src={getURL(user) ? decryptText(getURL(user)) : placeHolderImg} />
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
            mdId={(Object.values(isSuccess && mdDetailsById) as IMdDetails[]).find((data) => data.farmerId === user.id)?.id}
          />
          <IdCardModal cardData={user} openModal={idCard} handleClose={idCardhandler} />
          <DeleteModal
            openModal={deleteModal}
            handleClose={() => setDeleteModal(false)}
            handleDelete={async () => {
              await removeGroupMember(user.id, user.group, false);
              const isFarmerInMd = (Object.values(isSuccess && mdDetailsById) as IMdDetails[]).find((data) => data.farmerId === user.id)?.id;
              !isFarmerInMd &&
                farmerDelete({
                  id: user.id,
                  successCb: () => {
                    Toast({ message: "Farmer Deleted Successfully", type: "success" });
                    addNotification({ id: `delete${user.id}`, image: user.profile, message: Message(user.name).deleteFarmDetail });
                  },
                  errorCb: () => {
                    Toast({ message: "Request failed! Please try again", type: "error" });
                  },
                });
              isFarmerInMd &&
                farmerDelete({
                  id: user.id,
                  successCb: async () => {
                    await mdDelete({
                      id: isFarmerInMd,
                      successCb: () => {
                        Toast({ message: "Farmer Deleted Successfully", type: "success" });
                        addNotification({ id: `delete${user.id}`, image: user.profile, message: Message(user.name).deleteFarmDetail });
                      },
                      errorCb: () => {
                        Toast({ message: "Request failed! Please try again", type: "error" });
                      },
                    });
                  },
                });
              setDeleteModal(false);
              setIconModal(false);
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
            yesAction={async () => {
              const isFarmerInMd = (Object.values(isSuccess && mdDetailsById) as IMdDetails[]).find((data) => data.farmerId === user.id)?.id;
              editData && (await removeGroupMember(user.id, editData.group, true));
              const farmerEditData = { ...editData, id: editData?.farmerId };
              delete farmerEditData.farmerId;
              !isFarmerInMd &&
                editFarmer({
                  editedData: farmerEditData,
                  successCb: () => {
                    Toast({ message: "Farmer Edited Successfully", type: "success" });
                  },
                  errorCb: () => {
                    Toast({ message: "Request failed! Please try again", type: "error" });
                  },
                });
              isFarmerInMd &&
                editFarmer({
                  editedData: farmerEditData,
                  successCb: () => {
                    editMdDetail({ editedData: editData });
                    Toast({ message: "Farmer Edited Successfully", type: "success" });
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
    </>
  );
};

export default FarmersDetailsRow;
