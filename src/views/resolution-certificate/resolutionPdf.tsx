import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import NerkathirLogo from "../../assets/images/logo.svg";
import { useFetch } from "../../utils/hooks/query";
import { IResolutions } from "../../utils/context/resolution";
import Loader from "../../utils/loaders/tree-loader";
import { ENDPOINTS } from "../../utils/constants";
import { AdminFormInputs } from "../admin-panel";
import { S } from "./resolutionCertificate.styled";

interface Props {
  resolutionId?: string | null;
}

const ResolutionPdf = forwardRef<HTMLDivElement, Props>(({ resolutionId: resolutionIdFromProp }, ref) => {
  //constants
  const {
    formatChangeSuccess,
    result: { data: resolutions },
  } = useFetch(ENDPOINTS.resolutions);
  const {
    formatChangeSuccess: isSuccess,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const { headerLogo: headerImage, name: titleName, regNo, cinNo } = isSuccess && Object.values(adminDetails as AdminFormInputs)[0];

  const { resolutionId: resolutionIdFromUrl } = useParams();
  const resolutionId = resolutionIdFromProp || resolutionIdFromUrl;

  return formatChangeSuccess && isSuccess ? (
    <>
      {Object.values(resolutions as IResolutions)
        .filter((name) => name.id === resolutionId)
        .map((user) => (
          <S.ResolutionCertificateContainer ref={ref} key={user.id}>
            <S.ResolutionCertificateHeader>
              <S.NerkathirLogo src={headerImage ? headerImage : NerkathirLogo} alt="NerkathirLogoGray" />
              <S.HeaderText>
                {titleName ? (
                  <>
                    {titleName} உழவர் <br />
                    உற்பத்தியாளர் நிறுவனம்
                  </>
                ) : (
                  <>
                    நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
                  </>
                )}
              </S.HeaderText>
              <S.HeaderSubText>
                {regNo ? `REG No:${regNo}` : "REG No:139086"}
                <br />
                {cinNo ? `CIN :${cinNo}` : "CIN:UO1409TN2020PTC139086"}
              </S.HeaderSubText>
            </S.ResolutionCertificateHeader>
            <S.DateContainer>
              <S.FlexLine2>
                <S.FlexLine>
                  <S.DateText>குழு : </S.DateText>
                  <S.DateText2>{user.groupName}</S.DateText2>
                </S.FlexLine>
                <S.FlexLine>
                  <S.DateText>நாள் : </S.DateText>
                  <S.DateText2>{user.timestamp}</S.DateText2>
                </S.FlexLine>
              </S.FlexLine2>
              <S.FlexLine>
                <S.DateText>தீர்மானம் தலைப்பு : </S.DateText>
                <S.DateText2>{user.groupTitle}</S.DateText2>
              </S.FlexLine>
              <S.FlexLine>
                <S.DateText>தீர்மானம் : </S.DateText>
                <S.DateText2></S.DateText2>
              </S.FlexLine>
            </S.DateContainer>
            <S.CertificateContent
              dangerouslySetInnerHTML={{ __html: user.groupDescriptionRichText ? user.groupDescriptionRichText : user.groupDescription }}
            />

            <S.SignatureContainer>
              <S.SignatureContainerContent>
                <S.DateText>தொகுப்பாளர் :</S.DateText>
                {user.presenter.map((item1) => (
                  <S.DateText2 key={item1}>{item1}</S.DateText2>
                ))}
              </S.SignatureContainerContent>
              <S.SignatureContainerContent>
                <S.DateText>பங்கேற்பாளர்கள் :</S.DateText>
                {user.participator.map((item1) => (
                  <S.DateText2 key={item1}>{item1}</S.DateText2>
                ))}
              </S.SignatureContainerContent>
            </S.SignatureContainer>
          </S.ResolutionCertificateContainer>
        ))}
    </>
  ) : (
    <Loader />
  );
});

export default ResolutionPdf;
