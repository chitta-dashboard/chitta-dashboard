import { useFounderContext } from "../../../../utils/context/founders";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { foundersList, page, rowsPerPage } = useFounderContext();
  const count = Math.ceil(Object.values(foundersList).length / rowsPerPage);

  return Object.values(foundersList).length > 0 ? (
    <FooterWrapper count={count} page={page} totalCount={Object.values(foundersList).length} rowsPerPage={rowsPerPage} />
  ) : null;
};

export default Footer;
