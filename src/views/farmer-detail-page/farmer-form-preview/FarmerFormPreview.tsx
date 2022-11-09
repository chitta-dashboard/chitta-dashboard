import FarmerFormPreviewLeft from "./FarmerFormPreviewLeft";
import FarmerFormPreviewRight from "./FarmerFormPreviewRight";
import { useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { S } from "./farmer-form-preview.styled";

const FarmerFormPreview = () => {
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const navigate = useNavigate();
  const { farmerId } = useParams();

  return (
    <>
      {isSuccess && Object.keys(farmersDetailsById).includes(farmerId as string) ? (
        <S.FarmerFormPreviewMainContainer>
          <FarmerFormPreviewLeft />
          <FarmerFormPreviewRight />
        </S.FarmerFormPreviewMainContainer>
      ) : (
        <S.CertificateNodataContainer>
          <S.NoDataErrorText>404 Page Not Found</S.NoDataErrorText>
          <S.NoDataErrorText2 onClick={() => navigate(-1)}>
            <i>back</i> Go Back
          </S.NoDataErrorText2>
        </S.CertificateNodataContainer>
      )}
    </>
  );
};

export default FarmerFormPreview;
