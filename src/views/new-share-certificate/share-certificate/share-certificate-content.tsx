import { FC } from "react";
import { S } from "./share-certificate.styled";
import NerkathirLogo from "../../../assets/images/logo.svg";
import { AdminFormInputs } from "../../admin-panel";
import { useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS, TICKETS_HELD } from "../../../utils/constants";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { getFourDigitNumber, getSlot } from "../../../utils/helpers";

interface Props {
  user: farmerDetail;
  shareAmount?: number | string;
}

const ShareCertificateContent: FC<Props> = ({ user, shareAmount }) => {
  //state values
  const {
    formatChangeSuccess: isSuccessAdmin,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);
  const { certificateLogo: certificateImage, name: titleName, cinNo, address } = isSuccessAdmin && Object.values(adminDetails as AdminFormInputs)[0];
  const fourDigitMemberId = getFourDigitNumber(getMemberIdAlone(user.membershipId));

  //functions
  function getMemberIdAlone(oldMemberId: string) {
    const id = oldMemberId.split("-");
    return id[2];
  }

  return (
    <S.ShareCertificateContent key={user.id}>
      <S.CertificateMainContent>
        <S.CertificateHeader>
          <S.HeaderLogo>
            <S.CustomLogo src={certificateImage ? certificateImage : NerkathirLogo} alt="nerkathir logo" />
          </S.HeaderLogo>
          <S.HeaderContent>
            <S.FormNo>Form No.SH1</S.FormNo>
            <S.HeaderMainText>
              {titleName ? (
                <>
                  {titleName} FARMER PRODUCER COMPANY <br />
                  LIMITED
                </>
              ) : (
                <>
                  NERKATHIR FARMER PRODUCER COMPANY <br /> LIMITED
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
            <S.ShareText>VALUE &nbsp;PER</S.ShareText>
            <S.ShareText>EQUITY</S.ShareText>
            <S.ShareText>SHARE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</S.ShareText>
            <S.ShareText>Rs. {shareAmount} EACH</S.ShareText>
          </S.ShareRow>
          <S.ShareRow>
            <S.ShareText>PAID - UP</S.ShareText>
            <S.ShareText>VALUE &nbsp;PER</S.ShareText>
            <S.ShareText>EQUITY</S.ShareText>
            <S.ShareText>SHARE &nbsp;:</S.ShareText>
            <S.ShareText>Rs. {shareAmount} EACH</S.ShareText>
          </S.ShareRow>
        </S.ShareValue>
        <S.ShareValue>
          <S.ShareHolderInfoRow>
            <S.CertificateDetailWrapper>
              <S.ShareInfoText sx={{ paddingLeft: "0.3125rem" }}>Register Folio No</S.ShareInfoText>
              <S.Detail>{fourDigitMemberId}</S.Detail>
            </S.CertificateDetailWrapper>
            <S.CertificateDetailWrapper>
              <S.ShareInfoTextRight>Certificate No</S.ShareInfoTextRight>
              <S.Detail sx={{ paddingRight: "0.3125rem" }}>{`NER-FPC-${fourDigitMemberId}`}</S.Detail>
            </S.CertificateDetailWrapper>
          </S.ShareHolderInfoRow>
          <S.ShareHolderInfoRow>
            <S.CertificateDetailWrapper>
              <S.ShareInfoText sx={{ paddingLeft: "0.3125rem" }}>Name of the Holder</S.ShareInfoText>
              <S.Detail>{user.name}</S.Detail>
            </S.CertificateDetailWrapper>
          </S.ShareHolderInfoRow>
          <S.ShareHolderInfoRow>
            <S.CertificateDetailWrapper>
              <S.ShareInfoText sx={{ paddingLeft: "0.3125rem" }}>No. of shares held</S.ShareInfoText>
              <S.Detail>{TICKETS_HELD}</S.Detail>
            </S.CertificateDetailWrapper>
          </S.ShareHolderInfoRow>
          <S.ShareHolderInfoRow>
            <S.CertificateDetailWrapper>
              <S.ShareInfoText sx={{ paddingLeft: "0.3125rem" }}>Distinctive Number(s)</S.ShareInfoText>
              <S.Detail>{getSlot(+getMemberIdAlone(user.membershipId))}</S.Detail>
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
            {titleName ? <>{titleName} FARMER PRODUCER COMPANY LIMITED</> : <>NERKATHIR FARMER PRODUCER COMPANY LIMITED</>}
          </S.DetachableHeaderText>
        </S.DetachableHeaderContainer>
        <S.ShareHolderInfoRow>
          <S.CertificateDetailWrapper>
            <S.ShareInfoText>Register Folio No</S.ShareInfoText>
            <S.Detail>{fourDigitMemberId}</S.Detail>
          </S.CertificateDetailWrapper>
          <S.CertificateDetailWrapper>
            <S.ShareInfoTextRight>Certificate No</S.ShareInfoTextRight>
            <S.Detail>{`NER-FPC-${fourDigitMemberId}`}</S.Detail>
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
            <S.Detail>{TICKETS_HELD}</S.Detail>
          </S.CertificateDetailWrapper>
        </S.ShareHolderInfoRow>
        <S.ShareHolderInfoRow>
          <S.CertificateDetailWrapper>
            <S.ShareInfoText>Distinctive Number(s)</S.ShareInfoText>
            <S.Detail>{getSlot(+getMemberIdAlone(user.membershipId))}</S.Detail>
          </S.CertificateDetailWrapper>
          <S.SignatureText>Shareholder Signature</S.SignatureText>
        </S.ShareHolderInfoRow>
      </S.CertificateDetachableContent>
    </S.ShareCertificateContent>
  );
};

export default ShareCertificateContent;
