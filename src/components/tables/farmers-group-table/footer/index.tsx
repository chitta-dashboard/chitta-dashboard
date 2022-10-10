import { useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { farmersGroupList, page, rowsPerPage } = useFarmersGroupContext();
  const count = Math.ceil(Object.values(farmersGroupList).length / rowsPerPage);

  return <FooterWrapper count={count} page={page} totalCount={Object.values(farmersGroupList).length} rowsPerPage={rowsPerPage} />;
};

export default Footer;
