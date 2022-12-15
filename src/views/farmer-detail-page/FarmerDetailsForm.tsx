import { forwardRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { decryptText, ENDPOINTS } from "../../utils/constants";
//import { farmerDetail } from "../../utils/store/slice/farmerDetails";
import { farmerDetail, useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { useFetch, useIdByPage } from "../../utils/hooks/query";
import { adminFormInputs } from "../admin-panel";
import { S } from "./farmerDetailPage.styled";
import nerkathirDefaultLogo from "../../assets/images/logo.png";
import profilePlaceholder from "../../assets/images/profile-placeholder.jpg";

interface Props {
  farmerIdtoPrint?: number | string | null;
  params?: string;
}

const FarmerDetailsForm = forwardRef<HTMLDivElement | undefined, Props>(({ farmerIdtoPrint, params }, ref) => {
  const { farmerBankDetail } = useFarmerDetailsContext();
  const { farmerId } = useParams();

  let {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useIdByPage(ENDPOINTS.farmerDetails, farmerId);

  const {
    formatChangeSuccess: isSuccessAdmin,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const current = new Date();

  const { loginLogo: loginImage, name: titleName, address, coordinatorAddress } = isSuccessAdmin && Object.values(adminDetails as adminFormInputs)[0];

  return (
    <>
      {isSuccess &&
        isSuccessAdmin &&
        Object.values(farmersDetailsById as farmerDetail[])
          .filter((name) => [farmerId, farmerIdtoPrint].includes(name.id))
          .map((user) => (
            <S.FarmersDetailsContent ref={ref} key={user.id}>
              <S.FarmersDetailsHeader>
                <S.NerkathirLogo src={loginImage ? decryptText(loginImage) : nerkathirDefaultLogo} alt="nerkathir-logo" />
                <S.HeaderTextContainer>
                  <S.HeaderText1>
                    {titleName ? (
                      <>
                        {titleName} உழவர் <br />
                        உற்பத்தியாளர் நிறுவனம்
                      </>
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
                        நபார்டு கள்ளக்குறிச்சி மாவட்டம்
                        <br />
                        உறுப்பினர் விண்ணப்பம்
                      </>
                    )}
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
                ஒருங்கிணைப்பாளர்:{" "}
                {coordinatorAddress ? (
                  coordinatorAddress
                ) : (
                  <>
                    நேச்சர் ஃபார்ம் & ரூரல் டெவல்மென்ட் சொசைட்டிஎண், 453,பவர் ஆபீஸ் மெயின் ரோடு, சடையம்பட்டு,சோமண்டார்குடி அஞ்சல்,கள்ளக்குறிச்சி
                    தாலுக்கா&மாவட்டம், 606213
                  </>
                )}
              </S.HeaderTextBox>
              <S.HeaderDateBox>
                <S.HeaderDateText>உறுப்பினர் எண் : NER-FPC-2</S.HeaderDateText>
                <S.HeaderDateText>
                  நாள்: {current.getDate()}/{current.getMonth() + 1}/{current.getFullYear()}
                </S.HeaderDateText>
              </S.HeaderDateBox>
              <S.UserInfoContainer>
                <S.UserInfoRow>
                  <S.UserInfoData1>பெயர்</S.UserInfoData1>
                  <S.UserInfoData2>{user.name}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>தந்தை பெயர்</S.UserInfoData1>
                  <S.UserInfoData2>{user.fatherName}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>பாலினம்</S.UserInfoData1>
                  <S.UserInfoData2>{user.sex}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>கணவர் / மனைவி பெயர்</S.UserInfoData1>
                  <S.UserInfoData2>{user.spouseName}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>பிறந்த தேதி</S.UserInfoData1>
                  <S.UserInfoData2>{user.dob}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>குழு</S.UserInfoData1>
                  <S.UserInfoData2>{user.group}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>கைபேசி எண்</S.UserInfoData1>
                  <S.UserInfoData2>{user.phoneNumber}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>ஆதார் எண்</S.UserInfoData1>
                  <S.UserInfoData2>{user.addhaarNo}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>வாக்காளர் அட்டை எண்</S.UserInfoData1>
                  <S.UserInfoData2>{user.membershipId}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>சர்வே எண்</S.UserInfoData1>
                  <S.UserInfoData2>
                    {Object.values(user.surveyNo).map((item: string, i) => {
                      return (
                        <Fragment key={i}>
                          {item}
                          {Object.values(user.surveyNo).length === 1 || Object.values(user.surveyNo).length - 1 === i || item === "" ? " " : ","}
                          &nbsp;
                        </Fragment>
                      );
                    })}
                  </S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>ஏக்கர்</S.UserInfoData1>
                  <S.UserInfoData2>
                    {Object.values(user.acre).map((item: string, i) => {
                      return (
                        <Fragment key={i}>
                          {item}
                          {Object.values(user.acre).length === 1 || Object.values(user.acre).length - 1 === i || item === "" ? " " : ","}
                          &nbsp;
                        </Fragment>
                      );
                    })}
                  </S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>கல்வி</S.UserInfoData1>
                  <S.UserInfoData2>{user.qualification}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>கிராமம்</S.UserInfoData1>
                  <S.UserInfoData2>{user.village}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>அஞ்சல் குறியீடு</S.UserInfoData1>
                  <S.UserInfoData2>{user.postalNo}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>முகவரி</S.UserInfoData1>
                  <S.UserInfoData2>{user.address}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>தாலுக்கா</S.UserInfoData1>
                  <S.UserInfoData2>{user.taluk}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>மாவட்டம்</S.UserInfoData1>
                  <S.UserInfoData2>{user.district}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>கணக்கெடுப்பு எண்</S.UserInfoData1>
                  <S.UserInfoData2>{user.membershipId}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>நில வகை</S.UserInfoData1>
                  <S.UserInfoData2>{user.landType}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>நீர் வகை</S.UserInfoData1>
                  <S.UserInfoData2>{user.waterType}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>புல வகை</S.UserInfoData1>
                  <S.UserInfoData2>{user.farmerType}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>விதை வகை</S.UserInfoData1>
                  <S.UserInfoData2>{user.cropsType}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>விலங்குகள்</S.UserInfoData1>
                  <S.UserInfoData2>{user.animals}</S.UserInfoData2>
                </S.UserInfoRow>
                <S.UserInfoRow>
                  <S.UserInfoData1>குழு உறுப்பினர்</S.UserInfoData1>
                  <S.UserInfoData2>{user.groupMember}</S.UserInfoData2>
                </S.UserInfoRow>
                {farmerBankDetail && (
                  <>
                    <S.UserInfoRow>
                      <S.UserInfoData1>வங்கி கணக்கில் இருக்கும் பெயர்</S.UserInfoData1>
                      <S.UserInfoData2>{user.nameAsPerBank}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>வங்கியின் பெயர்</S.UserInfoData1>
                      <S.UserInfoData2>{user.bankName}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>வங்கி கணக்கு எண்</S.UserInfoData1>
                      <S.UserInfoData2>{user.accountNumber && decryptText(user.accountNumber)}</S.UserInfoData2>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoData1>IFSC குறியீடு</S.UserInfoData1>
                      <S.UserInfoData2>{user.ifscCode}</S.UserInfoData2>
                    </S.UserInfoRow>
                  </>
                )}
              </S.UserInfoContainer>
            </S.FarmersDetailsContent>
          ))}
    </>
  );
});

export default FarmerDetailsForm;
