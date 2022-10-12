import { useMdDetailsContext } from "../../../../utils/context/mdDetails";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { mdDetailsById, page, rowsPerPage } = useMdDetailsContext();
  const count = Math.ceil(Object.values(mdDetailsById).length / rowsPerPage);

  return Object.values(mdDetailsById).length > 0 ? (
    <FooterWrapper count={count} page={page} totalCount={Object.values(mdDetailsById).length} rowsPerPage={rowsPerPage} />
  ) : null;
};

export default Footer;
