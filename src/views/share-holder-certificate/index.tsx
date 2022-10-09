import { forwardRef } from "react";
import { S } from "./certificate.styled";
import ShareHolderCertificateTopBorder from "../../assets/images/share-holder-certificate-top-border.svg";
import ShareHolderCertificateLeftBorder from "../../assets/images/share-holder-certificate-left-border.svg";
import ShareHolderCertificateBottomCornerIcon from "../../assets/images/share-holder-certificate-bottom-corner-icon.svg";
import ShareHolderCertificateTopCornerIcon from "../../assets/images/share-holder-certificate-top-corner-icon.svg";
import NerkathirLogoGray from "../../assets/images/nerkathir-logo-gray.svg";

const ShareHolderCertificate = forwardRef<HTMLDivElement>((props, ref) => (
  <div className="print-container" ref={ref}>
    {[1].map((item) => {
      return (
        <S.ShareHolderCertificateContainer className="page-break" key={item}>
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
          <S.ShareCertificateHeading>Share Certificate</S.ShareCertificateHeading>
          <S.CertificateContent>
            <S.CertificateTextLine>
              <S.CertificateText>Certificate No.</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
              <S.CertificateText>No. of shares</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
              <S.CertificateText>Folio No.</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
            </S.CertificateTextLine>
            <S.CertificateTextLine>
              <S.CertificateText>No. of shares</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
              <S.CertificateText>from</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
              <S.CertificateText>to</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
              <S.CertificateText>both inclusive</S.CertificateText>
            </S.CertificateTextLine>
            <S.CertificateTextLine>
              <S.CertificateText>Name</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
              <S.CertificateText>Father’s/Husband Name</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
              <S.CertificateText>Occupation</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
            </S.CertificateTextLine>
            <S.CertificateTextLine>
              <S.CertificateText>Address</S.CertificateText>
              <S.BlankSpace2></S.BlankSpace2>
            </S.CertificateTextLine>
            <S.CertificateTextLine>
              <S.BlankSpace3></S.BlankSpace3>
            </S.CertificateTextLine>
            <S.CertificateTextLine>
              <S.CertificateText>Given under the common seal of the company at </S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>

              <S.CertificateText>this the</S.CertificateText>
              <S.BlankSpace1></S.BlankSpace1>
            </S.CertificateTextLine>
            <S.CertificateTextLine>
              <S.CertificateText>day of</S.CertificateText>
              <S.BlankSpace4></S.BlankSpace4>
            </S.CertificateTextLine>
            <br />
            <S.SignatureTextLine>
              <S.CertificateText>Authorised Signatory</S.CertificateText>
              <S.CertificateText>Director</S.CertificateText>
              <S.CertificateText>Managing Director</S.CertificateText>
            </S.SignatureTextLine>
          </S.CertificateContent>
        </S.ShareHolderCertificateContainer>
      );
    })}
  </div>
));

export default ShareHolderCertificate;
