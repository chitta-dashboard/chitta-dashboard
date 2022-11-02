import FooterWrapper from "../../../custom-tables/footer";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";

const Footer = () => {
  // const { farmersDetailsById } = useFarmerDetailsContext();
  const { farmersDetailsById } = useSelector((state: RootState) => state.farmerDetails);
  const count = Math.ceil(Object.values(farmersDetailsById).length / 6);

  return <FooterWrapper count={count} page={1} totalCount={Object.values(farmersDetailsById).length} rowsPerPage={6} />;
};

export default Footer;
