import FooterWrapper from "../../../custom-tables/footer";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import { useFetch } from "../../../../utils/hooks/query";
import { ENDPOINTS } from "../../../../utils/constants";

const Footer = () => {
  // const { farmersDetailsById } = useFarmerDetailsContext();
  // const { farmersDetailsById } = useSelector((state: RootState) => state.farmerDetails);
  const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.farmerDetails);
  const { data: farmersDetailsById } = result;
  const count = isSuccess ? Math.ceil(Object.values(farmersDetailsById).length / 6) : 0;

  return <FooterWrapper count={count} page={1} totalCount={isSuccess ? Object.values(farmersDetailsById).length : 1} rowsPerPage={6} />;
};

export default Footer;
