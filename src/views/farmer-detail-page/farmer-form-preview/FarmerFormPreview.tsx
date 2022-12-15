import { useParams } from "react-router-dom";
import FarmerFormPreviewLeft from "./FarmerFormPreviewLeft";
import FarmerFormPreviewRight from "./FarmerFormPreviewRight";
import { useFetch, useIdByPage } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import ErrorPage from "../../../components/error-page";
import { S } from "./farmer-form-preview.styled";

const FarmerFormPreview = () => {
  const { farmerId } = useParams();

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
