import React, { forwardRef, Fragment, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptText, encryptText, ENDPOINTS, fileValidation, imageCompressor } from "../../utils/constants";
import { mdDetail } from "../../utils/context/mdDetails";
import { useAuthContext } from "../../utils/context/auth";
import { useEdit, useFetch } from "../../utils/hooks/query";
import ImagePreview from "../../utils/imageCrop/imagePreview";
import { MD_DATA } from "./constant";
import S from "./md-details-page.styled";
import profilePlaceholder from "../../assets/images/profile-placeholder.jpg";
import NerkathirLogo from "../../assets/images/logo.svg";

interface Props {
  MdIdtoPrint?: number | string;
}

const MdDetailsForm = forwardRef<HTMLDivElement | undefined, Props>(({ MdIdtoPrint }, ref) => {
  const {
    result: { data: mdDetailsById },
    formatChangeSuccess: isSuccess,
  } = useFetch(ENDPOINTS.mdDetails);
  const { mutate: editMdDetail } = useEdit(ENDPOINTS.mdDetails);
  const { mutate: editFarmer } = useEdit(ENDPOINTS.farmerDetails);
  const { headerImage, titleName, address } = useAuthContext();
  const { mdId } = useParams();
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");

  const hiddenFileInput: any = useRef<HTMLInputElement>();

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
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedBase64 = await imageCompressor(profileBlob);
    if (isSuccess) {
      if (!image) return;
      let user = mdDetailsById[userId];
      user["profile"] = encryptText(compressedBase64);
      const farmerEditData = { ...user, id: user.farmerId } as mdDetail;
      delete farmerEditData.farmerId;
      editFarmer({ editedData: farmerEditData, successCb: () => editMdDetail({ editedData: user }) });
    }
  };

  return (
    <>
      {Object.values(isSuccess && (mdDetailsById as mdDetail[]))
        .filter((name) => [mdId, MdIdtoPrint].includes(name.id))
        .map((user) => (
          <S.MdsDetailsContent ref={ref} key={user.id}>
            <S.MdsDetailsHeader>
              <S.NerkathirLogo src={headerImage ? decryptText(headerImage) : NerkathirLogo} alt="nerkathir-logo" />
              <S.HeaderTextContainer>
                <S.HeaderText1>
                  {titleName ? (
                    titleName
                  ) : (
                    <>
                      நெற்கதிர் உழவர்
                      <br />
                      உற்பத்தியாளர் நிறுவனம்
                    </>
                  )}
                </S.HeaderText1>
                <S.HeaderText2>
                  {address ? (
                    address
                  ) : (
                    <>
                      நபார்டு <br />
                      கள்ளக்குறிச்சி மாவட்டம்
                    </>
                  )}
                  <br />
                  உறுப்பினர் விண்ணப்பம்
                </S.HeaderText2>
              </S.HeaderTextContainer>
              <S.UserImgContainer>
                <img src={user.profile ? decryptText(user.profile) : profilePlaceholder} alt="nerkathir-user" />
                <S.EditBox
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIconClick(user.id);
                  }}
                >
                  <S.EditIcon>edit</S.EditIcon>
                  <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
                </S.EditBox>
              </S.UserImgContainer>
            </S.MdsDetailsHeader>
            <S.HeaderTextBox>
              ஒருங்கிணைப்பாளர்: நேச்சர் ஃபார்ம் & ரூரல் டெவலப்மென்ட் சொசைட்டிஎண், 453,பவர் ஆபீஸ் மெயின் ரோடு, சடையம்பட்டு,சோமண்டார்குடி
              அஞ்சல்,கள்ளக்குறிச்சி தாலுக்கா&மாவட்டம், 606213
            </S.HeaderTextBox>
            <S.HeaderDateBox>
              <S.HeaderDateText>உறுப்பினர் எண் : NER-FPC-2</S.HeaderDateText>
              <S.HeaderDateText>நாள்: 22/08/22</S.HeaderDateText>
            </S.HeaderDateBox>
            <S.UserInfoContainer>
              {MD_DATA.map((data) => {
                return (
                  <Fragment key={data.id}>
                    <S.UserInfoRow>
                      <S.UserInfoData1>பெயர்</S.UserInfoData1>
                      <S.UserInfoData2>{user.name}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>தந்தை பெயர்</S.UserInfoData1>
                      <S.UserInfoData2>{data.fatherName}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>பாலினம்</S.UserInfoData1>
                      <S.UserInfoData2>{data.gender}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>கணவர் / மனைவி பெயர்</S.UserInfoData1>
                      <S.UserInfoData2>{data.husbandName}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>பிறந்த தேதி</S.UserInfoData1>
                      <S.UserInfoData2>{data.DOB}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>குழு</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>கைபேசி எண்</S.UserInfoData1>
                      <S.UserInfoData2>{data.phoneNumber}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>ஆதார் எண்</S.UserInfoData1>
                      <S.UserInfoData2>{data.aadharNumber}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>வாக்காளர் அட்டை எண்</S.UserInfoData1>
                      <S.UserInfoData2>{data.voterIdNumber}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>சர்வே எண்</S.UserInfoData1>
                      <S.UserInfoData2>{data.surveyNo}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>ஏக்கர்</S.UserInfoData1>
                      <S.UserInfoData2>{data.acre}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>கல்வி</S.UserInfoData1>
                      <S.UserInfoData2>{data.education}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>கிராமம்</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>அஞ்சல் குறியீடு</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>முகவரி</S.UserInfoData1>
                      <S.UserInfoData2>{data.address}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>தாலுக்கா</S.UserInfoData1>
                      <S.UserInfoData2>{data.circle}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>மாவட்டம்</S.UserInfoData1>
                      <S.UserInfoData2>{data.district}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>கணக்கெடுப்பு எண்</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>நில வகை</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>நீர் வகை</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>புல வகை</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>விதை வகை</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>விலங்குகள்</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>குழு உறுப்பினர்</S.UserInfoData1>
                      <S.UserInfoData2></S.UserInfoData2>
                    </S.UserInfoRow>
                  </Fragment>
                );
              })}
            </S.UserInfoContainer>
          </S.MdsDetailsContent>
        ))}
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
});

export default MdDetailsForm;
