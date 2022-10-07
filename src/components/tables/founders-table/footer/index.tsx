import { useFounderContext } from "../../../../utils/context/founders";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { foundersList, page, rowsPerPage } = useFounderContext();
  const count = Math.ceil(foundersList.length / rowsPerPage);

  return foundersList.length > 0 ? <FooterWrapper count={count} page={page} totalCount={foundersList.length} rowsPerPage={rowsPerPage} /> : null;
};

export default Footer;
