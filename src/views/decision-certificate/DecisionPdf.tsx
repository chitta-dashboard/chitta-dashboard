import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import { useResolutionsProviderContext } from "../../utils/context/resolutions";
import { S } from "./decision-certificate.styled";
import NerkathirLogo from "../../assets/images/logo.svg";

interface Props {
  decisionId?: string;
}

const DecisionPdf = forwardRef<HTMLDivElement, Props>(({ decisionId }, ref) => {
  const { resolutions } = useResolutionsProviderContext();
  const { resolutionId } = useParams();

  return (
    <>
      {Object.values(resolutions)
        .filter((name) => [resolutionId, decisionId].includes(name.id))
        .map((user) => (
          <S.DecisionCertificateContainer ref={ref} key={user.id}>
            <S.DecisionCertificateHeader>
              <S.NerkathirLogo src={NerkathirLogo} alt="NerkathirLogoGray" />
              <S.HeaderText>
                நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
              </S.HeaderText>
              <S.HeaderSubText>
                REG No:139086 <br />
                CIN:UO1409TN2020PTC139086
              </S.HeaderSubText>
            </S.DecisionCertificateHeader>
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
          </S.DecisionCertificateContainer>
        ))}
    </>
  );
});

export default DecisionPdf;
