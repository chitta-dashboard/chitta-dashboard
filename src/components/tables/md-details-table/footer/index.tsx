import { useMdDetailsContext } from "../../../../utils/context/mdDetails";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { mdDetailsById } = useMdDetailsContext();
  const count = Math.ceil(Object.values(mdDetailsById).length / 6);

  return Object.values(mdDetailsById).length > 0 ? (
    <FooterWrapper count={count} page={1} totalCount={Object.values(mdDetailsById).length} rowsPerPage={6} />
  ) : null;
};

export default Footer;
