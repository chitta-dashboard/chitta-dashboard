import S from "./background.style";
import EllipseBottom from "../../../assets/images/EllipseBottom.svg";
import farmer from "../../../assets/images/farmer.svg";

const LoginBackground = () => {
  return (
    <S.ImageContainer>
      <S.TopImageBox>
        <S.TopImage></S.TopImage>
      </S.TopImageBox>

      <S.HeadingText variant="h2">
        நெற்கதிர் உழவர் <br />
        உற்பத்தியாளர் நிறுவனம்
      </S.HeadingText>

      <S.FarmerImageBox>
        <S.FarmerImage alt="farmerImage" src={farmer} />
      </S.FarmerImageBox>
      <S.RegTextBox>
        <S.RegText variant="h6">REG No:139086</S.RegText>
        <S.RegText variant="h6">CIN:UO1409TN2020PTC139086</S.RegText>
      </S.RegTextBox>
      <S.BottomImageBox>
        <S.BottomImage alt="BottomImage" src={EllipseBottom} />
      </S.BottomImageBox>
    </S.ImageContainer>
  );
};

export default LoginBackground;
