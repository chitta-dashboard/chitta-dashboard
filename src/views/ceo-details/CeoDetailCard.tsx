import { useRef, useState } from "react";
import S from "./ceo-details.styled";
import placeHolderImg from "./../../assets/images/profile-placeholder.jpg";
import AddCeoDetailsModal from "../../components/modals/ceo-details-modal";
import ConfirmationModal from "../../components/modals/confirmation-modal";
import DeleteModal from "../../components/modals/delete-modal";
import IdCardModal from "../../components/modals/id-download-modal";
import { IAddCEODetailsFormInput } from "../../components/modals/type/formInputs";
import { calculateAge, decryptText, encryptText, ENDPOINTS, fileValidation, imageCompressor, Message } from "../../utils/constants";
import { useAuthContext } from "../../utils/context/auth";
import { CeoDetail } from "../../utils/context/ceoDetails";
import { useDelete, useEdit, useFetch } from "../../utils/hooks/query";
import ImagePreview from "../../utils/imageCrop/imagePreview";
import Loader from "../../utils/loaders/tree-loader";
import Toast from "../../utils/toast";

interface Props {
  user: CeoDetail;
}

const CeoDetailsCard = ({ user }: Props) => {
  // constants
  const toastId = "toastId";
  // Queries
  const { mutate: ceoEdit } = useEdit(ENDPOINTS.ceo);
  const { mutate: ceoDelete } = useDelete(ENDPOINTS.ceo);
  const {
    formatChangeSuccess,
    result: { data: ceoDetailsById },
  } = useFetch(ENDPOINTS.ceo);
  const { mutate: editCeoDetail } = useEdit(ENDPOINTS.ceo);
  // state values
  const { addNotification } = useAuthContext();
  const [image, setImage] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [idCard, setIdCard] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState<(IAddCEODetailsFormInput & { id: string }) | null>(null);
  const [cardExpand, setCardExpand] = useState<boolean>(true);
  const hiddenFileInput: any = useRef<HTMLInputElement>();

  const handleIconClick = () => {
    hiddenFileInput && hiddenFileInput.current.click();
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
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedBase64 = await imageCompressor(profileBlob);
    if (!image) return;
    let result = ceoDetailsById[user.id];
    const encryptedBase64 = encryptText(compressedBase64);
    editCeoDetail({ editedData: { ...result, profile: encryptedBase64 } });
  };

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const updateMdDetail = (data: IAddCEODetailsFormInput & { id: string }) => {
    setOpenConfirmationModal(data);
  };

  const idCardModalHandler = () => setIdCard(!idCard);

  return (
    <>
      <S.CeoDetailCard>
        {formatChangeSuccess ? (
          <>
            <S.CeoDetailData>
              <S.CeoDataLeft>
                <S.ProfilePictureBox>
                  <S.CeoProfilePicture
                    src={ceoDetailsById[user.id]?.profile ? decryptText(ceoDetailsById[user.id]?.profile) : placeHolderImg}
                    alt="profile picture"
                  />
                  <S.EditBox
                    onClick={() => {
                      handleIconClick();
                    }}
                  >
                    <S.EditIcon>edit</S.EditIcon>
                    <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
                  </S.EditBox>
                </S.ProfilePictureBox>
                <S.CeoData>
                  <S.CeoName>{user.name}</S.CeoName>
                  <S.CeoAge>Age : {calculateAge(user.dob)}</S.CeoAge>
                  <S.CeoJoinedDate>{user.joinedDate}</S.CeoJoinedDate>
                </S.CeoData>
              </S.CeoDataLeft>
              <S.CeoDataRight>
                <S.CeoData>
                  <S.CeoInfoLeft>கைபேசி எண்: </S.CeoInfoLeft>
                  <S.CeoInfoLeft>பிறந்த தேதி:</S.CeoInfoLeft>
                  <S.CeoInfoLeft>தகுதி:</S.CeoInfoLeft>
                </S.CeoData>
                <S.CeoData>
                  <S.CeoInfo>{user.phoneNumber}</S.CeoInfo>
                  <S.CeoInfo>{user.dob}</S.CeoInfo>
                  <S.CeoInfo>
                    {user.qualification.split("").splice(0, 14).join("")}
                    {user.qualification.length > 14 ? "..." : ""}
                  </S.CeoInfo>
                </S.CeoData>
              </S.CeoDataRight>
            </S.CeoDetailData>
            <S.CeoDetailDescription cardexpand={cardExpand.toString()}>
              {cardExpand ? (
                <>
                  {user.description.split(" ").splice(0, 19).join(" ")}
                  {user.description.split(" ").length > 19 ? "..." : ""}
                </>
              ) : (
                user.description
              )}
            </S.CeoDetailDescription>
            <S.ButtonContainer>
              {user.description.split(" ").length > 19 && (
                <S.SeeMore
                  onClick={() => {
                    setCardExpand(!cardExpand);
                  }}
                >
                  {cardExpand ? "See More..." : "See Less..."}
                </S.SeeMore>
              )}
              <S.CustomIconContainer
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
              >
                delete
              </S.CustomIconContainer>
              <S.CustomIconContainer onClick={idCardModalHandler}>id-card</S.CustomIconContainer>
              <S.CustomIconContainer
                onClick={() => {
                  addModalHandler();
                }}
              >
                edit
              </S.CustomIconContainer>
            </S.ButtonContainer>
          </>
        ) : (
          <Loader />
        )}
      </S.CeoDetailCard>
      <IdCardModal cardData={user} openModal={idCard} handleClose={idCardModalHandler} />
      {addModal && <AddCeoDetailsModal openModal={true} handleClose={addModalHandler} cb={updateMdDetail} editMode={true} id={user.id} />}
      {openDeleteModal && (
        <DeleteModal
          openModal={true}
          handleClose={() => setOpenDeleteModal(false)}
          handleDelete={() => {
            ceoDelete({
              id: user.id,
              successCb: () => {
                addNotification({ id: `delete_${user.id}`, image: user.profile, message: Message(user.name).deleteCeoDetails });
                Toast({ message: "CEO deleted successfully.", type: "success", customId: `${toastId}-ceoDeletedSuccess` });
              },
              errorCb: () => {
                Toast({ message: "Request failed, please try again.", type: "error", customId: `${toastId}-ceoDeleteFail` });
              },
            });
          }}
          deleteMessage={
            <span>
              Do you want to remove <S.DeleteName>{user.name}</S.DeleteName> from CEO Details?
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
            ceoEdit({
              editedData: openConfirmationModal,
              successCb: () => {
                Toast({ message: "CEO updated successfully.", type: "success", customId: `${toastId}-ceoUpdateSuccess` });
              },
              errorCb: () => {
                Toast({ message: "Request failed, please try again.", type: "error", customId: `${toastId}-ceoUpdateFail` });
              },
            });
            setOpenConfirmationModal(null);
          }}
        />
      )}
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default CeoDetailsCard;
