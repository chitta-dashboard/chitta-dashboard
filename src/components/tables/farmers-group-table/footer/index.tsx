import { useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  //state values
  const { farmersGroupById } = useFarmersGroupContext();

  //constants
  const count = Math.ceil(Object.values(farmersGroupById).length / 6);

  return <FooterWrapper count={count} page={1} totalCount={Object.values(farmersGroupById).length} rowsPerPage={6} />;
};

export default Footer;
