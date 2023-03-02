import { FC } from "react";
import { S } from "./share-certificate.styled";
import NerkathirLogo from "../../assets/images/logo.svg";
import { AdminFormInputs } from "../admin-panel";
import { useFetch } from "../../utils/hooks/query";
import { decryptText, ENDPOINTS } from "../../utils/constants";
import { farmerDetail } from "../../utils/context/farmersDetails";

interface Props {
  user: farmerDetail;
  shareAmount?: number | string;
}

const ShareCertificateContent: FC<Props> = ({ user, shareAmount }) => {
  //constant
  const {
    formatChangeSuccess: isSuccessAdmin,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);
  const { certificateLogo: certificateImage, name: titleName, cinNo, address } = isSuccessAdmin && Object.values(adminDetails as AdminFormInputs)[0];

  return (
    <S.ShareCertificateContent key={user.id}>
      <S.CertificateMainContent>
        <S.CertificateHeader>
          <S.HeaderLogo>
            <S.CustomLogo src={certificateImage ? decryptText(certificateImage) : NerkathirLogo} alt="nerkathir logo" />
          </S.HeaderLogo>
          <S.HeaderContent>
            <S.FormNo>Form No.SH1</S.FormNo>
            <S.HeaderMainText>
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
            </S.HeaderMainText>
            <S.HeaderSubtext>(Incorporated Under Companies Act, 2013)</S.HeaderSubtext>
            <S.HeaderAddressText>
              {address ? (
                address
              ) : (
                <>
                  Serappattu Main Road, Lakkinayakkan Patti Village, <br />
                  Sankarapuram Taluk, Kallakurichi Dt, TN - 606402
                </>
              )}
            </S.HeaderAddressText>
            <S.HeaderMainText>{cinNo ? `CIN NO : ${cinNo}` : "CIN NO : UO1409TN2020PTC139086"}</S.HeaderMainText>
          </S.HeaderContent>
        </S.CertificateHeader>
        <S.CertificateTitle>SHARE CERTIFICATE</S.CertificateTitle>
        <S.Description>
          <S.DescriptionBold>THIS IS TO CERTIFY</S.DescriptionBold> that the person(s) named in this certificate is/are the Registered Holder(s) of
          the mentioned share(s) bearing the distinctive numbers(s) here in specified in the above named Company subject to the Memorandum and
          Articles of Association of the Company and the amount endorsed here in have / has been paid on each such share.
        </S.Description>
        <S.ShareValue>
          <S.ShareRow>
            <S.ShareText>FACE</S.ShareText>
            <S.ShareText>VALUE PER</S.ShareText>
            <S.ShareText>EQUITY</S.ShareText>
            <S.ShareText>SHARE :</S.ShareText>
            <S.ShareText>Rs. {shareAmount} EACH</S.ShareText>
          </S.ShareRow>
          <S.ShareRow>
            <S.ShareText>PAID -UP</S.ShareText>
            <S.ShareText>VALUE PER</S.ShareText>
            <S.ShareText>EQUITY</S.ShareText>
            <S.ShareText>SHARE :</S.ShareText>
            <S.ShareText>Rs. {shareAmount} EACH</S.ShareText>
          </S.ShareRow>
        </S.ShareValue>
        <S.ShareValue>
          <S.ShareHolderInfoRow>
            <S.CertificateDetailWrapper>
              <S.ShareInfoText>Register Folio No</S.ShareInfoText>
              <S.Detail>{user.membershipId}</S.Detail>
            </S.CertificateDetailWrapper>
            <S.CertificateDetailWrapper>
              <S.ShareInfoTextRight>Certificate No</S.ShareInfoTextRight>
              <S.Detail>{user.membershipId}</S.Detail>
            </S.CertificateDetailWrapper>
          </S.ShareHolderInfoRow>
          <S.ShareHolderInfoRow>
            <S.CertificateDetailWrapper>
              <S.ShareInfoText>Name of the Holder</S.ShareInfoText>
              <S.Detail>{user.name}</S.Detail>
            </S.CertificateDetailWrapper>
          </S.ShareHolderInfoRow>
          <S.ShareHolderInfoRow>
            <S.CertificateDetailWrapper>
              <S.ShareInfoText>No. of shares held</S.ShareInfoText>
              <S.Detail></S.Detail>
            </S.CertificateDetailWrapper>
          </S.ShareHolderInfoRow>
          <S.ShareHolderInfoRow>
            <S.CertificateDetailWrapper>
              <S.ShareInfoText>Distinctive Number(s)</S.ShareInfoText>
              <S.Detail></S.Detail>
            </S.CertificateDetailWrapper>
          </S.ShareHolderInfoRow>
        </S.ShareValue>
        <S.CompanySeal>Given under the common seal of the company this _____/_____/_____</S.CompanySeal>
        <S.DirectorSign>DIRECTOR</S.DirectorSign>
        <S.DirectorSign2>DIRECTOR</S.DirectorSign2>
        <S.DirectorSign2>AUTHORIZED SIGNATORY</S.DirectorSign2>
        <S.CertificateNote>
          No transfer of the share(s) compromised in the certificate can be registered unless accompanied by this certificate.
        </S.CertificateNote>
      </S.CertificateMainContent>
      <S.DetachableLine />
      <S.CertificateDetachableContent>
        <S.DetachableHeaderContainer>
          <S.DetachableHeaderTitle>COUNTER FOIL</S.DetachableHeaderTitle>
          <S.DetachableHeaderText>
            {titleName ? <>{titleName} உழவர் உற்பத்தியாளர் நிறுவனம்</> : <>நெற்கதிர் உழவர் உற்பத்தியாளர் நிறுவனம்</>}
          </S.DetachableHeaderText>
        </S.DetachableHeaderContainer>
        <S.ShareHolderInfoRow>
          <S.CertificateDetailWrapper>
            <S.ShareInfoText>Register Folio No</S.ShareInfoText>
            <S.Detail>{user.membershipId}</S.Detail>
          </S.CertificateDetailWrapper>
          <S.CertificateDetailWrapper>
            <S.ShareInfoTextRight>Certificate No</S.ShareInfoTextRight>
            <S.Detail>{user.membershipId}</S.Detail>
          </S.CertificateDetailWrapper>
        </S.ShareHolderInfoRow>
        <S.ShareHolderInfoRow>
          <S.CertificateDetailWrapper>
            <S.ShareInfoText>Name of the Holder</S.ShareInfoText>
            <S.Detail>{user.name}</S.Detail>
          </S.CertificateDetailWrapper>
        </S.ShareHolderInfoRow>
        <S.ShareHolderInfoRow>
          <S.CertificateDetailWrapper>
            <S.ShareInfoText>No. of shares held</S.ShareInfoText>
            <S.Detail></S.Detail>
          </S.CertificateDetailWrapper>
        </S.ShareHolderInfoRow>
        <S.ShareHolderInfoRow>
          <S.CertificateDetailWrapper>
            <S.ShareInfoText>Distinctive Number(s)</S.ShareInfoText>
            <S.Detail></S.Detail>
          </S.CertificateDetailWrapper>
          <S.SignatureText>Shareholder Signature</S.SignatureText>
        </S.ShareHolderInfoRow>
      </S.CertificateDetachableContent>
    </S.ShareCertificateContent>
  );
};

export default ShareCertificateContent;
