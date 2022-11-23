import { forwardRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { decryptText, ENDPOINTS } from "../../utils/constants";
import { mdDetail } from "../../utils/context/mdDetails";
import { adminFormInputs } from "../admin-panel";
import { useFetch } from "../../utils/hooks/query";
import { MD_DATA } from "./constant";
import S from "./md-details-page.styled";
import nerkathirDefaultLogo from "../../assets/images/logo.png";
import profilePlaceholder from "../../assets/images/profile-placeholder.jpg";

interface Props {
  MdIdtoPrint?: number | string;
}

const MdDetailsForm = forwardRef<HTMLDivElement | undefined, Props>(({ MdIdtoPrint }, ref) => {
  const {
    result: { data: mdDetailsById },
    formatChangeSuccess: isSuccess,
  } = useFetch(ENDPOINTS.mdDetails);
  const {
    formatChangeSuccess: isSuccessAdmin,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const current = new Date();

  const { headerLogo: headerImage, name: titleName, address } = isSuccessAdmin && Object.values(adminDetails as adminFormInputs)[0];

  const { mdId } = useParams();

  return (
    <>
      {Object.values(isSuccess && isSuccessAdmin && (mdDetailsById as mdDetail[]))
        .filter((name) => [mdId, MdIdtoPrint].includes(name.id))
        .map((user) => (
          <S.MdsDetailsContent ref={ref} key={user.id}>
            <S.MdsDetailsHeader>
              <S.NerkathirLogo src={headerImage ? decryptText(headerImage) : nerkathirDefaultLogo} alt="nerkathir-logo" />
              <S.HeaderTextContainer>
                <S.HeaderText1>
                  {titleName ? (
                    <>
                      {titleName} உழவர் <br />
                      உற்பத்தியாளர் நிறுவனம்
                    </>
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
                      நபார்டு கள்ளக்குறிச்சி மாவட்டம் <br />
                      உறுப்பினர் விண்ணப்பம்
                    </>
                  )}
                </S.HeaderText2>
              </S.HeaderTextContainer>
              <S.UserImgContainer>
                <img src={user.profile ? decryptText(user.profile) : profilePlaceholder} alt="nerkathir-user" />
              </S.UserImgContainer>
            </S.MdsDetailsHeader>
            <S.HeaderTextBox>
              ஒருங்கிணைப்பாளர்: நேச்சர் ஃபார்ம் & ரூரல் டெவலப்மென்ட் சொசைட்டிஎண், 453,பவர் ஆபீஸ் மெயின் ரோடு, சடையம்பட்டு,சோமண்டார்குடி
              அஞ்சல்,கள்ளக்குறிச்சி தாலுக்கா&மாவட்டம், 606213
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
                  {Object.values(user.surveyNo).map((item: unknown, i) => {
                    return (
                      <Fragment key={i}>
                        <>
                          {item}
                          {Object.values(user.surveyNo).length === 1 || Object.values(user.surveyNo).length - 1 === i || item === "" ? " " : ","}
                          &nbsp;
                        </>
                      </Fragment>
                    );
                  })}
                </S.UserInfoData2>
              </S.UserInfoRow>
              <S.UserInfoRow>
                <S.UserInfoData1>ஏக்கர்</S.UserInfoData1>
                <S.UserInfoData2>
                  {Object.values(user.acre).map((item: unknown, i) => {
                    return (
                      <Fragment key={i}>
                        <>
                          {item}
                          {Object.values(user.acre).length === 1 || Object.values(user.acre).length - 1 === i || item === "" ? " " : ","}
                          &nbsp;
                        </>
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
            </S.UserInfoContainer>
          </S.MdsDetailsContent>
        ))}
    </>
  );
});

export default MdDetailsForm;
