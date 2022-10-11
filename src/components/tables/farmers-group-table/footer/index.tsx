import { useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { farmersGroupById, page, rowsPerPage } = useFarmersGroupContext();
  const count = Math.ceil(Object.values(farmersGroupById).length / rowsPerPage);

  return <FooterWrapper count={count} page={page} totalCount={Object.values(farmersGroupById).length} rowsPerPage={rowsPerPage} />;
};

export default Footer;
