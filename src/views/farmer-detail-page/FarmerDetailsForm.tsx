import { forwardRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { decryptText, ENDPOINTS } from "../../utils/constants";
import { farmerDetail } from "../../utils/store/slice/farmerDetails";
import { useAuthContext } from "../../utils/context/auth";
import { useFetch } from "../../utils/hooks/query";
import { FARMER_DATA } from "./constant";
import { S } from "./farmerDetailPage.styled";
import nerkathirDefaultLogo from "../../assets/images/logo.png";
import profilePlaceholder from "../../assets/images/profile-placeholder.jpg";

interface Props {
  farmerIdtoPrint?: number | string | null;
}

const FarmerDetailsForm = forwardRef<HTMLDivElement | undefined, Props>(({ farmerIdtoPrint }, ref) => {
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const { titleName, loginImage, address } = useAuthContext();
  const { farmerId } = useParams();

  return (
    <>
      {isSuccess &&
        Object.values(farmersDetailsById as farmerDetail[])
          .filter((name) => [farmerId, farmerIdtoPrint].includes(name.id))
          .map((user) => (
            <S.FarmersDetailsContent ref={ref} key={user.id}>
              <S.FarmersDetailsHeader>
                <S.NerkathirLogo src={loginImage ? decryptText(loginImage) : nerkathirDefaultLogo} alt="nerkathir-logo" />
                <S.HeaderTextContainer>
                  <S.HeaderText1>
                    {titleName ? (
                      titleName
                    ) : (
                      <>
                        நெற்கதிர் உழவர் <br />
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
                  <img
                    src={farmersDetailsById[user.id].profile ? decryptText(farmersDetailsById[user.id].profile) : profilePlaceholder}
                    alt="nerkathir-user"
                  />
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
    </>
  );
});

export default FarmerDetailsForm;
