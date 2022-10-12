import { useRef, useState } from "react";
import ProfilePicture from "./../../assets/images/IdImage.png";
import { fileValidation } from "../../utils/constants";
import ImagePreview from "../../utils/imageCrop/imagePreview";
import { ceoDetail, useCeoDetailsContext } from "../../utils/context/ceoDetails";
import AddCeoDetailsModal from "../../components/modals/ceo-details-modal";
import { IAddCEODetailsFormInput } from "../../components/modals/type/formInputs";
import DeleteModal from "../../components/modals/delete-modal";
import S from "./ceo-details.styled";

interface Props {
  user: ceoDetail;
}

const CeoDetailsCard = ({ user }: Props) => {
  const [image, setImage] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const { ceoDetailsById, editCeoDetail, deleteCeoDetail } = useCeoDetailsContext();

  const calculateAge = (dob1: string) => {
    var today = new Date();
    var birthDate = new Date(dob1);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  const handleIconClick = () => {
    hiddenFileInput && hiddenFileInput.current.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let isValid = e.target && fileValidation(e.target.files[0].name);
    e.target.files && isValid && setImage(window.URL.createObjectURL(e.target.files[0]));
    return false;
  };

  const getURL = (id: string) => {
    let result = Object.values(ceoDetailsById).filter((item) => {
      return item.id === id ? item.profile : null;
    });
    let data = result.length > 0 ? result[0]["profile"] : undefined;
    return data;
  };

  // this function is to clear the value of input field, so we can upload same file as many time has we want.
  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  const handleCroppedImage = (image: string) => {
    if (!image) return;
    let result = Object.values(ceoDetailsById).filter((item) => {
      return item.id === user.id;
    });
    result[0]["profile"] = image;
    editCeoDetail({ ...result[0] });
  };

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const updateMdDetail = (data: IAddCEODetailsFormInput & { id: string }) => {
    editCeoDetail(data);
  };

  return (
    <>
      <S.CeoDetailCard>
        <S.CeoDetailData>
          <S.CeoDataLeft>
            <S.ProfilePictureBox>
              <S.CeoProfilePicture src={getURL(user.id) ? getURL(user.id) : ProfilePicture} alt="profile picture" />
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
              <S.CeoInfo>கைபேசி எண்: </S.CeoInfo>
              <S.CeoInfo>பிறந்த தேதி:</S.CeoInfo>
              <S.CeoInfo>தகுதி:</S.CeoInfo>
            </S.CeoData>
            <S.CeoData>
              <S.CeoInfo>{user.phoneNumber}</S.CeoInfo>
              <S.CeoInfo>{user.dob}</S.CeoInfo>
              <S.CeoInfo>{user.qualification}</S.CeoInfo>
            </S.CeoData>
          </S.CeoDataRight>
        </S.CeoDetailData>
        <S.CeoDetailDescription>{user.description}</S.CeoDetailDescription>
        <S.ButtonContainer>
          <S.CustomIconContainer
            onClick={() => {
              setOpenDeleteModal(true);
            }}
          >
            delete
          </S.CustomIconContainer>
          <S.CustomIconContainer>id-card</S.CustomIconContainer>
          <S.CustomIconContainer
            onClick={() => {
              addModalHandler();
            }}
          >
            edit
          </S.CustomIconContainer>
        </S.ButtonContainer>
      </S.CeoDetailCard>
      {addModal && <AddCeoDetailsModal openModal={true} handleClose={addModalHandler} cb={updateMdDetail} editMode={true} id={user.id} />}
      {openDeleteModal && (
        <DeleteModal
          openModal={true}
          handleClose={() => setOpenDeleteModal(false)}
          handleDelete={() => {
            deleteCeoDetail(user.id);
          }}
        />
      )}
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default CeoDetailsCard;
