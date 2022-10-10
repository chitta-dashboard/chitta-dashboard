import React, { forwardRef, Fragment, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fileValidation } from "../../utils/constants";
import { useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import ImagePreview from "../../utils/imageCrop/imagePreview";
import { FARMER_DATA } from "./constant";
import { S } from "./farmerDetailPage.styled";
import NerkathirUser from "../../assets/images/nerkathir-user.svg";
import NerkathirLogo from "../../assets/images/logo.svg";

interface Props {
  farmerIdtoPrint?: number | string;
}

const FarmerDetailsForm = forwardRef<HTMLDivElement | undefined, Props>(({ farmerIdtoPrint }, ref) => {
  const { farmersDetailsById, editTableIcon } = useFarmerDetailsContext();
  const { farmerId } = useParams();
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");

  const hiddenFileInput: any = useRef<HTMLInputElement>();

  const getURL = (id: string) => {
    let result = Object.values(farmersDetailsById).filter((item) => {
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
    let result = Object.values(farmersDetailsById).filter((item) => {
      return item.id === userId;
    });
    result[0]["profile"] = image;
    editTableIcon({ ...result[0] });
  };

  return (
    <>
      {Object.values(farmersDetailsById)
        .filter((name) => [farmerId, farmerIdtoPrint].includes(name.id))
        .map((user) => (
          <S.FarmersDetailsContent ref={ref} key={user.id}>
            <S.FarmersDetailsHeader>
              <S.NerkathirLogo src={NerkathirLogo} alt="nerkathir-logo" />
              <S.HeaderTextContainer>
                <S.HeaderText1>
                  நெற்கதிர் உழவர் <br />
                  உற்பத்தியாளர் நிறுவனம்
                </S.HeaderText1>
                <S.HeaderText2>
                  நபார்டு <br />
                  கள்ளக்குறிச்சி மாவட்டம்
                  <br />
                  உறுப்பினர் விண்ணப்பம்
                </S.HeaderText2>
              </S.HeaderTextContainer>
              <S.UserImgContainer>
                <img src={getURL(user.id) ? getURL(user.id) : NerkathirUser} alt="nerkathir-user" />
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
            </S.FarmersDetailsHeader>
            <S.HeaderTextBox>
              ஒருங்கிணைப்பாளர்: நேச்சர் ஃபார்ம் & ரூரல் டெவலப்மென்ட் சொசைட்டிஎண், 453,பவர் ஆபீஸ் மெயின் ரோடு, சடையம்பட்டு,சோமண்டார்குடி
              அஞ்சல்,கள்ளக்குறிச்சி தாலுக்கா&மாவட்டம், 606213
            </S.HeaderTextBox>
            <S.HeaderDateBox>
              <S.HeaderDateText>உறுப்பினர் எண் : NER-FPC-2</S.HeaderDateText>
              <S.HeaderDateText>நாள்: 22/08/22</S.HeaderDateText>
            </S.HeaderDateBox>
            <S.UserInfoContainer>
              {FARMER_DATA.map((data) => {
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
          </S.FarmersDetailsContent>
        ))}
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
});

export default FarmerDetailsForm;
