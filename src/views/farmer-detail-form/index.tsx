import React, { FC, useRef } from "react";
import { S } from "./farmer-detail-form.styled";
import NerkathirLogo from "../../assets/images/logo.svg";
import NerkathirUser from "../../assets/images/nerkathir-user.svg";
import { REAL_DATA } from "./constant";
import IconWrapper from "../../utils/iconWrapper";
import { useReactToPrint } from "react-to-print";
import ShareHolderCertificate from "../share-holder-certificate";

const FarmersDetails: FC = () => {
  const pdfpage = useRef<any>();
  const pdfcertificate = useRef<any>();

  const generateFarmerDetailsPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdfpage.current,
  });

  const generateCertificatePDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdfcertificate.current,
  });

  return (
    <S.FarmersDetailsMainContainer>
      <S.FarmersDetailsButtonContainer>
        <IconWrapper>back</IconWrapper>
        <S.ButtonAlignmentBox>
          <S.Button>Delete</S.Button>
          <S.Button
            onClick={() => {
              generateFarmerDetailsPDF();
            }}
          >
            Download
          </S.Button>
          <S.Button>Edit</S.Button>
          <S.Button
            onClick={() => {
              generateCertificatePDF();
            }}
          >
            Certificate
          </S.Button>
        </S.ButtonAlignmentBox>
      </S.FarmersDetailsButtonContainer>

      <div style={{ display: "none" }}>
        <ShareHolderCertificate ref={pdfcertificate} />
      </div>

      <S.FarmersDetailsContent ref={pdfpage}>
        <S.FarmersDetailsHeader>
          <S.NerkathirLogo src={NerkathirLogo} alt="nerkathir-logo" />
          <S.HeaderTextContainer>
            <S.HeaderText1>
              நெற்கதிர் உழவர் <br />
              உற்பத்தியாளர் நிறுவனம்
            </S.HeaderText1>
            <S.HeaderText2>
              நபார்டு <br />
              கள்ளக்குறிச்சி மாவட்டம்
              <br />
              உறுப்பினர் விண்ணப்பம்
            </S.HeaderText2>
          </S.HeaderTextContainer>
          <S.UserImgContainer>
            <img src={NerkathirUser} alt="nerkathir-user" />
          </S.UserImgContainer>
        </S.FarmersDetailsHeader>
        <S.HeaderTextBox>
          ஒருங்கிணைப்பாளர்: நேச்சர் ஃபார்ம் & ரூரல் டெவல்மென்ட் சொசைட்டிஎண், 453,பவர் ஆபீஸ் மெயின் ரோடு, சடையம்பட்டு,சோமண்டார்குடி
          அஞ்சல்,கள்ளக்குறிச்சி தாலுக்கா&மாவட்டம், 606213
        </S.HeaderTextBox>
        <S.HeaderDateBox>
          <S.HeaderDateText>உறுப்பினர் எண் : NER-FPC-2</S.HeaderDateText>
          <S.HeaderDateText>நாள்: 22/08/22</S.HeaderDateText>
        </S.HeaderDateBox>
        <S.UserInfoContainer>
          {/* {FARMERS_DETAILS_DATA.map((data) => (
            <S.UserInfoRow key={data.id}>
              <S.UserInfoData1>{data.label}</S.UserInfoData1>
              <S.UserInfoData2>{data.content}</S.UserInfoData2>
            </S.UserInfoRow>
          ))} */}
          {Object.entries(REAL_DATA[0]).map((data, i) => {
            return (
              <S.UserInfoRow key={data[0]}>
                <S.UserInfoData1>{data[0]}</S.UserInfoData1>
                <S.UserInfoData2>{data[1]}</S.UserInfoData2>
              </S.UserInfoRow>
            );
          })}
        </S.UserInfoContainer>
      </S.FarmersDetailsContent>
    </S.FarmersDetailsMainContainer>
  );
};

export default FarmersDetails;
