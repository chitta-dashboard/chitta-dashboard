import { forwardRef } from "react";

import NerkathirLogo from "../../assets/images/logo.svg";

import { S } from "./decision-certificate.styled";

interface Props {}

const DecisionPdf = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const newDate = new Date();

  return (
    <S.DecisionCertificateContainer ref={ref}>
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
            <S.DateText2>விவசாயிகள் சங்கம்</S.DateText2>
          </S.FlexLine>
          <S.DateText>
            நாள் : {newDate.getDate()}/{newDate.getMonth() + 1}/{newDate.getFullYear()}
          </S.DateText>
        </S.FlexLine2>
        <S.FlexLine>
          <S.DateText>தீர்மானம் தலைப்பு : </S.DateText>
          <S.DateText2>CERTIFIED TRUE COPY OF THE RESOLUTION PASSED</S.DateText2>
        </S.FlexLine>
        <S.FlexLine>
          <S.DateText>தீர்மானம் : </S.DateText>
          <S.DateText2></S.DateText2>
        </S.FlexLine>
      </S.DateContainer>
      <S.CertificateContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt accumsan ligula ac mollis. Aenean cursus, leo id consectetur
        sollicitudin, tellus sapien gravida elit, a pretium nisi eros sed sapien. Vestibulum dictum posuere cursus. Integer tincidunt placerat tellus.
        Fusce pharetra dolor vel risus lacinia tincidunt. Ut cursus, est vitae tristique condimentum, dolor eros luctus diam, eget auctor augue orci
        vehicula libero. Nulla pulvinar blandit massa ullamcorper lacinia. Integer nunc tellus, molestie vel cursus eu, pretium vel massa. Suspendisse
        quis volutpat dolor. Quisque purus tellus, eleifend at porttitor eget, porttitor vitae quam. Proin laoreet fringilla turpis, in ullamcorper
        tortor porttitor sit amet. Integer et ante luctus, semper felis in, tempor lacus. Donec nec posuere libero. Donec sagittis, nulla vel ultrices
        congue, leo sapien viverra lorem, iaculis lobortis dolor augue non augue.
        <br />
        <br />
        Vivamus sed convallis tellus, quis fringilla nisi. Mauris sit amet fermentum lectus. Quisque semper convallis augue sed tincidunt. Maecenas
        mollis est eu arcu laoreet dictum. Phasellus at est finibus, interdum felis nec, elementum nibh. Morbi purus mauris, porttitor ac diam ut,
        ultrices convallis elit. In eros velit, posuere ac fermentum a, venenatis non tortor. Vestibulum nec interdum lorem. Praesent gravida porta
        semper. Morbi pretium semper.
        <br />
        <br />
        ipsum, ut rhoncus ligula pellentesque non. In hac habitasse platea dictumst. Sed laoreet dictum libero, ac sagittis purus tincidunt sed. Duis
        non mi rhoncus, imperdiet urna id, suscipit elit. Mauris vulputate finibus interdum. Cras magna neque, fringilla ac nisl in, dapibus aliquet
        nisi. Pellentesque eu orci turpis. Maecenas quam nibh, consectetur a condimentum vel, imperdiet sed sem. Nam eget consectetur purus. Sed in
        arcu quis purus mollis condimentum eget vel elit. Duis eu facilisis lacus. Maecenas et ullamcorper est, non hendrerit erat. Praesent aliquet
        tristique laoreet. Pellentesque vel metus eget nibh efficitur tincidunt.
      </S.CertificateContent>
      <S.SignatureContainer>
        <S.SignatureContainerContent>
          <S.DateText>தொகுப்பாளர் :</S.DateText>
          <S.DateText2>Arockiadoss</S.DateText2>
          <S.DateText2>Arockiadoss</S.DateText2>
          <S.DateText2>Arockiadoss</S.DateText2>
          <S.DateText2>Arockiadoss</S.DateText2>
        </S.SignatureContainerContent>
        <S.SignatureContainerContent>
          <S.DateText>பங்கேற்பாளர்கள் :</S.DateText>
          <S.DateText2>Arockiadoss</S.DateText2>
          <S.DateText2>Arockiadoss</S.DateText2>
          <S.DateText2>Arockiadoss</S.DateText2>
          <S.DateText2>Arockiadoss</S.DateText2>
        </S.SignatureContainerContent>
      </S.SignatureContainer>
    </S.DecisionCertificateContainer>
  );
});

export default DecisionPdf;
