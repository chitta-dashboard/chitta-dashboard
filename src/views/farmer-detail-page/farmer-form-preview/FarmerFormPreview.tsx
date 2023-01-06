import { useParams } from "react-router-dom";
import { S } from "./farmer-form-preview.styled";
import ErrorPage from "../../../components/error-page";
import { ENDPOINTS } from "../../../utils/constants";
import { useIdByPage } from "../../../utils/hooks/query";
import FarmerFormPreviewLeft from "./FarmerFormPreviewLeft";
import FarmerFormPreviewRight from "./FarmerFormPreviewRight";

const FarmerFormPreview = () => {
  const { farmerId } = useParams();
// Queries
  const {
    result: { data: farmerDetails },
    formatChangeSuccess: isSuccess,
  } = useIdByPage(ENDPOINTS.farmerDetails, farmerId);

  return (
    <>
      {isSuccess && farmerDetails[farmerId as string]["id"] === farmerId ? (
        <S.FarmerFormPreviewMainContainer>
          <FarmerFormPreviewLeft />
          <FarmerFormPreviewRight isFarmerSuccess={isSuccess} farmersDetailsById={isSuccess ? farmerDetails : []} />
        </S.FarmerFormPreviewMainContainer>
      ) : (
        <>{isSuccess && <ErrorPage />}</>
      )}
    </>
  );
};

export default FarmerFormPreview;
