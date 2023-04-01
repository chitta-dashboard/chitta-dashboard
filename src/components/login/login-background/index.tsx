import EllipseBottom from "../../../assets/images/EllipseBottom.svg";
import farmer from "../../../assets/images/farmer.svg";
import { useFetch } from "../../../utils/hooks/query";
import { AdminFormInputs } from "../../../views/admin-panel";
import { ENDPOINTS } from "../../../utils/constants";
import S from "./background.style";

const LoginBackground = () => {
  //constants
  const {
    formatChangeSuccess: isSuccess,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const { name, regNo, cinNo } =
    isSuccess && adminDetails ? Object.values(adminDetails as AdminFormInputs)[0] : { name: null, regNo: null, cinNo: null };

  return (
    <>
      <S.ImageContainer>
        <S.TopImageBox>
          <S.TopImage></S.TopImage>
        </S.TopImageBox>

        <S.HeadingText variant="h2">
          {name ? (
            <>
              {name} உழவர் <br />
              உற்பத்தியாளர் நிறுவனம்
            </>
          ) : (
            <>
              நெற்கதிர் உழவர் <br />
              உற்பத்தியாளர் நிறுவனம்
            </>
          )}
        </S.HeadingText>

        <S.FarmerImageBox>
          <S.FarmerImage alt="farmerImage" src={farmer} />
        </S.FarmerImageBox>
        <S.RegTextBox>
          {regNo ? <S.RegText variant="h6">REG No: {regNo}</S.RegText> : <S.RegText variant="h6">REG No:139086</S.RegText>}
          {cinNo ? <S.RegText variant="h6">CIN: {cinNo} </S.RegText> : <S.RegText variant="h6">CIN:UO1409TN2020PTC139086</S.RegText>}
        </S.RegTextBox>
        <S.BottomImageBox>
          <S.BottomImage alt="BottomImage" src={EllipseBottom} />
        </S.BottomImageBox>
      </S.ImageContainer>
    </>
  );
};

export default LoginBackground;
