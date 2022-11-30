import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { IMdDetails } from "../../../utils/context/mdDetails";
import { useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import { adminFormInputs } from "../../admin-panel";
import { decryptText } from "../../../utils/constants";
import { S } from "./mdDetails-form-preview.styled";
import nerkathir_transparent_background from "../../../assets/images/logo.svg";

const MdFormPreviewRight = () => {
  const {
    formatChangeSuccess: isSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);
  const {
    formatChangeSuccess: isSuccessAdmin,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const { pdfLogo: pdfImage } = isSuccessAdmin && Object.values(adminDetails as adminFormInputs)[0];

  const { mdId } = useParams();
  return (
    <>
      {Object.values(isSuccess && isSuccessAdmin && (mdDetailsById as IMdDetails[]))
        .filter((name) => [mdId].includes(name.id))
        .map((user) => (
          <S.MdFormPreviewRight key={user.id}>
            <S.AbsoluteBackgroundImage>
              <img src={pdfImage ? decryptText(pdfImage) : nerkathir_transparent_background} alt="backgroundimage" />
            </S.AbsoluteBackgroundImage>
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
          </S.MdFormPreviewRight>
        ))}
    </>
  );
};

export default MdFormPreviewRight;
