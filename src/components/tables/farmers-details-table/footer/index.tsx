import FooterWrapper from "../../../custom-tables/footer";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";

const Footer = () => {
  const { farmersDetailsById, page, rowsPerPage } = useFarmerDetailsContext();
  const count = Math.ceil(Object.values(farmersDetailsById).length / rowsPerPage);

  return <FooterWrapper count={count} page={page} totalCount={Object.values(farmersDetailsById).length} rowsPerPage={rowsPerPage} />;
};

export default Footer;
