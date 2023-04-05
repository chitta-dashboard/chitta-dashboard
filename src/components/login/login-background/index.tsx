import EllipseBottom from "../../../assets/images/EllipseBottom.svg";
import farmerImage from "../../../assets/images/farmer.svg";
import { useFetch } from "../../../utils/hooks/query";
import { AdminFormInputs } from "../../../views/admin-panel";
import { ENDPOINTS } from "../../../utils/constants";
import S from "./background.style";

const LoginBackground = () => {
  //constants
  const {
    formatChangeSuccess: isAdminSuccess,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const { name, regNo, cinNo } = isAdminSuccess && Object.values(adminDetails as AdminFormInputs)[0];

  return (
    <>
      {isAdminSuccess && (
        <S.LoginDetailsWrapper>
          <S.OverlayTopImageContainer>
            <S.OverlayTopImage></S.OverlayTopImage>
          </S.OverlayTopImageContainer>

          <S.FarmerHeadingText variant="h2">
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
          </S.FarmerHeadingText>

          <S.FarmerImageContainer>
            <S.FarmerImage alt="farmerImage" src={farmerImage} />
          </S.FarmerImageContainer>
          <S.RegisterNoContainer>
            {regNo ? (
              <S.RegisterNoText variant="h6">REG No: {regNo}</S.RegisterNoText>
            ) : (
              <S.RegisterNoText variant="h6">REG No:139086</S.RegisterNoText>
            )}
            {cinNo ? (
              <S.RegisterNoText variant="h6">CIN: {cinNo} </S.RegisterNoText>
            ) : (
              <S.RegisterNoText variant="h6">CIN:UO1409TN2020PTC139086</S.RegisterNoText>
            )}
          </S.RegisterNoContainer>
          <S.OverlayBottomImageContainer>
            <S.OverlayBottomImage alt="OverlayBottomImage" src={EllipseBottom} />
          </S.OverlayBottomImageContainer>
        </S.LoginDetailsWrapper>
      )}
    </>
  );
};

export default LoginBackground;
