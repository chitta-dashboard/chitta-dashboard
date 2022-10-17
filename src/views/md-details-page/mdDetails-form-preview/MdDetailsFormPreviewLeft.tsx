import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popover } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import MdDetailsForm from "../MdDetailsForm";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import IconWrapper from "../../../utils/iconWrapper";
import { fileValidation } from "../../../utils/constants";
import { IAddMDDetailsFormInput } from "../../../components/modals/type/formInputs";
import AddMdsDetailsModal from "../../../components/modals/md-details-modal";
import DeleteModal from "../../../components/modals/delete-modal";
import { S } from "./mdDetails-form-preview.styled";
import NerkathirUser from "../../../assets/images/nerkathir-user.svg";
import { useMdDetailsContext } from "../../../utils/context/mdDetails";

const MdFormPreviewLeft = () => {
  const {mdDetailsById,editMdDetail,deleteMdDetail} = useMdDetailsContext();

  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const mdFormPdf = useRef<HTMLDivElement>();
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const { mdId } = useParams();
  const navigate = useNavigate();

  // popover open
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // popover close
  const handleClose = () => {
    setAnchorEl(null);
  };

  const current = new Date();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // to generate Md detail form
  const generateMdDetailsPDF = useReactToPrint({
    documentTitle: `Nerkathir_MdForm${+new Date()}`,
    content: () => mdFormPdf.current as HTMLDivElement,
  });

  // to change profile picture
  const getURL = (id: string) => {
    let result = Object.values(mdDetailsById).filter((item) => {
      return item.id === id ? item.profile : null;
    });
    let data = result.length > 0 ? result[0]["profile"] : undefined;
    return data;
  };

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
    let result = Object.values(mdDetailsById).filter((item) => {
      return item.id === userId;
    });
    result[0]["profile"] = image;
    editMdDetail({ ...result[0] });
  };

  //Update MdDetail Handler
  const updateMdDetail = (data: IAddMDDetailsFormInput & { id: string; membershipId?: string }) => {
    editMdDetail(data);
  };

  return (
    <>
      <S.InvisibleBox>
        <MdDetailsForm ref={mdFormPdf} />
      </S.InvisibleBox>
      {Object.values(mdDetailsById)
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
                நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
              </S.Text1>
              <S.Text2>
                நபார்டு,கள்ளக்குறிச்சி மாவட்டம் <br /> உறுப்பினர் விண்ணப்பம்
              </S.Text2>
            </S.FormHeading>
            <S.MdImgContainer>
              <S.MdImg src={getURL(user.id) ? getURL(user.id) : NerkathirUser} alt="profie-picture" />
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
              <AddMdsDetailsModal
                openModal={true}
                handleClose={() => setOpenEditModal(false)}
                cb={updateMdDetail}
                editMode={true}
                id={user.id}
              />
            )}
            {openDeleteModal && (
              <DeleteModal
                openModal={true}
                handleClose={() => setOpenDeleteModal(false)}
                handleDelete={() => {
                  deleteMdDetail(user.id);
                  navigate(-1);
                }}
                deleteMessage={
                  <span>
                    Do you want to remove <S.DeleteName>{mdDetailsById[user.id].name}</S.DeleteName> from CeoList?
                  </span>
                }
              />
            )}
          </S.MdFormPreviewLeft>
        ))}
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default MdFormPreviewLeft;
