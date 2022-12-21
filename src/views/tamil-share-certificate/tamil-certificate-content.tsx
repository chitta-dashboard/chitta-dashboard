import { FC } from "react";
import { useFetch } from "../../utils/hooks/query";
import { ENDPOINTS, decryptText } from "../../utils/constants";
import { AdminFormInputs } from "../admin-panel";
import { farmerDetail } from "../../utils/context/farmersDetails";
import { S } from "./tamil-certificate.styled";
import ShareHolderCertificateTopBorder from "../../assets/images/share-holder-certificate-top-border.svg";
import ShareHolderCertificateLeftBorder from "../../assets/images/share-holder-certificate-left-border.svg";
import ShareHolderCertificateBottomCornerIcon from "../../assets/images/share-holder-certificate-bottom-corner-icon.svg";
import ShareHolderCertificateTopCornerIcon from "../../assets/images/share-holder-certificate-top-corner-icon.svg";
import NerkathirLogoGray from "../../assets/images/nerkathir-logo-gray.svg";

interface Props {
  user: farmerDetail;
  shareAmount?: number | string;
  toggle?: boolean;
}

const TamilShareHolderCertificateContent: FC<Props> = ({ user, shareAmount, toggle }) => {
  const {
    formatChangeSuccess: isSuccessAdmin,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const { certificateLogo: certificateImage, name: titleName, regNo, cinNo } = isSuccessAdmin && Object.values(adminDetails as AdminFormInputs)[0];

  const newDate = new Date();

  return (
    <S.TamilShareCertificateContainer key={user.id} Toggle={toggle}>
      <S.CertificateTopBorderImg src={ShareHolderCertificateTopBorder} alt="ShareHolderCertificateTopBorder" />
      <S.CertificateBottomBorderImg src={ShareHolderCertificateTopBorder} alt="ShareHolderCertificateTopBorder" />
      <S.CertificateLeftBorderImg src={ShareHolderCertificateLeftBorder} alt="ShareHolderCertificateLeftBorder" />
      <S.CertificateRightBorderImg src={ShareHolderCertificateLeftBorder} alt="ShareHolderCertificateLeftBorder" />
      <S.TopLeftIcon src={ShareHolderCertificateTopCornerIcon} alt="corner-icon" />
      <S.TopRightIcon src={ShareHolderCertificateTopCornerIcon} alt="corner-icon" />
      <S.BottomLeftIcon src={ShareHolderCertificateBottomCornerIcon} alt="corner-icon" />
      <S.BottomRightIcon src={ShareHolderCertificateBottomCornerIcon} alt="corner-icon" />
      <S.CertificateHeadingMainContainer>
        <S.CertificateHeadingContainer>
          <S.HeadingContainerLogo>
            <S.NerkathirLogo src={certificateImage ? decryptText(certificateImage) : NerkathirLogoGray} alt="NerkathirLogoGray" />
          </S.HeadingContainerLogo>
          <S.HeadingContainerHeading>
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
          </S.HeadingContainerHeading>
          <S.HeadingContainerSignNo>
            <S.RegNoCin>{regNo ? `REG No : ${regNo}` : "REG No : 139086"}</S.RegNoCin>
            <S.RegNoCin>{cinNo ? `CIN : ${cinNo}` : "CIN : UO1409TN2020PTC139086"} </S.RegNoCin>
          </S.HeadingContainerSignNo>
        </S.CertificateHeadingContainer>
        <S.CertificateHeader>பங்குப்பத்திரம்</S.CertificateHeader>
      </S.CertificateHeadingMainContainer>

      <S.DateContainer>
        <S.ShareCountInnerContainer>
          <S.DateText>உறுப்பினர் எண் :</S.DateText>
          <S.DateBox>{user.membershipId}</S.DateBox>
        </S.ShareCountInnerContainer>
        <S.ShareCountInnerContainer>
          <S.DateText>நாள் : </S.DateText>
          <S.DateBox>
            {newDate.getDate()}/{newDate.getMonth() + 1}/{newDate.getFullYear()}
          </S.DateBox>
        </S.ShareCountInnerContainer>
      </S.DateContainer>
      <S.CertificateContent>
        <S.CertificateTextLine>
          <S.CertificateText>இந்தப்பங்குப் பத்திரமானது</S.CertificateText>
          <S.BlankSpace1>{user.name}</S.BlankSpace1>
          <S.CertificateText>த/க</S.CertificateText>
          <S.BlankSpace2>{user.fatherName}</S.BlankSpace2>
        </S.CertificateTextLine>
        <S.CertificateTextLine>
          <S.BlankSpace3>
            {user.address}, {user.village}, {user.district}, {user.postalNo}
          </S.BlankSpace3>
          <S.CertificateText>என்பவருக்கு</S.CertificateText>
        </S.CertificateTextLine>
        <S.CertificateTextLine>
          <S.CertificateText2>
            {titleName} &nbsp; உழவர் &nbsp; உற்பத்தியாளர் &nbsp; நிறுவனத்தால் &nbsp; கம்பெனியின் &nbsp; சட்டத்திட்டங்களுக்கு &nbsp; உட்பட்டு
            {!toggle && <span> &nbsp; வழங்கப்படுகிறது.</span>}
          </S.CertificateText2>
        </S.CertificateTextLine>
        {toggle && (
          <S.CertificateTextLine>
            <S.CertificateText2>வழங்கப்படுகிறது.</S.CertificateText2>
          </S.CertificateTextLine>
        )}
      </S.CertificateContent>
      <S.ShareCountContainer>
        <S.ShareCountInnerContainer>
          <S.CertificateText>ஒரு பங்கின் விலை :</S.CertificateText>
          <S.ShareCount>ரூ.10/-</S.ShareCount>
        </S.ShareCountInnerContainer>
        <S.ShareCountInnerContainer>
          <S.CertificateText>பங்குகளின் எண்ணிக்கை :</S.CertificateText>
          <S.ShareCount>100</S.ShareCount>
        </S.ShareCountInnerContainer>
        <S.ShareCountInnerContainer>
          <S.CertificateText>மொத்த பங்குத்தொகை :</S.CertificateText>
          <S.ShareCount>ரூ.{shareAmount}/-</S.ShareCount>
        </S.ShareCountInnerContainer>
      </S.ShareCountContainer>
      <S.SignatureLine>
        <S.CertificateText>நிறுவன முத்திரை </S.CertificateText>
        <S.CertificateText>நிர்வாக அதிகாரி </S.CertificateText>
        <S.CertificateText>இயக்குநர் -1 </S.CertificateText>
        <S.CertificateText>இயக்குநர்-2</S.CertificateText>
      </S.SignatureLine>
    </S.TamilShareCertificateContainer>
  );
};

export default TamilShareHolderCertificateContent;
