import FooterWrapper from "../../../custom-tables/footer";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";

const Footer = () => {
  const { farmersList, page, rowsPerPage } = useFarmerDetailsContext();
  const count = Math.ceil(farmersList.length / rowsPerPage);

  return <FooterWrapper count={count} page={page} totalCount={farmersList.length} rowsPerPage={rowsPerPage} />;
};

export default Footer;
