import { forwardRef } from "react";

import NerkathirLogoGray from "../../assets/images/nerkathir-logo-gray.svg";
import ShareHolderCertificateTopBorder from "../../assets/images/share-holder-certificate-top-border.svg";
import ShareHolderCertificateLeftBorder from "../../assets/images/share-holder-certificate-left-border.svg";
import ShareHolderCertificateBottomCornerIcon from "../../assets/images/share-holder-certificate-bottom-corner-icon.svg";
import ShareHolderCertificateTopCornerIcon from "../../assets/images/share-holder-certificate-top-corner-icon.svg";
import { S } from "./tamil-certificate.styled";

interface Props {}

const TamilShareHolderCertificate = forwardRef<HTMLDivElement>((props: Props, ref) => (
  <div className="print-container" ref={ref}>
    {[1].map((item) => {
      return (
        <S.TamilShareCertificateContainer key={item}>
          <S.CertificateTopBorderImg src={ShareHolderCertificateTopBorder} alt="ShareHolderCertificateTopBorder" />
          <S.CertificateBottomBorderImg src={ShareHolderCertificateTopBorder} alt="ShareHolderCertificateTopBorder" />
          <S.CertificateLeftBorderImg src={ShareHolderCertificateLeftBorder} alt="ShareHolderCertificateLeftBorder" />
          <S.CertificateRightBorderImg src={ShareHolderCertificateLeftBorder} alt="ShareHolderCertificateLeftBorder" />
          <S.TopLeftIcon src={ShareHolderCertificateTopCornerIcon} alt="corner-icon" />
          <S.TopRightIcon src={ShareHolderCertificateTopCornerIcon} alt="corner-icon" />
          <S.BottomLeftIcon src={ShareHolderCertificateBottomCornerIcon} alt="corner-icon" />
          <S.BottomRightIcon src={ShareHolderCertificateBottomCornerIcon} alt="corner-icon" />
          <S.CertificateHeadingContainer>
            <S.HeadingContainerLogo>
              <S.NerkathirLogo src={NerkathirLogoGray} alt="NerkathirLogoGray" />
            </S.HeadingContainerLogo>
            <S.HeadingContainerHeading>
              நெற்கதிர் உழவர் <br />
              உற்பத்தியாளர் நிறுவனம்
            </S.HeadingContainerHeading>
            <S.HeadingContainerSignNo>
              <S.RegNoCin>REG No:139086 </S.RegNoCin>
              <S.RegNoCin>CIN:UO1409TN2020PTC139086 </S.RegNoCin>
            </S.HeadingContainerSignNo>
          </S.CertificateHeadingContainer>
          <S.CertificateHeader>பங்குப்பத்திரம்</S.CertificateHeader>
          <S.DateContainer>
            <S.ShareCountInnerContainer>
              <S.DateText>உறுப்பினர் எண் :</S.DateText>
              <S.DateBox></S.DateBox>
            </S.ShareCountInnerContainer>
            <S.ShareCountInnerContainer>
              <S.DateText>நாள் : </S.DateText>
              <S.DateBox></S.DateBox>
            </S.ShareCountInnerContainer>
          </S.DateContainer>
          <S.CertificateContent>
            <S.CertificateTextLine>
              <S.CertificateText>இந்தப்பங்குப் பத்திரமானது</S.CertificateText>
              <S.BlankSpace1>ஆரோக்கியராஜ்.அ</S.BlankSpace1>
              <S.CertificateText>த/க</S.CertificateText>
              <S.BlankSpace2> அந்தோணி, &nbsp;&nbsp;அன்னை தெரசா தெரு,</S.BlankSpace2>
            </S.CertificateTextLine>
            <S.CertificateTextLine>
              <S.BlankSpace3>விரியூர் அஞ்சல், சங்கராபுரம் வட்டம், கள்ளக்குறிச்சி மாவட்டம் – 606402</S.BlankSpace3>
              <S.CertificateText>என்பவருக்கு</S.CertificateText>
            </S.CertificateTextLine>
            <S.CertificateTextLine>
              <S.CertificateText2>
                நெற்கதிர் &nbsp; உழவர் &nbsp; உற்பத்தியாளர் &nbsp;&nbsp; நிறுவனத்தால் &nbsp; கம்பெனியின் &nbsp; சட்டத்திட்டங்களுக்கு &nbsp; உட்பட்டு
                வழங்கப்படுகிறது.
              </S.CertificateText2>
            </S.CertificateTextLine>
          </S.CertificateContent>
          <S.ShareCountContainer>
            <S.ShareCountInnerContainer>
              <S.CertificateText>பங்குகளின் எண்ணிக்கை</S.CertificateText>
              <S.ShareCount>1</S.ShareCount>
            </S.ShareCountInnerContainer>
            <S.ShareCountInnerContainer>
              <S.CertificateText>பங்குத்தொகை</S.CertificateText>
              <S.ShareCount>ரூ.1000/-</S.ShareCount>
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
    })}
  </div>
));

export default TamilShareHolderCertificate;
