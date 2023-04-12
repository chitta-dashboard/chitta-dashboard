import { useParams } from "react-router-dom";
import FarmerFormPreviewLeft from "./FarmerFormPreviewLeft";
import FarmerFormPreviewRight from "./FarmerFormPreviewRight";
import { useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import ErrorPage from "../../../components/error-page";
import { S } from "./farmer-form-preview.styled";

const FarmerFormPreview = () => {
  //constants
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const { farmerId } = useParams();

  return (
    <>
      {isSuccess && Object.keys(farmersDetailsById).includes(farmerId as string) ? (
        <S.FarmerFormPreviewMainContainer>
          <FarmerFormPreviewLeft />
          <FarmerFormPreviewRight />
        </S.FarmerFormPreviewMainContainer>
      ) : (
        <>{isSuccess && <ErrorPage />}</>
      )}
    </>
  );
};

export default FarmerFormPreview;
