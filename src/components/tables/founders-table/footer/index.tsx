import { useFounderContext } from "../../../../utils/context/founders";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { foundersById, page, rowsPerPage } = useFounderContext();
  const count = Math.ceil(Object.values(foundersById).length / rowsPerPage);

  return Object.values(foundersById).length > 0 ? (
    <FooterWrapper count={count} page={page} totalCount={Object.values(foundersById).length} rowsPerPage={rowsPerPage} />
  ) : null;
};

export default Footer;
