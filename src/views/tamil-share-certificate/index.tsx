import { forwardRef } from "react";
import { useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { S } from "./tamil-certificate.styled";
import ShareHolderCertificateTopBorder from "../../assets/images/share-holder-certificate-top-border.svg";
import ShareHolderCertificateLeftBorder from "../../assets/images/share-holder-certificate-left-border.svg";
import ShareHolderCertificateBottomCornerIcon from "../../assets/images/share-holder-certificate-bottom-corner-icon.svg";
import ShareHolderCertificateTopCornerIcon from "../../assets/images/share-holder-certificate-top-corner-icon.svg";
import NerkathirLogoGray from "../../assets/images/nerkathir-logo-gray.svg";

interface Props {
  shareAmount?: number | string;
}

const TamilShareHolderCertificate = forwardRef<HTMLDivElement, Props>(({ shareAmount }, ref) => {
  const { farmersDetailsById, selectedFarmers } = useFarmerDetailsContext();
  const newDate = new Date();
  return (
    <div className="print-container" ref={ref}>
      {Object.values(farmersDetailsById)
        .filter((name) => selectedFarmers.includes(name.id))
        .map((user) => (
          <S.TamilShareCertificateContainer key={user.id}>
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
                <S.DateBox>{user.id}</S.DateBox>
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
                <S.BlankSpace2>
                  {" "}
                  {user.fatherName} &nbsp;&nbsp;{user.address.split(" ").splice(0, 3).join(" ")}
                </S.BlankSpace2>
              </S.CertificateTextLine>
              <S.CertificateTextLine>
                <S.BlankSpace3>{user.address.split(" ").splice(3).join(" ")}</S.BlankSpace3>
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
        ))}
    </div>
  );
});

export default TamilShareHolderCertificate;
