import S from "./idCardHeader.styled";
import IdLogo from "../../../assets/images/logo.svg";

const IDCardHeader = () => {
  return (
    <S.IdHeaderWrapper>
      <S.LogoImage src={IdLogo} alt="Id-logo" />
      <S.HeaderRight>
        <S.IdHeading>
          நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
        </S.IdHeading>
        <S.IdSubHeading>139086</S.IdSubHeading>
        <S.IdSubHeading>CIN:UO1409TN2020PTC139086</S.IdSubHeading>
      </S.HeaderRight>
    </S.IdHeaderWrapper>
  );
};

export default IDCardHeader;
