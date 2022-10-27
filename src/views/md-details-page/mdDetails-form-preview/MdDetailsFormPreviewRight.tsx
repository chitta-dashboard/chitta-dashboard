import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useMdDetailsContext } from "../../../utils/context/mdDetails";
import { useAuthContext } from "../../../utils/context/auth";
import { MD_DATA } from "../constant";
import { S } from "./mdDetails-form-preview.styled";
import nerkathir_transparent_background from "../../../assets/images/nerkathir-background-transparent.svg";

const MdFormPreviewRight = () => {
  const { mdDetailsById } = useMdDetailsContext();
  const { pdfImage } = useAuthContext();
  const { mdId } = useParams();
  return (
    <>
      {Object.values(mdDetailsById)
        .filter((name) => [mdId].includes(name.id))
        .map((user) => (
          <S.MdFormPreviewRight key={user.id}>
            {MD_DATA.map((data) => {
              return (
                <Fragment key={data.id}>
                  <S.AbsoluteBackgroundImage>
                    <img src={pdfImage ? pdfImage : nerkathir_transparent_background} alt="backgroundimage" />
                  </S.AbsoluteBackgroundImage>
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
          </S.MdFormPreviewRight>
        ))}
    </>
  );
};

export default MdFormPreviewRight;
