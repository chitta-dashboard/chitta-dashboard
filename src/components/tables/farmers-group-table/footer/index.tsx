import { useFarmerGroupDetailsContext } from "../../../../utils/context/farmersGroup";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { farmerGroupList, page, rowsPerPage } = useFarmerGroupDetailsContext();
  const count = Math.ceil(farmerGroupList.length / rowsPerPage);

  return <FooterWrapper count={count} page={page} totalCount={farmerGroupList.length} rowsPerPage={rowsPerPage} />;
};

export default Footer;
